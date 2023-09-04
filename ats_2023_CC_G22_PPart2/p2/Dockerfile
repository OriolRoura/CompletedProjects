FROM php:7.4-apache

RUN apt-get update

COPY ./public-html/ /var/www/html/

RUN service apache2 restart

EXPOSE 80