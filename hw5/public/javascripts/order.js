//Author: Emma Jeppesen

//Make a function to fetch the orders
function fetchOrdersForMonth(month) {

    //Debugging
    console.log("Fetching orders for:", month);

    $.post("/orders", { month: month }, function(data) {
        console.log("Received JSON Order Data:", JSON.stringify(data, null, 2));

        //Ensure data exists
        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No order data received for month:", month);
            return;
    }

        //Update the displayed order totals
        $("#numCherry").text((data.find(t => t.topping === "Cherry")?.quantity || 0) + " Cherry");
        $("#numChoc").text((data.find(t => t.topping === "Chocolate")?.quantity || 0) + " Chocolate");
        $("#numPlain").text((data.find(t => t.topping === "Plain")?.quantity || 0) + " Plain");


    }).fail(function(jqXHR, textStatus, errorThrown) {
        //console.error("AJAX error:", textStatus, errorThrown);
        //console.error("Response text:", jqXHR.responseText);
        alert("Error: Could not fetch order data!");
    });
}


//order.js
eventHandler = function(event) {
    event.preventDefault(); 

    //Check if notes contain vegan
    const notes = $("#notes").val().toLowerCase();

    if (notes.includes("vegan")) {
        alert("Warning: Cheesecakes contain dairy!");
    } else {

        //Capture the order data first before modifying the DOM
        const topping = $("input[name='topping']:checked").val();
        const quantity = $("#quantity").val();
        const selectedMonth = $("#monthSelector").val();
 
        //Log captured values for debugging
        console.log("Captured order data:", { topping, quantity, selectedMonth, notes });

        const confirmationMessage = `
            <h2>Thank you! Your order has been placed.</h2>
            <p>Topping: ${topping}</p>
            <p>Quantity: ${quantity}</p>
            <p>Notes: ${notes}</p>
        `;

        //Remove and replace
        $("#qList, #tList, #toppingForm, #notesSection").remove();
        $("#quantityForm").replaceWith(confirmationMessage);

        //Log the new order
        $.post("/neworder", {

            month: selectedMonth,
            topping: topping,
            quantity: quantity,
            notes: notes
            
        }, function(response) {

            console.log("Order submitted:", response);
    
            //Retrieve the updated order totals for the month
            fetchOrdersForMonth(selectedMonth);

        }).fail(function() {
            alert("Error: Could not submit order!");
        });
    };

};

//For month consistency
const monthMap = {
    "January": "Jan", "February": "Feb", "March": "Mar", "April": "Apr",
    "May": "May", "June": "Jun", "July": "Jul", "August": "Aug",
    "September": "Sep", "October": "Oct", "November": "Nov", "December": "Dec"
};
    
var selectedMonth = $("#monthSelector").val();
var standardizedMonth = monthMap[selectedMonth] || selectedMonth;

$(function() {
    $("#orderButton").click(eventHandler);
    $("#monthSelector").change(function() {
        let selectedMonth = $(this).val();

        //Debugging log
        console.log("Selected month before standardizing:", selectedMonth); 
        console.log("Selected month after standardizing:", standardizedMonth);
        
        fetchOrdersForMonth(selectedMonth);

    });
});