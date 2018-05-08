# \<placetobe.nl\>

Organisational website for Place to Be Crowdfunding

## Install

1. `bower i`
1. `npm i`
1. `cp config.example.json config.json and edit accordingly`

$ node server


## Update on Server

1. `bower update --allow-root`
- `npm update`
- `pm2 restart server`


## How to install an SSL certificate on placetobe.nl

1. cd /var/www/ssl/sslforfree/.well-known/acme-challenge
- add files
- cd /etc/nginx/sites-available
- mv default default.bu && mv insecure default
- service nginx restart
- cd /etc/nginx/ssl
- replace contents of files
- cat certificate.crt ca_bundle.crt > chained.crt
- cd /etc/nginx/sites-available
- mv default insecure && mv default.bu default
- service nginx restart