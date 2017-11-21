const express = require('express');
const request = require('request');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var expressSession = require('express-session');
var app = express();

const GOOGLE_API_KEY = "AIzaSyDF19dkByvXcwO-iHUSTxge4i1zcsR8Sd4";
const TWITTER_API_KEY = "ZMNIsIkRsV0YSVrfrvj4Gdaey";
const TWITTER_API_SECRET = "iJSWlCocDxf4VtJUuoADOhvRE5zAnKi79KC2xTpLURiQ5FQgPS";


passport.use(new Strategy({
  consumerKey: TWITTER_API_KEY,
  consumerSecret: TWITTER_API_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb){
  return cb(null, profile);
}
));

passport.serializeUser(function(user, cb){
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});

// app.use(cookieParser());
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/public' , express.static(process.cwd() + '/public'));
app.use('/controller' , express.static(process.cwd() + '/controller'));

//
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(""+ now + ":" +req.method + " "+req.url);
  next();
});


app.get('/auth/twitter/callback',
   passport.authenticate('twitter', {failureRedirect: '/'}),
        function(req, res) {
          console.log("Inside twitter call back");
          res.redirect('/');
        });


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/home.html');
});

app.get('/auth/twitter',
   passport.authenticate('twitter'), function(req, res){
   });



app.get('/search/:text', (req, res) => {
    console.log("search query = "+req.params.text);
    var google_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ encodeURIComponent(req.params.text) + "&key=" + GOOGLE_API_KEY;
    console.log("google url " +google_url);
    request({url: google_url,
            json: true,
            }, function(error, response, body){

              if(body.status === "ZERO_RESULTS"){
                console.log("No result found for the search");
              }
              else if(body.status === "OK"){
                  // console.log("response body is "+JSON.stringify(body, undefined, 2));
                  res.send(JSON.stringify(body, undefined, 2));
              }
          });
});




  const port_no = process.env.PORT || 8080;
  app.listen(8080, () => {
    console.log("server started listening at port no "+port_no);
  });
//


// AIzaSyBhh1bs8h6fx9Rmx8AZmBcpeAt7UCiadDQ
