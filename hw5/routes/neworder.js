//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const db = require("./dbms.js")
const mysql = require('mysql');

router.post('/', (req, res) => {
    const { month, topping, quantity, notes } = req.body;

    const toppingQuery = `SELECT t_id FROM toppings WHERE name = ?`;

    dbms.dbquery(toppingQuery, [topping], (err, results) => {
        if (err || results.length === 0) {
            res.status(400).json({ error: "Invalid topping" });
            return;
        }

        const t_id = results[0].t_id;
        const insertQuery = `INSERT INTO orders (t_id, quantity, notes, month) VALUES (?, ?, ?, ?)`;

        dbms.dbquery(insertQuery, [t_id, quantity, month], (err) => {
            if (err) {
                console.error("Order insert error:", err);
                res.status(500).json({ error: "Failed to insert order" });
                return;
            }
            res.json({ success: true, message: "Order added successfully!" });
        });
    });
});

module.exports = router;