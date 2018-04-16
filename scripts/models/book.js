const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/ab-bb-booklist.git'; 
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

if (ENV.isProduction){
  alert('hi');
}

let app = app || {};

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(taskObject) {
    Object.keys(taskObject).forEach(key => this[key] = taskObject[key]);
  }
  
  Book.all = [];

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };


  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => b.title - a.title).map(task => new Book(task));
  };

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  };
  module.Task = Book;
})(app);

