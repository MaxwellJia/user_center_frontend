#依赖的基础镜像 (Java, Maven等)
FROM nginx

WORKDIR /user/share/nginx/html/
USER root

# 制定工作目录
# 将代码复制到容器中
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html/

EXPOSE 80 # 显示表示占用80端口

#运行镜像
CMD ["nginx", "-g", "daemon off;"]
