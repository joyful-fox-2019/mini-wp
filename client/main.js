$(document).ready(function () {
    $('.col-md-2').hide()
    $('.btn-back').hide()
    $('.blogcontent').removeClass('col-md-10')
    $('.blogcontent').addClass('col-md-12')
    $('.ql-snow').hide()
    $('.edit').hide()
    $('.adding').hide()
    $('.mySites').on('click', function (event) {
        event.preventDefault()
        $('.col-md-2').toggle()
        $('.mySites').toggleClass('active')
        $('.blogcontent').toggleClass('col-md-12')
        $('.blogcontent').toggleClass('col-md-10')
    })
    $('.btn-add').on('click', function (event) {
        event.preventDefault()
        $('.containerBlog').hide()
        $('.btn-add').hide()
        $('.btn-back').show()
        $('.edit').show()
        $('.ql-snow').show()
        $('.adding').show()
    })
    $('.btn-back').on('click', function (event) {
        event.preventDefault()
        $('.containerBlog').show()
        $('.btn-add').show()
        $('.btn-back').hide()
        $('.ql-snow').hide()
        $('.edit').hide()
        $('.adding').hide()
    })
})

const quill = new Quill('#editor', {
    theme: 'snow'
});