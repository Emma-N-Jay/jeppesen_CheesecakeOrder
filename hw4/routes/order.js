//Author: Emma Jeppesen

const express = require('express');
const router = express.Router();

//To update orders per month. Array per month which includes month, topping, and quantity
let monthlyTotals = {
    Jan: { Cherry: 11, Chocolate: 17, Plain: 31 },
    Feb: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Mar: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Apr: { Cherry: 0, Chocolate: 0, Plain: 0 },
    May: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Jun: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Jul: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Aug: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Sep: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Oct: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Nov: { Cherry: 0, Chocolate: 0, Plain: 0 },
    Dec: { Cherry: 0, Chocolate: 0, Plain: 0 }
  };

//For the first checkpoint of HW4
//router.get('/', (req, res) => {
//    res.json([
//        { topping: "Cherry", quantity: 11 },
//        { topping: "Chocolate", quantity: 17 },
//        { topping: "Plain", quantity: 31 }
//    ]);
//});


//Handle POST request to /orders
router.post('/', (req, res) => {

    //Extract data from the request body
    const { month, topping, quantity, notes } = req.body;

    //Convert quantity to a number
    const qty = parseInt(quantity, 10) || 0;

    //Make sure the month exists in our monthlyTotals and if not, initialize it
    if (!monthlyTotals[month]) {

        monthlyTotals[month] = { Cherry: 0, Chocolate: 0, Plain: 0 };

    }

    //If the topping exists in the monthlyTotals for that month add the quantity
    if (monthlyTotals[month].hasOwnProperty(topping)) {

        monthlyTotals[month][topping] += qty;

    } else {

        //If the topping isn't in the totals
        monthlyTotals[month][topping] = qty;

    }

    //Prepare the response orders array for the given month
    const ordersForMonth = [
        { topping: "Cherry", quantity: monthlyTotals[month].Cherry },
        { topping: "Chocolate", quantity: monthlyTotals[month].Chocolate },
        { topping: "Plain", quantity: monthlyTotals[month].Plain }
    ];

    //Test by logging to see expected numbers
    console.log(`Received order: month=${month}, topping=${topping}, quantity=${qty}`);

    res.json(ordersForMonth);

    //The hardcoded orders from Jan for the first part of HW4
    const hardCodedOrders = [
        { topping: "Cherry", quantity: month === "Jan" ? 11 : 0 },
        { topping: "Chocolate", quantity: month === "Jan" ? 17 : 0 },
        { topping: "Plain", quantity: month === "Jan" ? 31 : 0 }
    ];

    //res.json(hardCodedOrders);
    
});

module.exports = router;
