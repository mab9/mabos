FROM eclipse-temurin
MAINTAINER Marc-Antoine Brülhart <marcantoine.bruelhart@gmail.com>
RUN apt-get install curl
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
