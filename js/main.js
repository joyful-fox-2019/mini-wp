$( document ).ready(function() {
    $('#navbar').show()
    $('#sidebar').show()
    $('#add-page').hide()
});

function addPage() {
    $('#sidebar').hide()
    $('#add-page').show()
}

function home() {
    $('#navbar').show()
    $('#sidebar').show()
    $('#add-page').hide()
}