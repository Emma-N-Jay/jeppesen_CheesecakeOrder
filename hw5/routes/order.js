//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require("./dbms_promise")

//Retrieve order totals for selected month
router.post('/', async(req, res) => {

    try {
        // Get month
        const { month } = req.body;

        // Check if the month is provided
        if (!month) {
            console.error("Error: Month parameter is missing");
            return res.status(400).json({ error: "Month parameter is missing" });
        }

        // Debugging
        console.log("Fetching orders for month:", month);

        const query = `
            SELECT toppings.name AS topping, COALESCE(SUM(orders.quantity), 0) AS quantity
            FROM toppings
            LEFT JOIN orders ON toppings.t_id = orders.t_id AND orders.month = '${month}'
            GROUP BY toppings.t_id
        `;

        // Use dbquery as a Promise and pass the parameter safely
        const results = await dbms.dbquery(query, [month]);

        // Debugging: Log fetched data
        console.log("Orders fetched:", JSON.stringify(results, null, 2));

        res.json(results);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Failed to fetch order data" });
    }
});

module.exports = router;