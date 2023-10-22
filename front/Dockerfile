FROM nginx:alpine
COPY static /usr/share/nginx/html/static
COPY index.html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
EXPOSE 80
EXPOSE 90
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
