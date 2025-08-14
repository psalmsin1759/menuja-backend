# Menuja

Menuja is a Node.js & TypeScript backend service designed to manage menu items, categories, and admin functionalities for a restaurant or food ordering system.  
It follows a modular architecture and supports authentication, admin role management, and RESTful API endpoints.

##  Features

- **Admin Authentication** – Secure login and role-based access control.
- **Menu Management** – Create, update, delete, and retrieve menu items.
- **Category Management** – Organize menu items into categories.
- **Swagger API Documentation** – Interactive API testing via Swagger UI.
- **TypeScript Support** – Strong typing for maintainable and scalable code.
- **Environment Variables** – Configurable settings using `.env` file.

##  Project Structure




##  Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/psalmsin1759/menuja-backend.git
cd menuja
npm install
```

## Environment Variables
- Create a .env file in the root directory and add the following:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/menuja
JWT_SECRET=your_jwt_secret
```

## Running the Application

- Development
```bash
npm run dev
```

- Production
```bash
npm run build
npm start
```

## API Documentation
- Swagger UI is available at:
```bash
http://localhost:3000/api-docs
```