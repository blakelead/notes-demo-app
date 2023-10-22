# Notes Demo App

## Overview

This project provides a simple demo application for creating, reading, and deleting notes using a Python Flask API and a web frontend. The backend API uses MongoDB for data persistence, while the frontend uses vanilla JavaScript and Bootstrap for the UI. The app is containerized with Docker for easy deployment.

## Features

- RESTful API using Flask and MongoDB for CRUD operations on notes.
- Web frontend using Bootstrap.
- Dockerized backend and frontend services.
- Docker-compose for orchestrating services including MongoDB.
- Gunicorn for serving the Flask application.
- Nginx for serving the frontend.

## Prerequisites

- Docker
- Docker-compose

## Architecture

```
    +--------+    HTTP   +------------+    MongoDB    +-------+
    | Front  | <-------> |  Flask     | <-----------> |  DB   |
    |(Nginx) |    API    | (Gunicorn) |               |(Mongo)|
    +--------+           +------------+               +-------+
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/blakelead/notes-demo-app.git
```

### Run the Application

Run the following command to start the application:

```bash
docker-compose up
```

This will build and start the services defined in `docker-compose.yml`.

- Frontend will be available at `http://localhost:5000`
- API will be available at `http://localhost:8000`

## API Documentation

### Get All Notes

**Request:**

```
GET /api/notes
```

**Response:**

```json
{
  "notes": [
    {
      "_id": "note_id",
      "note": "example_note"
    }
  ]
}
```

### Create New Note

**Request:**

```
POST /api/notes
```

**Body:**

```json
{
  "note": "New Note"
}
```

**Response:**

```json
{
  "message": "note note_id created"
}
```

### Delete Note

**Request:**

```
DELETE /api/notes/note_id
```

**Response:**

```json
{
  "message": "note note_id deleted"
}
```

### Health Check

**Request:**

```
GET /api/status
```

**Response:**

```json
{
  "build_version": "dev",
  "environment": "development"
}
```

## Frontend Documentation

- **Add a Note**: Use the "Ajouter une note" form to add a new note.
- **Delete a Note**: Click the "✖" icon next to the note to delete it.

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB URI (default is `db:27017`)
- `BUILD_VERSION`: Build version (default is `dev`)
- `ENVIRONMENT`: Application environment (default is `development`)
- `DEBUG`: Enable debug mode (default is `True`)

### Frontend

- `API_URL`: URL of the API service (should be set in `docker-compose.yml`)

## License

MIT
