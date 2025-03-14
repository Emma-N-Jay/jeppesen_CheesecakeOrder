//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require('./dbms.js');
const mysql = require('mysql');

router.post('/', (req, res) => {
    const { topping, quantity, notes } = req.body;

    //Debugging output
    console.log("Received order:", req.body); 

    if (!topping || !quantity) {
        return res.status(400).json({ error: "Topping and quantity are required" });
    }


    const monthMap = {
        "January": 1, "February": 2, "March": 3, "April": 4,
        "May": 5, "June": 6, "July": 7, "August": 8,
        "September": 9, "October": 10, "November": 11, "December": 12
    };
    
    //Set a hardcoded month and year
    const month = monthMap["March"]; 
    const year = 2025;

    const toppingQuery = `SELECT t_id FROM toppings WHERE name = '${topping}'`;

    dbms.dbquery(toppingQuery, (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database error while retrieving topping ID" });
        }
        
        if (!results || results.length === 0) {
            return res.status(400).json({ error: "Invalid topping" });
        }

        const t_id = results[0].t_id;
        const escapedNotes = mysql.escape(notes);
       
        //Values to insert
        const insertQuery = `INSERT INTO orders (t_id, quantity, notes, month, year) 
                         VALUES (${t_id}, ${quantity}, ${escapedNotes}, '${month}', ${year})`;


        dbms.dbquery(insertQuery, (err) => {
            if (err) {
                        console.error("Order insert error:", err);
                        return res.status(500).json({ error: "Failed to insert order" });
                    }

        // dbms.dbquery(insertQuery, [t_id, quantity, escapedNotes, month, year], (err) => {
        //     if (err) {
        //         console.error("Order insert error:", err);
        //         res.status(500).json({ error: "Failed to insert order" });
        //         return;
        //     }

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