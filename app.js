
/**
 * Module dependencies.
 */
var express = require("express");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var debug = require("debug")("angular-express-blog:app");
var mongo = require('mongodb').MongoClient;

var mongourl = "mongodb://localhost:27017/login";

mongo.connect(mongourl, {useUnifiedTopology: true}).catch(function(error){
  debug("Connect to mongodb " + mongourl + " was failed with error:\n\t" + error);
}).then(function(db){
  
  var routes = require('./routes');
  // var api = require('./routes/api')(db);
  var api = require('./routes/api');
  var app = express.createServer();
  
  // Configuration
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
      layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    app.use(session({
        store: new FileStore(),
        resave: false,
        saveUninitialized: false,
        secret: "Web Homework12 Blog"
    }));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });

  // Routes
  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);

  // JSON API
  app.get('/api/posts', api.posts);

  app.get('/api/post/:id', api.post);
  app.post('/api/post', api.addPost);
  app.put('/api/post/:id', api.editPost);
  app.delete('/api/post/:id', api.deletePost);

  // redirect all others to the index (HTML5 history)
  app.get('*', routes.Routers);

  // Start server
  app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
});