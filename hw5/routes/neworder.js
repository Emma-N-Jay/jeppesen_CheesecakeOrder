//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require('./dbms.js');
const mysql = require('mysql');

router.post('/', (req, res) => {
    const { topping, quantity, notes } = req.body;

    // Set a hardcoded or random month and year
    const month = 'March'; // Hardcoded month or generate randomly
    const year = 2025; // Set a static year or randomize if needed

    const toppingQuery = `SELECT t_id FROM toppings WHERE name = ?`;

    dbms.dbquery(toppingQuery, [topping], (err, results) => {
        if (err || results.length === 0) {
            res.status(400).json({ error: "Invalid topping" });
            return;
        }

        const t_id = results[0].t_id;

        // Escape the notes to prevent SQL injection
        const escapedNotes = mysql.escape(notes);

        // Construct the INSERT statement, including all required columns
        const insertQuery = `INSERT INTO orders (t_id, quantity, notes, month, year) VALUES (?, ?, ?, ?, ?)`;

        dbms.dbquery(insertQuery, [t_id, quantity, escapedNotes, month, year], (err) => {
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




// const express = require('express');
// const router = express.Router();
// const db = require("./dbms.js")
// const mysql = require('mysql');

// router.post('/', (req, res) => {
//     const {topping, quantity, notes } = req.body;

//     const toppingQuery = `SELECT t_id FROM toppings WHERE name = ?`;

//     dbms.dbquery(toppingQuery, [topping], (err, results) => {
//         if (err || results.length === 0) {
//             res.status(400).json({ error: "Invalid topping" });
//             return;
//         }

//         const t_id = results[0].t_id;
//         const insertQuery = `INSERT INTO orders (t_id, quantity, notes, month) VALUES (?, ?, ?, ?)`;

//         dbms.dbquery(insertQuery, [t_id, quantity, month], (err) => {
//             if (err) {
//                 console.error("Order insert error:", err);
//                 res.status(500).json({ error: "Failed to insert order" });
//                 return;
//             }
//             res.json({ success: true, message: "Order added successfully!" });
//         });
//     });
// });

// module.exports = router;