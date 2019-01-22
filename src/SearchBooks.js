import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {
  state = {
    resultBooks: []
  };

  handleSearch = event => {
    const query = event.target.value;

    BooksAPI.search(query).then(result => {
      
      if (result.error === 'empty query') {
        this.setState({
          resultBooks: []
        });

        return;
      }

      result.forEach(book => {
        const userBook = this.props.userBooks.find(
          userBook => userBook.id === book.id
        );

        book.shelf = userBook ? userBook.shelf : 'none';
      });

      this.setState({
        resultBooks: result
      });
    });
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.handleSearch}
                autoFocus
              />
            </div>
          </div>
          <div className="search-books-results">
            <BooksGrid
              books={this.state.resultBooks}
              onShelfChange={this.props.onShelfChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  userBooks: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default SearchBooks;
