//This function is dependent on jquery and bootstarap css, please remember to configure these two.

function ShowSuccessAlert(message) {
    document.getElementById('success-message').innerText = message;
    $('#top-alert-success').show();
    setTimeout(function () { DismissAlertSlowly(); }, 3000);
}

function ShowErrorAlert() {
    $('#top-alert-danger').show();
    setTimeout(function () { DismissAlertSlowly(); }, 3000);
}

function DismissAlert() {
    $('#top-alert-success').hide();
    $('#top-alert-danger').hide();
}

function DismissAlertSlowly() {
    $('#top-alert-success').fadeOut('slow');
    $('#top-alert-danger').fadeOut('slow');
}