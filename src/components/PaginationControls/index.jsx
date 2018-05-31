import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class PaginationControls extends React.PureComponent {
  render() {
    const {
      totalPageCount,
      page,
      handleNextPage,
      handlePreviousPage,
    } = this.props;

    return (
      <div className="mzw__pagination-controls">
        <button onClick={handlePreviousPage}>Previous</button>
        <div className="mzw__pagination-controls__description">
          Page {page} of {totalPageCount}
        </div>
        <button onClick={handleNextPage}>Next</button>
      </div>
    );
  }
}

PaginationControls.propTypes = {
  totalPageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
};

export default PaginationControls;
