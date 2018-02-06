# How to install an SSL certificate on placetobe.nl

1. `ssh root@placetobe.nl` and type in your password.
2. `cd /etc/nginx/ssl/placetobe.nl/`
3. Overwrite contents of `private.key`, `certificate.crt` and `ca_bundle.crt`
4. Create a combined file: `cat certificate.crt ca_bundle.crt > placetobe.nl.chained.crt`
5. Restart nginx webserver: `systemctl restart nginx`