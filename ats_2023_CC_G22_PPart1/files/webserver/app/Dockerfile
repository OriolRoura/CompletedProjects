FROM php:7.4-apache

RUN apt-get update && apt-get install -y libpq-dev
RUN docker-php-ext-install pgsql pdo pdo_pgsql

COPY ./public-html/ /var/www/html/

RUN service apache2 restart

EXPOSE 80