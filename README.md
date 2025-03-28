# Gen AI Analytics - Mini Data Query Simulation Engine

This project is part of the Backend Engineering Intern Challenge. It simulates a simple AI-powered backend service for natural language-based data querying.

---

## Objective

The goal is to build a lightweight service that allows non-technical users to:

- Ask questions using natural language.
- Get instant, mock insights.
- Simulate query translation and validation without relying on real databases or AI models.

---

## Tech Stack

- Language: Node.js
- Framework: Express.js
- Database: In-memory (mock data)
- Deployment: Render.com

---

## Features

- REST API with 3 endpoints:
    - `/query`: Process natural language query.
    - `/explain`: Explains the query.
    - `/validate`: Validates the query.
- Basic AI-like query translation (to pseudo-SQL).
- Basic result simulation.
- Simple authentication using token.
- Error handling for invalid routes and missing tokens.

---

## API Endpoints

# /query

    Method: POST  
    Description: Translates natural language query into a pseudo-SQL query and returns a mock result.
    Request Body:
    {
        "query": "What is the total sales?"
    }

    Response:
    {
        "query_received": "What is the total sales?",
        "translated_query": "SELECT SUM(sales) FROM sales_data",
        "result": {
            "total_sales": "$100,000"
        }
    }

# /explain
    Method: POST

    Description: Returns a simple explanation of what the query is asking.

    Request Body:
    {
        "query": "What is the total sales?"
    }

    Response:
    {
        "query_received": "What is the total sales?",
        "explanation": "You are asking for the total sales."
    }

# /validate
    Method: POST

    Description: Checks whether the given query is valid.

    Request Body:
    {
        "query": "What is the total sales?"
    }

    Response:
    {
        "query_received": "What is the total sales?",
        "is_valid": true
    }

## Authentication
Every request must include this header:
Authorization: mysecrettoken

## Error Handling
-Missing or empty query -> returns an error.

-Missing or incorrect token -> returns Unauthorized.

-Invalid endpoints -> returns Not Found.

## Setup Instructions
1.Clone this repository:git clone https://github.com/Vasundara-harika/genai-analytics-sim.git

2.Move into the project folder:cd genai-analytics-sim


3 Install dependencies:npm install

4.Run the project:node index.js
(I used nodemon)

## Sample curl Commands
Query Endpoint:
curl -X POST http://localhost:3000/query -H "Content-Type: application/json" -H "Authorization: mysecrettoken" -d "{\"query\":\"What is the total sales?\"}"

Explain Endpoint:
curl -X POST http://localhost:3000/explain -H "Content-Type: application/json" -H "Authorization: mysecrettoken" -d "{\"query\":\"What is the total sales?\"}"

Validate Endpoint:
curl -X POST http://localhost:3000/validate -H "Content-Type: application/json" -H "Authorization: mysecrettoken" -d "{\"query\":\"What is the total sales?\"}"

## Deployment
This project is deployed on Render:
https://genai-analytics-sim.onrender.com

## Notes
-This is a basic simulation.
-It does not connect to a real database.
-Only performs mock AI behavior for demonstration purposes.



