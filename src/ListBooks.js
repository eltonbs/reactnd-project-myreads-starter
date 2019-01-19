import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  createShelfs = books => {
    return [
      {
        title: 'Currently Reading',
        id: 'currentlyReading',
        books: this.props.books.filter(
          book => book.shelf === 'currentlyReading'
        )
      },
      {
        title: 'Want to Read',
        id: 'wantToRead',
        books: this.props.books.filter(book => book.shelf === 'wantToRead')
      },
      {
        title: 'Read',
        id: 'read',
        books: this.props.books.filter(book => book.shelf === 'read')
      }
    ];
  };

  render() {
    const shelfs = this.createShelfs(this.props.books);

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {shelfs.map(shelf => (
              <Bookshelf
                title={shelf.title}
                key={shelf.id}
                books={shelf.books}
                onShelfChange={this.props.onShelfChange}
              />
            ))}
          </div>
          <div className="open-search">
            <Link to="search">
              <button>
                Add a book
              </button>
            </Link>
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
