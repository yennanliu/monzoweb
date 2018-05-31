import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteWrapper from './RouteWrapper';
import Accounts from './Accounts';

const redirectToAccounts = () => <Redirect to="/accounts" />;

class Authenticated extends React.PureComponent {
  constructor() {
    super();

    this.setStateForAccountId = this.setStateForAccountId.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      accounts: {},
      fetchingAccounts: false,
      error: undefined,
    };
  }

  componentDidMount() {
    this.getAccounts();
  }

  setStateForAccountId(accountId, newState) {
    const { accounts } = this.state;

    this.setState({
      accounts: {
        ...accounts,
        [accountId]: {
          ...accounts[accountId],
          ...newState,
        },
      },
    });
  }

  async getAccounts() {
    this.setState({ fetchingAccounts: true });

    try {
      const response = await fetch('https://api.monzo.com/accounts', {
        headers: {
          authorization: `Bearer ${localStorage.monzo_access_token}`,
        },
      });
      const { accounts } = await response.json();
      const openAccounts = accounts.filter(account => !account.closed);
      const accountsById = {};
      openAccounts.forEach((account) => {
        accountsById[account.id] = {
          meta: account,
          fetchingBalance: false,
          fetchingTransactions: false,
        };
      });
      this.setState({ accounts: accountsById });
    } catch (error) {
      this.setState({ error: 'Error getting accounts' });
    } finally {
      this.setState({ fetchingAccounts: false });
    }
  }

  async getBalance(accountId) {
    this.setStateForAccountId(accountId, { fetchingBalance: true });

    try {
      const response = await fetch(`https://api.monzo.com/balance?account_id=${accountId}`, {
        headers: {
          authorization: `Bearer ${localStorage.monzo_access_token}`,
        },
      });
      const balanceInformation = await response.json();
      this.setStateForAccountId(accountId, balanceInformation);
    } catch (error) {
      this.setState({ error: 'Error getting balance' });
    } finally {
      this.setStateForAccountId(accountId, { fetchingBalance: false });
    }
  }

  async getTransactions(accountId) {
    this.setStateForAccountId(accountId, { fetchingTransactions: true });

    try {
      const response = await fetch(`https://api.monzo.com/transactions?account_id=${accountId}&expand[]=merchant`, {
        headers: {
          authorization: `Bearer ${localStorage.monzo_access_token}`,
        },
      });
      const { transactions } = await response.json();
      this.setStateForAccountId(accountId, { transactions });
    } catch (error) {
      this.setState({ error: 'Error getting transactions' });
    } finally {
      this.setStateForAccountId(accountId, { fetchingTransactions: false });
    }
  }

  render() {
    return (
      <Switch>
        <RouteWrapper
          path="/accounts"
          component={Accounts}
          getBalance={this.getBalance}
          getTransactions={this.getTransactions}
          {...this.state}
        />
        <Route path="*" render={redirectToAccounts} />
      </Switch>
    );
  }
}

export default Authenticated;
