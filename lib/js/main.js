$(document).ready(function() {
    $('#text_number_input').val('');
    $('#number_input').val('');
})

$('#text_number_input').on('click', function() {
    $("#keyboard_number").fadeOut();
    $("#keyboard_text").fadeIn();
    $('#keyboard_text').jkeyboard({
        input: $('#text_number_input')
    });
    $('.letter').on('click', function() {
        var value = $('#text_number_input').val();
        var value1 = value.innerText = Hangul.assemble(value);
        $('#text_number_input').val(value1);
        console.log(value1);
    })

})
$("#number_input").click(function() {
    $("#keyboard_text").fadeOut();
    $("#keyboard_number").fadeIn();
    $('#keyboard_number').jkeyboard({
        input: $('#number_input'),
        layout: "numbers_only",
    });
});