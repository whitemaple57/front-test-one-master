FROM registry.cn-qingdao.aliyuncs.com/d-common/nginx:2.0
 
COPY ./dist/ /data
 
RUN rm /etc/nginx/conf.d/default.conf
 
COPY ./docker/yizhi-ui.conf /etc/nginx/conf.d/

COPY ./docker/getip.sh /etc/nginx/conf.d/

COPY ./docker/reloadnginx.sh /etc/nginx/conf.d/

COPY ./docker/init.sh /etc/nginx/conf.d/

RUN chmod 777 /etc/nginx/conf.d/reloadnginx.sh && chmod 777 /etc/nginx/conf.d/getip.sh && chmod 777 /etc/nginx/conf.d/init.sh

#RUN /bin/bash -c 'echo init ok'

CMD ["/etc/nginx/conf.d/init.sh"]