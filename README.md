# Real-Time Chat Application

## Overview

A production-ready real-time chat application built with Node.js, Express, MongoDB, and Socket.IO. This platform provides secure, scalable communication infrastructure supporting direct messaging, group conversations, and social network management with full real-time synchronization capabilities.

## Key Features

- **Secure Authentication**: Industry-standard bcrypt password hashing with session-based authentication
- **Email Verification**: Automated email verification workflow using Nodemailer
- **Social Network Management**: Comprehensive friend system with request handling and list management
- **Real-Time Messaging**: Instant message delivery with Socket.IO bidirectional communication
- **Group Collaboration**: Multi-user group chat functionality with persistent message storage
- **User Profiles**: Customizable user profiles with role-based settings
- **Live Notifications**: Event-driven notifications for friend requests and online status
- **Session Persistence**: Secure session management with MongoDB-backed session store

## Technology Stack

### Core Framework & Backend

- **Node.js** - JavaScript runtime environment
- **Express.js v4.18.2** - Web application framework
- **MongoDB & Mongoose v8.0.3** - NoSQL database and ODM layer

### Real-Time Communication

- **Socket.IO v4.8.1** - Bidirectional event-based communication

### Frontend & Templating

- **EJS v3.1.9** - Server-side template rendering engine
- **Bootstrap 5** - Responsive UI framework
- **jQuery** - DOM manipulation and utilities

### Authentication & Security

- **bcrypt v5.1.1** - Cryptographic password hashing
- **express-validator v7.0.1** - Request validation and sanitization
- **express-session v1.17.3** - Session middleware
- **connect-mongodb-session v3.1.1** - MongoDB session persistence
- **Nodemailer v6.9.9** - Email transport layer

### Utilities & Middleware

- **Multer v1.4.5** - Multipart form data handling (file uploads)
- **UUID v9.0.1** - Universally unique identifier generation
- **dotenv v16.4.5** - Environment configuration management
- **connect-flash v0.1.1** - Message queue for flash notifications
- **body-parser v1.20.2** - Request body parsing middleware

## Project Structure

```
chat-app/
├── assets/              # Static assets
│   ├── css/            # Stylesheets (Bootstrap & custom)
│   └── js/             # Client-side scripts
│       └── sockets/    # Socket.IO client listeners
├── controllers/        # Business logic controllers
├── models/            # MongoDB data models
├── routes/            # Express route handlers
│   └── guards/        # Middleware guards (auth checks)
├── sockets/           # Socket.IO event handlers
├── views/             # EJS template files
│   └── parts/         # Reusable template components
├── images/            # Image assets
├── app.js             # Main application entry point
└── package.json       # Dependencies and metadata
```

## Installation & Setup

### System Requirements

- **Node.js** v14.0.0 or higher
- **MongoDB** 4.4 or higher (local or cloud-based instance)
- **npm** v6.0.0+ or **yarn** v1.22.0+
- **Git** for version control

### Installation Steps

1. **Clone or obtain the project**

   ```bash
   git clone https://github.com/MohemedAmine/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the project root with the following variables:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/chat-app

   # Session Configuration
   SESSION_SECRET=your_secure_session_secret_here

   # Email Service Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password

   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **MongoDB Setup**

   Ensure MongoDB is running:

   ```bash
   mongod
   ```

   Or use MongoDB Atlas for cloud-based hosting.

5. **Start the Application**

   For production:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm install -g nodemon
   nodemon app.js
   ```

6. **Access the Application**

   Open your browser and navigate to: `http://localhost:3000`

## Usage Guide

### User Registration & Authentication

1. Navigate to the signup page and create a new account
2. Verify your email address via the verification link sent to your inbox
3. Log in with your credentials
4. Access personalized profile settings and preferences

### Social Connection Management

1. Use the search functionality to discover other users
2. Send friend requests to users you wish to connect with
3. Manage incoming friend requests from the notifications panel
4. Maintain and organize your friend list

### Direct Messaging

1. Select a contact from your friends list
2. Compose and send real-time messages
3. View full message history with persistent storage
4. Receive instant notifications for new messages

### Group Communication

1. Navigate to the Groups section to create a new group chat
2. Add members from your friend list to the group
3. Send messages to the entire group in real-time
4. Manage group settings and member permissions

## Architecture & Components

### Controllers (Business Logic Layer)

| Controller              | Responsibility                                 |
| ----------------------- | ---------------------------------------------- |
| `auth.controller.js`    | Authentication and authorization workflows     |
| `chat.controller.js`    | Direct messaging operations and retrieval      |
| `friend.controller.js`  | Friend request and relationship management     |
| `group.controller.js`   | Group creation, management, and administration |
| `home.controller.js`    | Dashboard and home page logic                  |
| `profile.controller.js` | User profile operations and updates            |

### Data Models (Persistence Layer)

| Model                    | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `auth.model.js`          | Authentication credentials and verification |
| `user.model.js`          | User account information and relationships  |
| `chat.model.js`          | Direct message storage and retrieval        |
| `group.model.js`         | Group metadata and member associations      |
| `group-message.model.js` | Group message persistence and queries       |
| `message.model.js`       | Message schema and structure definitions    |
| `userVerification.js`    | Email verification token management         |

### Real-Time Communication (Socket.IO Layer)

Event handlers for:

- **Friend Operations**: Friend requests, acceptance, rejection, status updates
- **Direct Messaging**: Message transmission, delivery confirmation, typing indicators
- **Group Messaging**: Group message broadcasting, member notifications
- **Presence Management**: User online/offline status synchronization

## API Endpoints

| Route      | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `/auth`    | User authentication (registration, login, verification, logout) |
| `/home`    | Dashboard and primary navigation interface                      |
| `/profile` | User profile retrieval and modification                         |
| `/friend`  | Friend management and relationship operations                   |
| `/chat`    | Direct messaging endpoints and message history                  |
| `/group`   | Group management, creation, and member operations               |

## Configuration & Security Best Practices

### Environment Variables

- Store all sensitive configuration in `.env` file (never commit to version control)
- Use strong, randomly generated `SESSION_SECRET` for production environments
- Configure proper MongoDB connection credentials and authentication

### Security Recommendations

- Enable MongoDB authentication in production environments
- Use HTTPS/TLS for all client-server communications
- Implement rate limiting on authentication endpoints
- Enable CORS only for trusted domains
- Regularly update all dependencies for security patches

### Database Considerations

- Ensure MongoDB backups are configured regularly
- Monitor database performance and query optimization
- Implement proper indexing on frequently queried fields
- Use MongoDB Atlas for production deployments with built-in security

## Project Information

- **Author**: Mohamed Lamine OULAD SAID
- **License**: ISC
- **Version**: 1.0.0

## Additional Notes

- All environment variables must be properly configured before deploying
- MongoDB connectivity is essential for application functionality
- Email service credentials are required to enable user verification features
- Socket.IO server must remain active for real-time communication functionality
- For production deployments, consider implementing clustering with Node.js cluster module
