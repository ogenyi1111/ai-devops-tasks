# Simple Task API

A RESTful API for task management built with Node.js, Express, and MongoDB. This API provides endpoints for managing tasks with features like filtering, status updates, and user authorization.

## Features

- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Basic user authorization
- MongoDB database integration
- RESTful API design
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-task-api.git
cd simple-task-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-api
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Tasks

#### Get All Tasks
```http
GET /api/tasks
```
Query Parameters:
- `status` (optional): Filter by task status
- `priority` (optional): Filter by task priority
- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page

Response:
```json
{
  "data": [
    {
      "id": "1",
      "title": "Complete project",
      "description": "Finish the API documentation",
      "status": "pending",
      "priority": "high",
      "createdAt": "2024-03-20T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1
  }
}
```

#### Create Task
```http
POST /api/tasks
```
Request Body:
```json
{
  "title": "New Task",
  "description": "Task description",
  "priority": "high",
  "status": "pending"
}
```

#### Update Task
```http
PUT /api/tasks/:id
```
Request Body:
```json
{
  "title": "Updated Task",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

### Authentication

#### Register User
```http
POST /api/auth/register
```
Request Body:
```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
```
Request Body:
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

## Usage Examples

### Using cURL

1. Create a new task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "priority": "high",
    "status": "pending"
  }'
```

2. Get all tasks:
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `Bearer ${YOUR_TOKEN}`
  }
});

// Create task
async function createTask() {
  try {
    const response = await api.post('/tasks', {
      title: 'New Task',
      description: 'Task description',
      priority: 'high',
      status: 'pending'
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
