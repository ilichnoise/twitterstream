var express = require("express"), 
http = require("http"),
app = express(),
server = http.createServer(app),
path = require('path'),
twitter = require('ntwitter');

var fs = require("fs");
 
app.use(express.static(path.join(__dirname, 'public')));
 
app.set("views",__dirname + "/views");
//app.configure(function(){
    app.use(express.static(__dirname));
//});
 
server.listen(8080);
 
var io = require("socket.io").listen(server);

//configuración de los datos de nuestra app de twitter
var credentialsTwitter = new twitter({
  consumer_key: 'C9w2lM72KNQYwxhKlhgDxDmUl',
  consumer_secret: 'rNj26BsR7CzW99Ge1c0QGBTjuvV73RBI7GjP2Np2lcmImzwce2',
  access_token_key: '367514110-xDcVc3LRvMYz2kUUWvy7epDcKPy4BTsSAAbth3o1',
  access_token_secret:'oUFdUfrdmDc2TuV9GlVDniZHs1D9e6JXUjn5YWfTAPBON'
});


app.get("/", function(req,res)
{
    res.render("index.jade", {title : "Twitter in stream with NodeJS, Socket.IO and jQuery"});
});


var path = 'public/bd.txt';
//más info de status/filter en 
//https://dev.twitter.com/docs/streaming-apis/parameters
io.sockets.on('connection', function(socket) 
{
 
  credentialsTwitter.stream('statuses/filter', 
  	{
	  	'track':'#MeEmocionoComoElPiojo',//filtramos por la palabra playstation
	  	'filter_level':'low',//el nivel del filtro
	  	'language':'es,en'//filtramos solo en español y en inglés
	},
    function(stream) 
    {
	    stream.on('data',function(data)
	    {
           
         
                if (typeof(data.entities.media) !== "undefined")
                {
//code for what to do with json here
                      
                        socket.emit('twitter',data);
                        var str_data=JSON.stringify(data);
                        buffer = new Buffer(str_data+"\n");

                        fs.open(path, 'a', function(err, fd) {
                            if (err) {
                                    throw 'error opening file: ' + err;
                            }else{
                                    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                            if (err) throw 'error writing file: ' + err;
                            fs.close(fd, function() {
                            console.log('file written');
                            })});
                            
                            }
                        });
                }
                  
                
            
            });
        
    });
});





