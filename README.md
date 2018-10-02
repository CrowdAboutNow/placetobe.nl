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


## How to run project locally
1. Clone project from github
2. cd to project folder
3. install bower global `npm install -g bower`
4. In project folder run: `npm install`
5. In project folder run: `bower install`
6. `cp config.example.json config.json and edit accordingly`
7. Start node server by running `node server` in your terminal in the project folder
8. Serve the front-end with `polyer serve`
9. Visit http://127.0.0.1:8080 