import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  removeBook = (books, book) => books.filter(item => item.id !== book.id);

  addBook = (books, book) => [...books, book];

  onShelfChange = updatedBook => {
    BooksAPI.update(updatedBook, updatedBook.shelf).then(() => {
      // remove and add book to keep API sorting

      // if updatedbook is in books
      if (this.state.books.find(book => book.id === updatedBook.id)) {
        this.setState(prevState => ({
          books: this.removeBook(prevState.books, updatedBook)
        }));
      }

      if (updatedBook.shelf !== 'none') {
        this.setState(prevState => ({
          books: this.addBook(prevState.books, updatedBook)
        }));
      }
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
