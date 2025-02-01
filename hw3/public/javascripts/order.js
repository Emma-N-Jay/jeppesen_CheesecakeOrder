//Written by Emma Jeppesen

//order.js
eventHandler = function(event) {
    event.preventDefault(); 

    // Check if notes contain vegan
    const notes = $("#notes").val().toLowerCase();

    if (notes.includes("vegan")) {
        alert("Warning: Cheesecakes contain dairy!");
    } else {
        // Replace form with confirmation message
        const topping = $("input[name='topping']:checked").val();
        const quantity = $("#quantity").val();

        const confirmationMessage = `
            <h2>Thank you! Your order has been placed.</h2>
            <p>Topping: ${topping}</p>
            <p>Quantity: ${quantity}</p>
            <p>Notes: ${notes}</p>
        `;

        // Remove and replace
        $("#qList").remove();
        $("#tList").remove();
        $("#toppingForm").remove();
        $("#notesSection").remove();
        $("#quantityForm").replaceWith(confirmationMessage);
    }
};

$(function() {
    $("#orderButton").click(eventHandler);
});
