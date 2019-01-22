import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BooksGrid = props => {
  return (
    <ol className="books-grid">
      {props.books.map(item => (
        <Book
          book={item}
          key={item.id}
          onShelfChange={props.onShelfChange}
        />
      ))}
    </ol>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired
};

export default BooksGrid;
