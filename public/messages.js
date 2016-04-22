$(function() {

  var socket = io.connect();
  var form = $('#messages-form');

  socket.on('message', function (data) {

    var message = data.text + ' (' + data.ago + ') - ' + data.user.username;
    $('#messages-list').prepend($('<li>').text(message));
  });

  function onSubmit(event) {

    $.ajax({
      url: $(form).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: form.serialize()
    });

    $("input[name='text']").val('');

    event.preventDefault();
  }

  form.submit(onSubmit);
});
