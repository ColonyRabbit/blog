FROM node:14

# Install dependencies
RUN apt-get update && \
 apt-get -y Install nodejs

# Copy html directory files
COPY html /var/www/html/

# Open port 80
EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]