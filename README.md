# 🚀 Guía de Instalación y Ejecución

## Requisitos previos

Asegúrate de contar con una herramienta de gestión de bases de datos, el SDK de .NET y Node.js instalados antes de comenzar.

---

## Paso 1 — Configurar la Base de Datos 🗄️

1. Abre tu herramienta de gestión de bases de datos.
2. Ejecuta el script `database.sql` ubicado en la raíz del proyecto para crear la base de datos `StoreDB` y sus tablas.

---

## Paso 2 — Backend (ASP.NET) 💻

```bash
cd Backend/src/StoreBackend.Api
```

1. **Busca el archivo de configuración** `appsettings.Example.json` y renombrándolo a `appsettings.Development.json`.

2. **Actualiza** los valores necesarios dentro de `appsettings.Development.json`.

3. **Compila** la solución para verificar que todo esté en orden:
```bash
   dotnet build
```

4. **Inicia** el servidor en modo desarrollo:
```bash
   dotnet run
```

---

## Paso 3 — Frontend (React + Vite) 🌐

En una **nueva terminal**, ejecuta:

```bash
cd Frontend
npm install
npm run dev
```

---

## Soporte Móvil (Capacitor) 📱

```bash
# 1. Compilar el frontend para producción
npm run build

# 2. Sincronizar el build con la plataforma nativa
npx cap sync

# 3. Abrir el proyecto en Android Studio
npx cap open android
```
