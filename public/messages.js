$(function() {

  var form = $('#messages-form');

  function onSubmit(event) {

    $.ajax({
      url: $(form).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: form.serialize(),
    })
    .done(function (response) {
      var message = response.text + ' (' + response.ago + ')';
      $('#messages-list').prepend($('<li>').text(message));
    });

    $("input[name='text']").val('');

    event.preventDefault();
  }

  form.submit(onSubmit);
});
