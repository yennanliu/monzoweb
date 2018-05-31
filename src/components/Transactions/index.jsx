import React from 'react';
import PropTypes from 'prop-types';
import Transaction from '../Transaction';
import PaginationControls from '../PaginationControls';

const paginate = (array, pageSize, pageNumber) => {
  const arrayPageNumber = pageNumber - 1;
  return array.slice(arrayPageNumber * pageSize, (arrayPageNumber + 1) * pageSize);
};

class Transactions extends React.PureComponent {
  constructor() {
    super();

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);

    this.state = {
      page: 1,
    };
  }

  handlePreviousPage() {
    const { page } = this.state;
    if (page - 1 !== 0) this.setState({ page: page - 1 });
  }

  handleNextPage() {
    const { pageSize } = this.props;
    const nextPage = paginate(this.props.transactions, pageSize, this.state.page + 1);
    if (nextPage.length !== 0) this.setState({ page: this.state.page + 1 });
  }

  render() {
    const { transactions, pageSize, sortDesc } = this.props;
    const { page } = this.state;
    let sortedTransactions = transactions;

    if (sortDesc) sortedTransactions = sortedTransactions.reverse();

    return (
      <div>
        {paginate(sortedTransactions, pageSize, page).map(transaction => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
        <PaginationControls
          page={page}
          totalPageCount={Math.ceil(transactions.length / pageSize)}
          handleNextPage={this.handleNextPage}
          handlePreviousPage={this.handlePreviousPage}
        />
      </div>
    );
  }
}

Transactions.defaultProps = {
  transactions: [],
  pageSize: 25,
  sortDesc: true,
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  pageSize: PropTypes.number,
  sortDesc: PropTypes.bool,
};

export default Transactions;
