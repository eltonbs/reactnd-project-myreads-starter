import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  render() {
    const shelfs = {
      currentlyReading: this.props.books.filter(
        book => book.shelf === 'currentlyReading'
      ),
      wantToRead: this.props.books.filter(
        book => book.shelf === 'wantToRead'
      ),
      read: this.props.books.filter(
        book => book.shelf === 'read'
      )
    };

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" books={shelfs.currentlyReading}
            />
            <Bookshelf title="Want to Read" books={shelfs.wantToRead} />
            <Bookshelf title="Read" books={shelfs.read} />
          </div>
          <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>
              Add a book
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
};

export default ListBooks;
