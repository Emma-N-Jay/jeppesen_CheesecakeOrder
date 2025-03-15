//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require("./dbms")

//Retrieve order totals for selected month
router.post('/', (req, res) => {

    //get month
    const { month } = req.body;

    //Check the month is there
    if (!month) {
        console.error("Error: Month parameter is missing");
        return res.status(400).json({ error: "Month parameter is missing" });
    }

    //For debugging
    console.log("Fetching orders for month:", month);

    const query = `SELECT topping, SUM(quantity) AS quantity FROM orders WHERE month = '${month}' GROUP BY topping;`;

    // const query = `
    //     SELECT toppings.name AS topping, COALESCE(SUM(orders.quantity), 0) AS quantity
    //     FROM toppings
    //     LEFT JOIN orders ON toppings.t_id = orders.t_id AND orders.month = '${month}'
    //     GROUP BY toppings.t_id
    // `;

    // const query = `
    //     SELECT toppings.name AS topping, SUM(orders.quantity) AS quantity
    //     FROM orders
    //     JOIN toppings ON orders.t_id = toppings.t_id
    //     WHERE orders.month = '${month}'
    //     GROUP BY orders.t_id    
    // `;

    dbms.dbquery(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            console.log("Failed to fetch order data for month: ", month);
            res.status(500).json({ error: "Failed to fetch order data" });
            return;
        }

        //See if we catch any errors
        console.log("Orders fetched:", JSON.stringify(results, null, 2));

        res.json(results);
    });

     //See if we catch any errors
     console.log("Orders fetched:", JSON.stringify(results, null, 2));

});

module.exports = router;