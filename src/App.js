import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
// notification
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const shelfEnum = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  notify = book => {
    book.shelf === 'none'
      ? toast.error(
          <span>
            <b>{book.title}</b> has been removed from your reads.
          </span>
        )
      : toast.success(
          <span>
            <b>{book.title}</b> has been moved to <b>{shelfEnum[book.shelf]}</b>.
          </span>
        );
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

      this.notify(updatedBook);
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

        <Route path="/search" render={() => (
          <SearchBooks
            userBooks={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )} />

        <ToastContainer hideProgressBar transition={Slide} />
      </div>
    );
  }
}

export default BooksApp;
