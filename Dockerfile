FROM nginx

WORKDIR /user/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html/

EXPOSE 80 # 显示表示占用80端口

CMD ["nginx", "-g", "daemon off;"]
