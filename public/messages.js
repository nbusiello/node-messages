$(function() {

  var form = $('#messages-form');

  $('li > span').each(function(i, elem) {
    var date = moment(elem.innerText).fromNow();
    $(elem).text(date);
  });

  function onSubmit(event) {

    $.ajax({
      url: $(form).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: form.serialize(),
    })
    .done(function (response) {
      var date = moment(response.createdAt).fromNow();
      $('#messages-list').prepend('<li>' + response.text + ' (' + date + ')</li>');
    });

    $("input[name='text']").val('');

    event.preventDefault();
  }

  form.submit(onSubmit);
});
