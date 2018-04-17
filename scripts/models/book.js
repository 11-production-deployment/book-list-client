'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/ab-bb-booklist.git'; 
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;



(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawDataObject) {
    Object.keys(rawDataObject).forEach(key => this[key] = rawDataObject[key]);
  }


  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.all = [];

  Book.loadAll = rows => {
    rows.sort((a, b) => b.title - a.title);
    Book.all = rows.map(book => new Book(book));
  };

  Book.numBooks = () => {
    return Book.all.length;
  };

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)

      .then(Book.loadAll)
      .then(callback)
      .catch(app.errorCallback);
  };
  module.Book = Book;
})(app);

