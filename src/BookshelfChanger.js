import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerImage from './icons/tail-spin.svg';
import ArrowDownImage from './icons/arrow-drop-down.svg';

class BookshelfChanger extends Component {
  state = {
    loading: false
  };

  handleChange = event => {
    this.setState({ loading: true });
    this.props.onChange(event.target.value);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div
        className="book-shelf-changer"
        style={{
          backgroundImage: `url(${
            this.state.loading ? SpinnerImage : ArrowDownImage
          })`
        }}
      >
        <select value={this.props.shelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookshelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BookshelfChanger;
