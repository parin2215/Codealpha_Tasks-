# Project Management System

A full-stack project management application built with React and Node.js that helps teams collaborate and manage their projects effectively.

## Project Structure
```
project-management-system/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js application
└── README.md              # Project documentation
```

## Setup Instructions

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features

### User Management
- User registration and login
- User profile management
- Secure password handling
- JWT-based authentication

### Project Management
- Create new projects
- View project details
- Project timeline tracking
- Project member management
- Project description and details

### Task Management
- Create and assign tasks
- Task status tracking
- Task management within projects
- Basic task operations

### Comments System
- Add comments to projects
- View project comments
- Comment timestamps
- User attribution for comments

### Dashboard
- Overview of all projects
- Project statistics
- Quick access to project details
- Project creation shortcut

## Tech Stack

### Frontend
- React.js
- Axios for API calls
- Context API for state management
- React Bootstrap for UI components
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture 