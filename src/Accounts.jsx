import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Account from './components/Account';

class Accounts extends React.PureComponent {
  render() {
    const { accounts, getBalance, getTransactions } = this.props;

    return (
      <Fragment>
        <h1>Accounts</h1>
        {Object.values(accounts).map(account => (
          <Account
            key={account.meta.id}
            {...account}
            getBalance={getBalance}
            getTransactions={getTransactions}
          />
        ))}
      </Fragment>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.shape({
    meta: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
  getBalance: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
};

export default Accounts;
