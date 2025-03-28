const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

// Simple Authentication Middleware
app.use((req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || token !== 'mysecrettoken') {
        return res.status(401).json({ error: 'Unauthorized. Valid token required.' });
    }

    next();
});


// Mock Database (In-Memory)
const mockData = {
    sales_data: {
        total_sales: "$100,000",
        last_month_sales: "$8,000",
    },
    customers: {
        customer_count: 5000,
        new_customers_last_month: 200,
    }
};


// POST /query endpoint
app.post('/query', (req, res) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    let response = {
        query_received: query,
        translated_query: "",
        result: {}
    };

    if (query.toLowerCase().includes("total sales")) {
        response.translated_query = "SELECT SUM(sales) FROM sales_data";
        response.result = { total_sales: mockData.sales_data.total_sales };
    } else if (query.toLowerCase().includes("customer count")) {
        response.translated_query = "SELECT COUNT(*) FROM customers";
        response.result = { customer_count: mockData.customers.customer_count };
    } else {
        response.translated_query = "Unknown";
        response.result = { message: "I don't understand the query" };
    }

    res.json(response);
});


// POST /explain endpoint
app.post('/explain', (req, res) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    let explanation = "";

    if (query.toLowerCase().includes("total sales")) {
        explanation = "You are asking for the total sales.";
    } else if (query.toLowerCase().includes("customer count")) {
        explanation = "You are asking for the customer count.";
    } else {
        explanation = "Sorry, I could not understand what you are asking.";
    }

    res.json({
        query_received: query,
        explanation: explanation
    });
});

// POST /validate endpoint
app.post('/validate', (req, res) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const isValid = query.toLowerCase().includes("sales") || query.toLowerCase().includes("customer");

    if (isValid) {
        res.json({ query_received: query, valid: true, message: "Query is valid." });
    } else {
        res.json({ query_received: query, valid: false, message: "Query is NOT valid for this system." });
    }
});

// Handle Invalid Endpoints
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler (optional but good)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
