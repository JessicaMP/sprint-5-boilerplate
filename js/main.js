(function begin() {
    $('.modal').modal();

    /* Imprimir todos los temas del API */
    const themePage = function(temas) {

        temas.forEach(function(tema) {
          const subTema = tema.content;
          const idTema = tema.id;
          const autorTema = tema.author_name;
          const nRespuestas = tema.responses_count;
        
        $('#view-theme').append(`<div class="col s5 card-panel teal box">
                                <div class="headerForo"><p class="white-text right-align">${'User: ' + autorTema}</p></div>
                                    <div class="mainForo">
                                    <a class=" pink-text lighten-4-text" href="verTopic.html?topic_id=${idTema}"><center><h5>${'TEMA: ' + subTema}</a></h5></center>
                                    </div>
                                    <div class="footerForo">
                                    <h6><span class="white-text"> ${' N° Respuestas: ' + nRespuestas }</span></h6></div>
                                    </div>`);
        });
      };

    /* BUSCAR COINCIDENCIAS DE TEMAS */
    const search = function(temas) {
        let agree = temas.map((val) => val.content);
        $('#search-btn').autocomplete({
          source: agree
        });
      };

     /* FunciÃ³n para manejar errores */
     const error = function() {
        console.log('Se ha producido un error');  
      };

   
      /* CONSEGUIR TODOS LOS TEMAS */
      $.ajax({
        url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
        // dataType: 'json',
        contentType: 'aplication/json'
      }).done(themePage)
        .done(search)
        .fail(error);
    
        $('#view-theme').html('');

    /* CREAR UN TEMA NUEVO AL DAR CLIC EN GUARDAR */
    $('#guardar').click(function() {
        let newAutor = $('#input-autor').val();
        let newTema = $('#input-sms').val();
        $.post('https://examen-laboratoria-sprint-5.herokuapp.com/topics',
          {
            author_name: nuevoAutor,
            content: nuevoTema
          },
          function(data, status) {
            $('.modal').modal('hide');
            let firstChil = $('#view-theme').eq(0);
            $(firstChil).prepend(`<div class="col s12"><h2 data-id=${data.id}>${data.author_name}</h2> <h4><span class="totalRespon"> respuestas</span></h4>
          <p><a href="">${data.content}</a></p></div>`);         
            });
      });
})();