'use strict';

var app = app || {};

(function (module) {

  let bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(books => $('#book-list').append(books.toHtml()));
  };

module.bookView = bookView;

})(app);

// $(function () {
//   console.log('in IIFE?');
//   app.Task.fetchAll(app.taskView.initIndexPage);
// }