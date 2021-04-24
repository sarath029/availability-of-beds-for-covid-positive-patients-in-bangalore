FROM python:3.7
ENV PYTHONUNBUFFERED=1
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install wait-for-it

RUN mkdir /app
WORKDIR /app
ADD requirements.txt /app/
RUN pip3 install -r requirements.txt
ADD . /app/

EXPOSE 8000
