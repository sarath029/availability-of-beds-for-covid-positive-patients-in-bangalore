import os
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
import requests
from bs4 import BeautifulSoup
import pandas as pd
import json


class AvailabilityView(APIView):


    def get_table_df(self, table_id, soup):
        
        gfp_tables_df = pd.DataFrame()
        gdp_tables = soup.find_all("table", attrs = {"id": table_id})
        
        for gdp_table in gdp_tables[:3]:
            
            gdp_heading_data = gdp_table.thead.find_all("tr")  
            gdp_table_data = gdp_table.tbody.find_all("tr")[:-1]

            headings = []

            for td in gdp_heading_data[1].find_all("td"):
                headings.append(td.text.strip())

            table_data = []

            for row in gdp_table_data:
                
                row_data = []
            
                for td in row.find_all("td"):
                    row_data.append(td.text)
                table_data.append(row_data)


            df = pd.DataFrame(table_data)
            df.columns = headings
            df.drop('#', axis = 1, inplace = True)
            gfp_tables_df = gfp_tables_df.append(df)

        return gfp_tables_df

    def get(self, request):

        response = requests.get('https://bbmpgov.com/chbms/')
        
        if response.status_code == 200:    

            soup = BeautifulSoup(response.content, 'html.parser')
            
            data = self.get_table_df("GovernmentHospitalsDetail", soup)
            data = data.append(self.get_table_df("GovernmentMedical", soup))
            
            location_df = pd.read_csv('location.csv')
            data_with_location = pd.merge(data, location_df, on = 'Name of facility')
            
            data_with_location.columns = [
                'name_of_the_facility', 
                'allocated_gen', 
                'allocated_hdu', 
                'allocated_icu', 
                'allocated_icu_ventl',
                'allocated_total',
                'occupied_gen', 
                'occupied_hdu', 
                'occupied_icu', 
                'occupied_icu_ventl',
                'occupied_total',
                'available_gen', 
                'available_hdu', 
                'available_icu', 
                'available_icu_ventl',
                'available_total',
                'coordinate',
                'type'
            ]
            
            return Response(data_with_location.to_dict(orient = "records"))
        
        else:
            return Response({
                "message": "failed to load data"
            }, status = 400)
