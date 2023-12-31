# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el código fuente de la aplicación
COPY . .

# Define un puerto (puedes personalizarlo)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
