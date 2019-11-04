function dashboard() {
    $("#editor").hide()
    $(".ql-snow").hide()
    $("#landingPage").show()
}

function quill() {
    var quill = new Quill('#editor', {
        theme: 'snow'
    });
    $("#editor").show()
    $("#landingPage").hide()
};