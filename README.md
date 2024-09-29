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

```bash
cd db-api
npm install
npm run start:dev
```

## SERVICE-API

```bash
cd service-api
npm install
npm run start:dev
```

## FRONTEND

```bash
cd frontend
npm install
npm run dev
```

## Probar Rutas

