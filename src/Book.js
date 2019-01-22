import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  handleShelfChange = event => {
    const { book } = this.props;
    book.shelf = event.target.value;
    this.props.onShelfChange(book);
  };

  render() {
    const { book } = this.props;
    if (!book.shelf) {
      book.shelf = 'none';
    }

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
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleShelfChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
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
