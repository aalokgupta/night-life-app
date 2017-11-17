const express = require('express');
const request = require('request');
var app = express();

const API_KEY = "AIzaSyDF19dkByvXcwO-iHUSTxge4i1zcsR8Sd4";
app.use('/public' , express.static(process.cwd() + '/public'));
app.use('/controller' , express.static(process.cwd() + '/controller'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/home.html');
});


app.get('/search/:text', (req, res) => {
    console.log("search query = "+req.params.text);
    var google_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ encodeURIComponent(req.params.text) + "&key=" + API_KEY;
    console.log("google url " +google_url);
    request({url: google_url,
            json: true,
            }, function(error, response, body){

              if(body.status === "ZERO_RESULTS"){
                console.log("No result found for the search");
              }
              else if(body.status === "OK"){
                  console.log("response body is "+JSON.stringify(body, undefined, 2));
                  res.send(JSON.stringify(body, undefined, 2));
              }
          });

});

const port_no = 8080;
app.listen(8080, () => {
  console.log("server started listening at port no "+port_no);
});


//


// AIzaSyBhh1bs8h6fx9Rmx8AZmBcpeAt7UCiadDQ
