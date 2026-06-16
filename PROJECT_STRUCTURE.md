# Emosync - MERN Stack Project Structure

## Backend (Node.js + Express + MongoDB)

backend/
|-- src/
| |-- controllers/ # Logic for each route (auth, emotion, etc)
| |-- models/ # Mongoose models (User, EmotionHistory)
| |-- routes/ # Express route definitions
| |-- middleware/ # JWT auth, error handling, etc
| |-- utils/ # NLP, face-api.js helpers
| |-- app.js # Express app setup
| |-- server.js # Entry point
|-- .env # Environment variables
|-- package.json

## Frontend (React.js)

frontend/
|-- public/
| |-- index.html
|-- src/
| |-- components/
| | |-- InputLayer/ # Text & webcam input
| | |-- EmotionAnalysisCoordinator/# Logic to coordinate analysis
| | |-- RealTimeEmotionDetector/ # Real-time detection UI
| | |-- EmotionalHeatMap/ # Heatmap visualization
| | |-- EmotionHistory/ # Line chart/history
| | |-- VisualizationDashboard/ # Dashboard wrapper
| |-- pages/
| | |-- Login.js
| | |-- Register.js
| | |-- Dashboard.js
| |-- App.js
| |-- index.js
| |-- api/ # API call helpers
|-- package.json

# Root

|-- backend/
|-- frontend/
|-- README.md
|-- docs/
|-- app-graph.dot
|-- (graphviz.svg, ide-aplikasi.pdf, etc)
