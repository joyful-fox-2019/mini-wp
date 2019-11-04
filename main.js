var quill = new Quill('#editor', {
    theme: 'snow'
  });

$( document ).ready(function() {
    console.log( "ready!" );
    $('.content-body')
});

$("#add-article").click(function(){
    $(".editor-page").show();
    $(".content-body").hide()
    console.log('kepencet buttonnya')
  });