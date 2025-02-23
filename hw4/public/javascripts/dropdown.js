//Author: Emma Jeppesen

//dropdown.js
$(function() {
    const $selectedMonth = $("#selectedMonth");
    const $monthOptions = $("#monthOptions");

    // Show dropdown options when clicking on the selected area
    $selectedMonth.click(function () {
        $monthOptions.toggle();
    });

    // Handle dropdown option selection
    $("#monthSelector").change(function () {
        // Get the selected month
        const selectedMonth = $(this).val(); 

        if (selectedMonth === "Jan") {
            // Restore original numbers for Jan
            $("#numCherry").text("11 Cherry");
            $("#numChoc").text("17 Chocolate");
            $("#numPlain").text("31 Plain");
        } else {
            // Set numbers to 0 for other months
            $("#numCherry").text("0 Cherry");
            $("#numChoc").text("0 Chocolate");
            $("#numPlain").text("0 Plain");
        }
    });
});
