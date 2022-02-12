FROM arm32v7/tomcat
EXPOSE 8080
COPY beatify-web.war /usr/local/tomcat/webapps
CMD ["catalina.sh", "run"]