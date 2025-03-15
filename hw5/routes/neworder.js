//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();
const dbms = require('./dbms_promise.js');
const mysql = require('mysql');

//Test to see if it can be accurate dynamically
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

//Added async for the promise version
router.post('/', async(req, res) => {
    const { topping, quantity, notes } = req.body;

    //Debugging output
    console.log("Received order:", req.body); 

    if (!topping || !quantity) {
        return res.status(400).json({ error: "Topping and quantity are required" });
    }

    //Make the months numbers for simplicity and db
    const monthMap = {
        "January": 1, "February": 2, "March": 3, "April": 4,
        "May": 5, "June": 6, "July": 7, "August": 8,
        "September": 9, "October": 10, "November": 11, "December": 12
    };
    
    //Set a hardcoded month and year (For testing)
    const month = monthMap["March"]; 
    const year = 2025;

    //const month = currentMonth;
    //const year = currentYear;

    //dbms promise testing!

    try {
        //Get the topping ID
        const toppingQuery = `SELECT t_id FROM toppings WHERE LOWER(name) = LOWER('${topping}')`;
        
        const results = await dbms.dbquery(toppingQuery);
        
        if (!results || results.length === 0) {
            return res.status(400).json({ error: "Invalid topping" });
        }

        const t_id = results[0].t_id;
        console.log(`Found topping ID for '${topping}': ${t_id}`);

        const escapedNotes = mysql.escape(notes);

        // Values to insert
        const insertQuery = `
            INSERT INTO orders (t_id, quantity, notes, month, year) 
            VALUES (${t_id}, ${quantity}, ${escapedNotes}, ${month}, ${year})
        `;

        console.log("Executing Insert Query:", insertQuery);
        
        await dbms.dbquery(insertQuery);

        res.json({ success: true, message: "Order added successfully!" });

    } catch (err) {
        console.error("Order insert error:", err);
        console.error("Full Error: ", JSON.stringify(err, null, 2));
        return res.status(500).json({ error: "Failed to insert order" });
    }
});








    //For the regular dbms

//     const toppingQuery = `SELECT t_id FROM toppings WHERE name = '${topping}'`;

//     dbms.dbquery(toppingQuery, (err, results) => {
//         if (err) {
//             console.error("Database query failed:", err);
//             return res.status(500).json({ error: "Database error while retrieving topping ID" });
//         }
        
//         if (!results || results.length === 0) {
//             return res.status(400).json({ error: "Invalid topping" });
//         }

//         const t_id = results[0].t_id;
//         const escapedNotes = mysql.escape(notes);
       
//         //Values to insert
//         const insertQuery = `INSERT INTO orders (t_id, quantity, notes, month, year) 
//                          VALUES (${t_id}, ${quantity}, ${escapedNotes}, '${month}', ${year})`;


//         dbms.dbquery(insertQuery, (err) => {
//             if (err) {
//                         console.error("Order insert error:", err);
//                         return res.status(500).json({ error: "Failed to insert order" });
//                     }

//         // dbms.dbquery(insertQuery, [t_id, quantity, escapedNotes, month, year], (err) => {
//         //     if (err) {
//         //         console.error("Order insert error:", err);
//         //         res.status(500).json({ error: "Failed to insert order" });
//         //         return;
//         //     }

//             res.json({ success: true, message: "Order added successfully!" });
//         });
//     });

//     dbms.dbquery("SELECT * FROM orders ORDER BY order_id DESC LIMIT 5", (err, results) => {
//         if (err) {
//             console.error("Failed to retrieve inserted orders:", err);
//         } else {
//             console.log("Recent Orders in DB:", JSON.stringify(results, null, 2));
//         }
//     });

// });

module.exports = router;