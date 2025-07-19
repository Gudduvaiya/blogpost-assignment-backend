# Blogpost Assignment Backend

A simple Node.js backend for a blog post application using Express, MongoDB, and JWT authentication.

## Features

- User signup and login with JWT authentication
- Create, update, delete, and fetch blog posts
- Add comments to posts
- Protected routes using JWT middleware

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation


1. Clone the repository:
   ```sh
   git clone blogpost-assignment-backend
   cd blogpost-assignment-backend

2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy `.env.example` to `.env` and update values if needed.

### Running the Server

```sh
npm run dev
```

Server runs on `http://localhost:4600` by default.

## API Endpoints

### Auth

- `POST /api/auth/signup` — User registration
- `POST /api/auth/login` — User login

### Blog Posts

- `POST /api/blog/create-post` — Create a post (auth required)
- `GET /api/blog/get-my-posts` — Get posts by logged-in user (auth required)
- `GET /api/blog/get-all-posts` — Get all posts (auth required)
- `PUT /api/blog/update-post/:id` — Update a post (auth required)
- `DELETE /api/blog/delete-post/:id` — Delete a post (auth required)
- `PUT /api/blog/add-cooment/:postId` — Add comment to a post (auth required)

## Environment Variables

See [.env.example](c:/Users/arind/OneDrive/Desktop/Backend/.env.example) for required
