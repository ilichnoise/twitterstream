$(document).ready(function() 
{
	//instancia de socket en el lado cliente
	var socket = io.connect('http://localhost:8080'),
	spanish = 0,
	english = 0;

	//caputramos el evento twitter
	socket.on('twitter', function(data) 
	{
          // var  data=JSON.parse(data_);
		if(data.lang === "en")
		{
			english+= 1;
		}
		else if(data.lang === "es")
		{
			spanish+= 1;
		}
                  //var aux=data.entities.media;
		$('.tweets').prepend('<li>' + data.text + '</li>');
                //console.log());
              if(typeof(data.entities.media[0].media_url)==="string"){
                  $('.tweets').prepend('<li><img src="'+data.entities.media[0].media_url+'" class="img-polaroid"></li>');
              }
             //   $('.tweets').prepend('<li>'+JSON.stringify(data)+'</li>');
		$('.countSpanish').html('').html('<h3>Hablando  en español: '+spanish+'</h3>');
		$('.countEnglish').html('').html('<h3>Hablando  en inglés: '+english+'</h3>');
	});
});