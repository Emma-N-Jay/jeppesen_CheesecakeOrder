//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const db = require("./dbms")

//Retrieve order totals for selected month
router.post('/', (req, res) => {

    //get month
    const { month } = req.body;

    const query = `
        SELECT toppings.name AS topping, COALESCE(SUM(orders.quantity), 0) AS quantity
        FROM toppings
        LEFT JOIN orders ON toppings.t_id = orders.t_id AND orders.month = ?
        GROUP BY toppings.t_id
    `;

    // const query = `
    //     SELECT toppings.name AS topping, SUM(orders.quantity) AS quantity
    //     FROM orders
    //     JOIN toppings ON orders.t_id = toppings.t_id
    //     WHERE orders.month = '${month}'
    //     GROUP BY orders.t_id    
    // `;

    dbms.dbquery(query, [month], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Failed to fetch order data" });
            return;
        }
        res.json(results);
    });
});

module.exports = router;