import React from 'react';
import PropTypes from 'prop-types';
import Transactions from '../Transactions';
import { monzoAmountToFormatted } from '../../transactionFns';

class Account extends React.PureComponent {
  componentDidMount() {
    const { getBalance, getTransactions, meta: { id } } = this.props;
    getBalance(id);
    getTransactions(id);
  }

  render() {
    const {
      balance,
      spend_today: spentToday,
      transactions,
    } = this.props;

    return (
      <div>
        <h2>Account</h2>
        <div>Balance: {monzoAmountToFormatted(balance, true)}</div>
        <div>Spent today: {monzoAmountToFormatted(spentToday)}</div>
        <Transactions transactions={transactions} />
      </div>
    );
  }
}

Account.defaultProps = {
  balance: undefined,
  spend_today: undefined,
  transactions: [],
};

Account.propTypes = {
  getBalance: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  balance: PropTypes.number,
  spend_today: PropTypes.number,
  transactions: PropTypes.arrayOf(PropTypes.object),
};

export default Account;
