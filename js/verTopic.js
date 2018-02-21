$('.modal').modal();

let topicId = getParameterByName('topic_id');

/*Tema del respectivo topic id */
const getTheme = function () {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
    contentType: 'aplication/json'
  }).done(intheme)
    .done(getAnswers)
    .fail(error);
};

/* Tema del id seleccionado */
const intheme = function (temas) {
  const theme = temas.content;
  const autor = temas.author_name;
  //$('#topic').append(`<h2>${temita}</h2><br><p>por:</p><h2>${autor}</h2>`);
  $('.user-topic').text(theme);
  $('.autor').text('autor: ' +  autor);
};

// Obtiene las respuestas del topic id encontrado
const getAnswers = function () {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(pushAnswers)
    .fail(error);
};

/* Ver todas las respuestas de ese  topic id */
const pushAnswers = function (response) {
  if (response.error === "No hay respuestas") {
    console.log(response.error);
  } else {
    response.forEach(function (resp) {
      const temarespuesta = resp.content;
      const authorespuesta = resp.author_name;
      $('.respuestas').append(`<div class="col l5 z-depth-5 s12 box">
                                <h2>${temarespuesta}</h2>
                                <p>por:</p>
                                <h5 class="right">${authorespuesta}</h5></div>`);
    })
  }
};

/* Funcion para manejar errores */
const error = function () {
  console.log('Se ha producido un error');
};

getTheme();

// ver respuestas 
$('#crearrespuesta').click(function () {
  let newAutor = $('#author').val();
  let newTema = $('#message').val();
  $.post(`https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    {
      author_name: newAutor,
      content: newTema,
      topic_id: topicId
    },
    //Agrega la data al html
    function (data, status) {
      let firstChil = $('.respuestas').eq(0);
      $(firstChil).prepend(`<div class="col l6"><h2>${data.content}</h2><br><p>por:</p><h2>${data.author_name}</h2><hr></div>`);
    });
});