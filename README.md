## 🛠️ Guía de Instalación y Ejecución Paso a Paso

Sigue las siguientes instrucciones detalladas para levantar la aplicación completa:

### 🗄️ Paso 1: Configurar la Base de Datos

# Abre tu herramienta de gestión de bases de datos 

# Abre y ejecuta el script ubicado en la raíz del proyecto llamado `database.sql` para crear la base de  datos `StoreDB` y sus tablas


# 💻 Paso 2: Configurar y Correr el Backend 

# Navega a la carpeta principal de la API del Backend:

    cd Backend/src/StoreBackend.Api

# Crea tu archivo de configuración para desarrollo local duplicando `appsettings.Example.json` y renombrándolo a `appsettings.Development.json`:

# Abre el archivo `appsettings.Development.json` y actualiza los datos necesarios.

# Restaura los paquetes y compila la solución para asegurarte de que todo esté en orden:

    dotnet build

# Inicia el servidor backend en modo de desarrollo:
    dotnet run



# 🌐 Paso 3: Configurar y Correr el Frontend (React + Vite)

# En una nueva consola de comandos, navega a la carpeta del Frontend:

    cd Frontend

# Instala las dependencias necesarias de Node:

    npm install

# Inicia el servidor de desarrollo local de Vite:
    npm run dev

## 📱 Soporte Móvil (Capacitor)

# Compilar el frontend de React para producción
npm run build

# Sincronizar los archivos del build con la plataforma nativa
npx cap sync

# Abrir el proyecto en Android Studio
npx cap open android
