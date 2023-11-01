// ... Your existing JavaScript code for toggling fields ...

// Add an event listener for the form submission
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
     var formData = {
            orderingCustomerType: orderingCustomerType,
            account50a: account50a,
            identifierCode50a: identifierCode50a,
            partyIdentifier50a: partyIdentifier50a,
            nameAndAddressF50a: nameAndAddressF50a,
            nameAndAddress50a: nameAndAddress50a
        };

        // Convert the object to JSON
        var formDataJSON = JSON.stringify(formData);

        // Save the JSON data to a text file
        var blob = new Blob([formDataJSON], { type: 'text/plain' });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "formData.json";
        a.click();
});
