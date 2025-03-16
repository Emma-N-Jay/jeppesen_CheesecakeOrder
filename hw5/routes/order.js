//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require("./dbms_promise")

//I think this will fix all my problems.
//As I have devolved into insanity, I believe I was asking for a date using month string, not int
//I will make up for my crimes now
const monthMap = {
    "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4",
    "May": "5", "Jun": "6", "Jul": "7", "Aug": "8",
    "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
};



//Retrieve order totals for selected month
router.post('/', async(req, res) => {

    try {
        // Get month
        const { month } = req.body;
        const monthNumber = monthMap[month]; // Convert 'Mar' -> '03'

        // Check if the month is provided
        if (!monthNumber) {
            console.error("Invalid month input:", month);
            return res.status(400).json({ error: "Invalid month parameter" });
        }

        // Debugging
        console.log("Fetching orders for month:", month);

        const query = `
            SELECT toppings.name AS topping, COALESCE(SUM(orders.quantity), 0) AS quantity
            FROM toppings
            LEFT JOIN orders ON toppings.t_id = orders.t_id AND orders.month = '${monthNumber}'
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