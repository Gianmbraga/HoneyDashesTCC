# Usar a imagem do JDK 21
FROM openjdk:21-jdk-slim

# Configurar o diretório de trabalho
WORKDIR /app

# Copiar o JAR completo para o contêiner
COPY build/libs/ml-backend-0.0.1-SNAPSHOT.jar app.jar

# Comando para executar o JAR
CMD ["java", "-jar", "app.jar"]

EXPOSE 8080


