FROM maven:3.8-openjdk-8 AS build
WORKDIR /app
COPY pom.xml .
COPY beatify-core beatify-core
COPY beatify-web beatify-web
RUN mvn package -DskipTests -B

FROM tomcat:8.5-jdk8
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=build /app/beatify-web/target/beatify-web.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
CMD ["catalina.sh", "run"]
