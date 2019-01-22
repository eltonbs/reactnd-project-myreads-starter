import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  handleShelfChange = shelf => {
    const { book } = this.props;
    book.shelf = shelf;
    this.props.onShelfChange(book);
  };

  render() {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")`
              }}
            />
            <BookshelfChanger
              shelf={book.shelf}
              onChange={this.handleShelfChange}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(', ')}
          </div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;
