# Personalized News Aggregator API

A RESTful API built with Node.js and Express.js that provides personalized news aggregation with user authentication, preferences management, and external news API integration.

## 🚀 Features

- User registration and authentication with JWT tokens
- Secure password hashing using bcrypt
- User preferences management (categories, languages)
- External news API integration (NewsAPI)
- Caching mechanism to reduce API calls
- Mark articles as read/favorite functionality
- Comprehensive error handling and input validation
- Token-based security for protected routes

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **HTTP Client**: axios
- **External API**: NewsAPI

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URL=mongodb://localhost:27017/news-aggregator
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key
   NEWSAPI_API_KEY=your-newsapi-key
   NEWSAPI_BASE_URL=https://newsapi.org/v2
   ```

4. **Get NewsAPI Key**
   - Visit [NewsAPI](https://newsapi.org/docs/get-started#search)
   - Sign up for a free account
   - Get your API key and add it to the `.env` file

5. **Start the application**
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`

## 🔗 API Endpoints

### Authentication

#### Register User
- **POST** `/register`
- **Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: User registration confirmation

#### Login User
- **POST** `/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: JWT token for authenticated requests

### User Preferences

#### Get User Preferences
- **GET** `/preferences`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: User's current news preferences

#### Update User Preferences
- **PUT** `/preferences`
- **Headers**: `Authorization: <jwt-token>`
- **Body**:
  ```json
  {
    "preferences": ["technology", "business", "sports"],
  }
  ```

### News Management

#### Get Personalized News
- **GET** `/news`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: News articles based on user preferences

#### Mark Article as Read
- **POST** `/news/:id/read`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: Confirmation of article marked as read

#### Mark Article as Favorite
- **POST** `/news/:id/favorite`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: Confirmation of article marked as favorite

#### Get Read Articles
- **GET** `/news/read`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: List of all read articles

#### Get Favorite Articles
- **GET** `/news/favorites`
- **Headers**: `Authorization: <jwt-token>`
- **Response**: List of all favorite articles

## 🧪 Testing the API

### Using curl

1. **Register a new user**:
   ```bash
   curl -X POST http://localhost:3000/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Get news (with token)**:
   ```bash
   curl -X GET http://localhost:3000/news \
     -H "Authorization: <your-jwt-token>"
   ```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for the base URL and JWT token
3. Test each endpoint by following the authentication flow
4. Use the JWT token in the Authorization header for protected routes











## 📁 Project Structure

```
news-aggregator-api/
├── controllers/          # Route handlers
├── middleware/          # Authentication and validation middleware
├── models/              # Database models
├── routes/              # API route definitions
├── services/            # External API integration
├── utils/               # Helper functions
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```




