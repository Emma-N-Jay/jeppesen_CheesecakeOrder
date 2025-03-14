//Author: Emma Jeppesen

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

        //Make a function to fetch the orders
        function fetchOrdersForMonth(month) {
            $.post("/orders", { month: month }, function(data) {
                console.log("Received JSON Order Data:", JSON.stringify(data, null, 2));
        
                //Update the displayed order totals
                $("#numCherry").text(data.find(t => t.topping === "Cherry")?.quantity + " Cherry");
                $("#numChoc").text(data.find(t => t.topping === "Chocolate")?.quantity + " Chocolate");
                $("#numPlain").text(data.find(t => t.topping === "Plain")?.quantity + " Plain");
        
            }).fail(function() {
                alert("Error: Could not fetch order data!");
            });
        }
    };

$(function() {
    $("#orderButton").click(eventHandler);
    $("#monthSelector").change(function() {
        fetchOrdersForMonth($(this).val());
    });
});