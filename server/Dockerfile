FROM    centos:6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /server
# Install app dependencies
RUN 	cd /server;rm -rf node-modules; npm install

EXPOSE  9804
CMD ["node", "/server/server.js"]