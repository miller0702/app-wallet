# Proyecto App Wallet

Este repositorio contiene el código para el proyecto **App Wallet**, que está dividido en tres componentes principales:

- **db-api**: API de base de datos desarrollada en **NestJS** que maneja las operaciones relacionadas con la base de datos.
- **service-api**: API de servicios desarrollada en **NestJS** que gestiona la lógica de negocio y las operaciones relacionadas con el cliente.
- **frontend**: Aplicación del lado del cliente desarrollada en **React** que se comunica con las APIs para mostrar la información al usuario.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

/prueba 
    ├── /db-api # API para la gestión de la base de datos
    ├── /service-api # API para la lógica de negocio
    └── /frontend # Aplicación del lado del cliente



## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Instalación y Configuración

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/miller0702/app-wallet.git
cd app-wallet
git checkout main
```

Luego de realizado esto procedemos a ubicarnos en diferentes terminales en cada uno de los proyectos y correr de la siguiente manera cada uno de los servicios

## DB-API

Correra por el puerto 3000

```bash
cd db-api
npm install
npm run start:dev
```

## SERVICE-API

Correra por el puerto 5000

```bash
cd service-api
npm install
npm run start:dev
```

## FRONTEND

Correra por el puerto 5173

```bash
cd frontend
npm install
npm run dev
```

## Probar Rutas

Una vez corridos todos lo servicios, para probar las rutas y tener un mejor contexto dirigite a la siguiente url:

```bash
localhost:5000/api-docs/
```

Alli encontraras toda la documentación respecto a cada ruta y como implementarlas en postman o puedes dirigirte al siguiente link donde encontraras todas las rutas en postman

- [Postman](https://documenter.getpostman.com/view/20358776/2sAXqzWdgs)