var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("required"); // Select only fields with "required" class
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//-------------------------------- tag20 validation--------------------------------------------------

function validatetag20() {
  var senderReference = document.getElementById("tag20").value;

  // Define regular expressions for validation rules
  var pattern = /^[A-Za-z0-9]{1,16}$/;  // 16 alphanumeric characters
  var noConsecutiveSlashes = /[^/]{2,}/;  // No consecutive slashes

  // Check if the senderReference matches the format
  if (pattern.test(senderReference)) {
    // Check for network-validated rule: Must not start or end with '/'
    if (!senderReference.startsWith('/') && !senderReference.endsWith('/')) {
      // Check for network-validated rule: Must not contain two consecutive slashes
      if (noConsecutiveSlashes.test(senderReference)) {
        //document.getElementById("validationResult").textContent = "Valid";
      } else {
        document.getElementById("validationResult-tag20").textContent = "Error: Sender's Reference contains two consecutive slashes ('//')";
      }
    } else {
      document.getElementById("validationResult-tag20").textContent = "Error: Sender's Reference starts or ends with a slash ('/')";
    }
  } else {
    document.getElementById("validationResult-tag20").textContent = "Error: Sender's Reference does not match the required format (16 alphanumeric characters)";
  }
}

//-------------------------------- tag23B validation--------------------------------------------------

var formValid = false;
function validatetag23B() {
  var BankOperationCode = document.getElementById("tag23B").value;

  // Define regular expressions for validation rules
  var pattern = /^(CRED|CRTS|SPAY|SPRI|SSTD)$/;

  // Check if the BankOperationCode matches the format
  if (BankOperationCode.length !== 4) {
    document.getElementById("validationResult-tag23B").textContent = "Bank Operation Code should be 4 characters long.";
    formValid = false;
  } else if (BankOperationCode.length === 0) {
    document.getElementById("validationResult-23B").textContent = "Error: Bank Operation Code is mandatory.";
    formValid = false;
  } else if (!pattern.test(BankOperationCode)) {
    document.getElementById("validationResult-23B").textContent = "Bank Operation Code should be one of: CRED, CRTS, SPAY, SPRI, SSTD.";
    formValid = false;
  } else {
    //    document.getElementById("validationResult1").textContent = "Valid";
    formValid = true;
  }

  // Enable or disable navigation elements based on form validity
  updateNavigation();
}

// Function to enable or disable navigation elements based on form validity
function updateNavigation() {
  var nextPageLink = document.getElementById("nextBtn"); // Change 'nextPageLink' to the actual ID of your submit button
  var prevPageLink = document.getElementById("prevBtn"); // Change 'prevPageLink' to the actual ID of your link to another page

  if (formValid) {
    // Enable the submit button and the link to the other page
    nextPageLink.disabled = false;
    prevPageLink.disabled = false;
  } else {
    // Disable the submit button and the link to the other page
    nextPageLink.disabled = true;
    prevPageLink.disabled = false;
  }
}


//-------------------------------- tag32A validation--------------------------------------------------


//-------------------------------- tag50a validation--------------------------------------------------

function toggleFields50a() {
  var orderingCustomerType = document.getElementById("orderingCustomerType").value;
var account50a = document.getElementById("account50a");
var identifierCode50a = document.getElementById("identifierCode50a");
  var partyIdentifier50a = document.getElementById("partyIdentifier50a");
  var nameAndAddressF50a = document.getElementById("nameAndAddressF50a");
  var nameAndAddress50a = document.getElementById("nameAndAddress50a");

  // Hide all fields
  account50a.classList.add("hidden");
  identifierCode50a.classList.add("hidden");
  partyIdentifier50a.classList.add("hidden");
  nameAndAddressF50a.classList.add("hidden");
  nameAndAddress50a.classList.add("hidden");

  // Show fields based on the selected option
  if (orderingCustomerType === "Ordering Customer-OptionA") {
    account50a.classList.remove("hidden");
    identifierCode50a.classList.remove("hidden");
  } else if (orderingCustomerType === "Ordering Customer-OptionF") {
    partyIdentifier50a.classList.remove("hidden");
    nameAndAddressF50a.classList.remove("hidden");
  } else if (orderingCustomerType === "Ordering Customer-OptionK") {
    account50a.classList.remove("hidden");
    nameAndAddress50a.classList.remove("hidden");
  }
}

//-------------------------------- tag52a validation--------------------------------------------------

function toggleFields52a() {
  var institutionType = document.getElementById("institutionType").value;
  var partyIdentifier52a = document.getElementById("partyIdentifier52a");
  var identifierCode52a = document.getElementById("identifierCode52a");
  var partyIdentifier52aD = document.getElementById("partyIdentifier52aD");
  var nameAndAddress52a = document.getElementById("nameAndAddress52a");

  // Hide all fields
  partyIdentifier52a.classList.add("hidden");
  identifierCode52a.classList.add("hidden");
  partyIdentifier52aD.classList.add("hidden");
  nameAndAddress52a.classList.add("hidden");

  // Show fields based on the selected option
  if (institutionType === "Ordering Institution-OptionA") {
    partyIdentifier52a.classList.remove("hidden");
    identifierCode52a.classList.remove("hidden");
  } else if (institutionType === "Ordering Institution-OptionD") {
    partyIdentifier52aD.classList.remove("hidden");
    nameAndAddress52a.classList.remove("hidden");
  }
}

//-------------------------------- tag53a validation--------------------------------------------------

function toggleFields53a() {
  var SendersCorrespondentType = document.getElementById("SendersCorrespondentType").value;
  var partyIdentifier53a = document.getElementById("partyIdentifier53a");
  var identifierCode53a = document.getElementById("identifierCode53a");
  var partyIdentifierB53a = document.getElementById("partyIdentifierB53a");
  var nameAndAddress53a = document.getElementById("nameAndAddress53a");
  var location53a = document.getElementById("location53a");

  // Hide all fields
  partyIdentifier53a.classList.add("hidden");
  identifierCode53a.classList.add("hidden");
  partyIdentifierB53a.classList.add("hidden");
  nameAndAddress53a.classList.add("hidden");
  location53a.classList.add("hidden");

  switch (SendersCorrespondentType) {
    case "Senders Correspondent-OptionA":
      partyIdentifier53a.classList.remove("hidden");
      identifierCode53a.classList.remove("hidden");
      break;
    case "Senders Correspondent-OptionB":
      partyIdentifierB53a.classList.remove("hidden");
      location53a.classList.remove("hidden");
      break;
    case "Senders Correspondent-OptionD":
      partyIdentifier53a.classList.remove("hidden");
      nameAndAddress53a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}

//-------------------------------- tag54a validation--------------------------------------------------

function toggleFields54a() {
  var ReceiversCorrespondentType = document.getElementById("ReceiversCorrespondentType").value;
  var partyIdentifier54a = document.getElementById("partyIdentifier54a");
  var identifierCode54a = document.getElementById("identifierCode54a");
  var partyIdentifierB54a = document.getElementById("partyIdentifierB54a");
  var nameAndAddress54a = document.getElementById("nameAndAddress54a");
  var location54a = document.getElementById("location54a");

  // Hide all fields
  partyIdentifier54a.classList.add("hidden");
  identifierCode54a.classList.add("hidden");
  partyIdentifierB54a.classList.add("hidden");
  nameAndAddress54a.classList.add("hidden");
  location54a.classList.add("hidden");

  switch (ReceiversCorrespondentType) {
    case "Senders Correspondent-OptionA":
      partyIdentifier54a.classList.remove("hidden");
      identifierCode54a.classList.remove("hidden");
      break;
    case "Senders Correspondent-OptionB":
      partyIdentifierB54a.classList.remove("hidden");
      location54a.classList.remove("hidden");
      break;
    case "Senders Correspondent-OptionD":
      partyIdentifier54a.classList.remove("hidden");
      nameAndAddress54a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}

//-------------------------------- tag55a validation--------------------------------------------------

function toggleFields55a() {
  var ThirdReimbursementInstitutionType = document.getElementById("ThirdReimbursementInstitutionType").value;
  var partyIdentifier55a = document.getElementById("partyIdentifier55a");
  var identifierCode55a = document.getElementById("identifierCode55a");
  var partyIdentifierB55a = document.getElementById("partyIdentifierB55a");
  var nameAndAddress55a = document.getElementById("nameAndAddress55a");
  var location55a = document.getElementById("location55a");

  // Hide all fields
  partyIdentifier55a.classList.add("hidden");
  identifierCode55a.classList.add("hidden");
  partyIdentifierB55a.classList.add("hidden");
  nameAndAddress55a.classList.add("hidden");
  location55a.classList.add("hidden");

  switch (ThirdReimbursementInstitutionType) {
    case "Third Reimbursement Institution-OptionA":
      partyIdentifier55a.classList.remove("hidden");
      identifierCode55a.classList.remove("hidden");
      break;
    case "Third Reimbursement Institution-OptionB":
      partyIdentifierB55a.classList.remove("hidden");
      location55a.classList.remove("hidden");
      break;
    case "Third Reimbursement Institution-OptionD":
      partyIdentifier55a.classList.remove("hidden");
      nameAndAddress55a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}

//-------------------------------- tag56a validation--------------------------------------------------

function toggleFields56a() {
  var IntermediaryInstitutionType = document.getElementById("IntermediaryInstitutionType").value;
  var partyIdentifier56a = document.getElementById("partyIdentifier56a");
  var identifierCode56a = document.getElementById("identifierCode56a");
  var partyIdentifierC56a = document.getElementById("partyIdentifierC56a");
  var nameAndAddress56a = document.getElementById("nameAndAddress56a");

  // Hide all fields
  partyIdentifier56a.classList.add("hidden");
  identifierCode56a.classList.add("hidden");
  partyIdentifierC56a.classList.add("hidden");
  nameAndAddress56a.classList.add("hidden");

  switch (IntermediaryInstitutionType) {
    case "Intermediary Institution-OptionA":
      partyIdentifier56a.classList.remove("hidden");
      identifierCode56a.classList.remove("hidden");
      break;
    case "Intermediary Institution-OptionC":
      partyIdentifierC56a.classList.remove("hidden");
      break;
    case "Intermediary Institution-OptionD":
      partyIdentifier56a.classList.remove("hidden");
      nameAndAddress56a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}

//-------------------------------- tag57a validation--------------------------------------------------

function toggleFields57a() {
  var AccountWithInstitutionType = document.getElementById("AccountWithInstitutionType").value;
  var partyIdentifier57a = document.getElementById("partyIdentifier57a");
  var identifierCode57a = document.getElementById("identifierCode57a");
  var partyIdentifierB57a = document.getElementById("partyIdentifierB57a");
  var nameAndAddress57a = document.getElementById("nameAndAddress57a");
  var location57a = document.getElementById("location57a");
  // Hide all fields
  partyIdentifier57a.classList.add("hidden");
  identifierCode57a.classList.add("hidden");
  partyIdentifierB57a.classList.add("hidden");
  nameAndAddress57a.classList.add("hidden");
  location57a.classList.add("hidden");

  switch (AccountWithInstitutionType) {
    case "Account With Institution-OptionA":
      partyIdentifier57a.classList.remove("hidden");
      identifierCode57a.classList.remove("hidden");
      break;
    case "Account With Institution-OptionB":
      partyIdentifierB57a.classList.remove("hidden");
      location57a.classList.remove("hidden");
      break;
    case "Account With Institution-OptionC":
      partyIdentifier57a.classList.remove("hidden");
      break;
    case "Account With Institution-OptionD":
      partyIdentifier57a.classList.remove("hidden");
      nameAndAddress57a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}

//-------------------------------- tag59a validation--------------------------------------------------

function toggleFields59a() {
  var BeneficiaryCustomerType = document.getElementById("BeneficiaryCustomerType").value;
  var account59a = document.getElementById("account59a");
  var nameAndAddress59a = document.getElementById("nameAndAddress59a");
  var identifierCode59a = document.getElementById("identifierCode59a");
  var nameAndAddressF59a = document.getElementById("nameAndAddressF59a");
  // Hide all fields
  account59a.classList.add("hidden");
  nameAndAddress59a.classList.add("hidden");
  identifierCode59a.classList.add("hidden");
  nameAndAddress59a.classList.add("hidden");
  nameAndAddressF59a.classList.add("hidden");

  switch (BeneficiaryCustomerType) {
    case "Beneficiary Customer-NoLetterOption":
      account59a.classList.remove("hidden");
      nameAndAddress59a.classList.remove("hidden");
      break;
    case "Beneficiary Customer-OptionA":
      account59a.classList.remove("hidden");
      identifierCode59a.classList.remove("hidden");
      break;
    case "Beneficiary Customer-OptionF":
      account59a.classList.remove("hidden");
      nameAndAddressF59a.classList.remove("hidden");
      break;
    default:
      // Handle any other cases or provide a default behavior
      break;
  }
}
