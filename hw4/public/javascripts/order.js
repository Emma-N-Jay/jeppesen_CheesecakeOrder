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
        $("#qList").remove();
        $("#tList").remove();
        $("#toppingForm").remove();
        $("#notesSection").remove();
        $("#quantityForm").replaceWith(confirmationMessage);

        //Post order! Get all the info and update DOM
        $.post("/orders",  {
            month: selectedMonth,
            topping: topping,
            quantity: quantity,
            notes: notes
        }, function(data){

            //Log and update order totals display
            const jsonString = JSON.stringify(data, null, 2);
            console.log("Received JSON Order:", jsonString);
            $("#numCherry").text(data[0].quantity + " Cherry");
            $("#numChoc").text(data[1].quantity + " Chocolate");
            $("#numPlain").text(data[2].quantity + " Plain");

        }).fail(function(){
            alert("Error: Could not fetch order data!");
        });
    }
};

$(function() {
    $("#orderButton").click(eventHandler);
});