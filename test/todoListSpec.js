var createApp = require('../lib/app');
var mountApp = require('./mountApp');
var app = require('./pageModel');
var createServer = require('mock-xhr-router');

describe('TODO List', function(){
  it('adds a task to a list', function(){
    mountApp(createApp);
    return app.createTask().name().typeIn('bread').then(function(){
      return app.createTask().add().click();  
    }).then(function(){
      return app.taskNames().shouldHave({
        text: ['bread'],
        length: 1
      })
    });
  });

  it('shows a canned list', function(){
    var cannedList = ['bread', 'butter', 'jam'];
    mountApp(createApp, cannedList);

    return app.taskNames().shouldHave({
      text: ['bread', 'butter', 'jam'],
      length: 3
    })
  });

  it('saves a list to the server', function(){
    var cannedList = ['bread', 'butter', 'jam'];
    mountApp(createApp, cannedList);
    var server = createServer();
    server.post('/save', function(){});

    return app.save().click().then(function(){
      return server.shouldReceive({
        method: 'POST',
        url: '/save',
        body: ['bread', 'butter', 'jam']
      });
    });
  });
});
