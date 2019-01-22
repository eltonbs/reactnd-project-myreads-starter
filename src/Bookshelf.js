import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            books={this.props.books}
            onShelfChange={this.props.onShelfChange}
          />
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Bookshelf;
