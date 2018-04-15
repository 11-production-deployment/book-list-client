const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/ab-bb-booklist.git'; 
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

if (ENV.isProduction){
  alert('hi');
}

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  function Task(taskObject) {
    Object.keys(taskObject).forEach(key => this[key] = taskObject[key]);
  }
  Task.prototype.toHtml = function() {
    let template = Handlebars.compile($('#task-template').text());
    return template(this);
  }
  Task.all = [];
  Task.loadAll = rows => {
    Task.all = rows.sort((a, b) => b.title - a.title).map(task => new Task(task));
  }
  Task.fetchAll = callback =>
    $.get(`${ENV.apiUrl}/books`)
      .then(Task.loadAll)
      .then(callback)
      .catch(errorCallback);
  module.Task = Task;
})(app)

