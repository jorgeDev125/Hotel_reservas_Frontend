# Control de Reservas Hotel

## Descripción

Este proyecto es una fase inicial de un **sistema de gestión hotelera** que permite administrar de manera eficiente las **reservaciones, habitaciones y clientes** de un hotel. El sistema está diseñado para facilitar la operación diaria del hotel, permitiendo crear y editar clientes, hacer reservaciones, cambiar el estado de las reservaciones y habitaciones, y visualizar estadísticas clave del negocio.

## Funcionalidades

- ✅ **Gestión de Clientes:** Crear, editar y buscar clientes por cédula.
- ✅ **Gestión de Habitaciones:** Visualizar habitaciones, cambiar su estado (disponible, reservada, ocupada, en limpieza, no disponible).
- ✅ **Gestión de Reservaciones:** Crear, editar y visualizar reservas, asignar habitaciones, calcular precios y controlar el flujo de estados.
- ✅ **Dashboard de Estadísticas:** Visualización de habitaciones y reservas agrupadas por estado.
- ✅ **Control de Estados:** Cambios automáticos y manuales de estado para reservas y habitaciones.
- ✅ **Validaciones robustas:** En frontend y backend para todos los formularios.
- ✅ **Diseño responsive:** Adaptado para uso en dispositivos móviles y escritorio.

## Tecnologías Utilizadas

### Frontend

- **HTML5**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **Vite** (para desarrollo y build)
- **CSS Grid & Flexbox** (para maquetado responsive)

### Backend

- **Node.js**
- **Express.js**
- **express-validator** (validación de datos)
- **CORS**
- **mysql2** (conexión a base de datos MySQL)

### Base de Datos

- **MySQL**
- **Triggers** para actualización automática de estados
- **Procedimientos almacenados** (opcional)

## Instalación y Uso

### 1. Clona los repositorios

### - Backend
git clone https://github.com/jorgeDev125/Hotel_reservas_Backend


### - Frontend
git clone https://github.com/jorgeDev125/Hotel_reservas_Frontend


### 2. Configura la base de datos MySQL

- Crea la base de datos y las tablas necesarias (habitacion, reserva, clientes, estado_habitacion, estado_reserva) con ayuda del archivo SQL proporcionado en la carpeta del bakcend
- Los **triggers** para actualizar estados ya vienen programados automáticamente en el archivo SQL.

### 3. Backend

cd hotel_backend

npm install

npm run dev ( Para desarrollo (con nodemon))

npm start  (Para producción)


Configura tus variables de entorno en `src/config/db.js` para la conexión a MySQL.

### 4. Frontend

cd hotel_frontend

npm install

npm run dev  (Para desarrollo)

npm run build  (Para producción)


## Endpoints Principales (Backend)

- `GET /habitaciones` — Listar habitaciones
- `PUT /habitaciones/:id/estado` — Cambiar estado de una habitación
- `GET /reservas` — Listar reservaciones
- `POST /reservas` — Crear nueva reservación
- `PUT /reservas/:id/estado` — Cambiar estado de una reservación
- `GET /clientes` — Listar clientes
- `POST /clientes` — Crear nuevo cliente

## Lógica de Estados

- **Habitaciones:** Disponible, Reservada, Ocupada, En Limpieza, No Disponible
- **Reservas:** Pendiente, Activa, Completada, Cancelada

Los **triggers** en la base de datos aseguran la integridad de los estados según el flujo de negocio.

## Créditos

Desarrollado por **Oscar Vargas y Jorge Vargas**  
Proyecto final para TalentoTech 2025

---

¡Gracias por usar este sistema!  
Cualquier sugerencia o contribución es bienvenida.

