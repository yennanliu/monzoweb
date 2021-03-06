import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveTransaction as setActiveTransactionAction } from '../../actions';
import CategoryIcon from '../CategoryIcon';
import {
  getHumanCostFromInteger,
  timeSince,
  processTransactionTitle,
  processTransactionAmount,
} from '../../helpers';
import './style.css';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-noninteractive-tabindex,max-len  */

class Transaction extends React.PureComponent {
  processTransactionLocalAmount(transaction) {
    if (transaction.local_currency !== transaction.currency) {
      return getHumanCostFromInteger(transaction.local_amount, transaction.local_currency);
    }

    return false;
  }

  processTransactionCategory(transaction) {
    if (transaction.category) {
      if (transaction.category === 'mondo' || transaction.category === 'monzo') {
        return '';
      }

      return transaction.category;
    }

    return 'general';
  }

  processTransactionExtraInfo(transaction) {
    if (transaction.metadata && transaction.metadata.faster_payment) {
      return 'Bank transfer';
    }

    if (transaction.merchant) {
      if (transaction.merchant.online) {
        return 'Online';
      }
      if (transaction.merchant.address && transaction.merchant.address.city) {
        return transaction.merchant.address.city;
      }
    }

    return '';
  }

  render() {
    const { transaction, setActiveTransaction } = this.props;
    const title = processTransactionTitle(transaction);
    const amount = processTransactionAmount(transaction);
    const extraInfo = this.processTransactionExtraInfo(transaction);
    const created = timeSince(new Date(transaction.created));
    const transactionLogoClassName = 'mzw-transaction__logo';
    let iconOrLogo = <CategoryIcon className={transactionLogoClassName} />;

    if (transaction.merchant) {
      if (transaction.merchant.logo) {
        iconOrLogo = (
          <img
            className={transactionLogoClassName}
            src={transaction.merchant.logo}
            alt={`${transaction.merchant.name} logo`}
          />
        );
      } else if (transaction.merchant.category) {
        iconOrLogo = (
          <CategoryIcon
            className={transactionLogoClassName}
            category={transaction.merchant.category}
          />
        );
      }
    } else if (transaction.counterparty && transaction.counterparty.name) {
      iconOrLogo = (
        <CategoryIcon
          className={transactionLogoClassName}
          character={transaction.counterparty.name.charAt(0)}
        />
      );
    } else if (transaction.is_load) {
      iconOrLogo = (
        <CategoryIcon
          className={transactionLogoClassName}
          character="+"
        />
      );
    }
    return (
      <li
        key={transaction.id}
        onClick={() => setActiveTransaction(transaction)}
        onKeyPress={() => setActiveTransaction(transaction)}
        className="mzw-transaction"
        tabIndex="0"
      >
        <div className="mzw-transaction__logo-container">{iconOrLogo}</div>
        <div className="mzw-transaction__detail">
          <div className={transaction.decline_reason ? 'mzw-transaction__detail-decline' : ''}>{title}</div>
          <div className="mzw-transaction__info">
            <span>{created}</span>
            {extraInfo && (
              <Fragment>
                <span>&nbsp;&mdash;&nbsp;</span>
                <span>{extraInfo}</span>
              </Fragment>
            )}
          </div>
        </div>
        <div className={`
          mzw-transaction__amount
          ${amount.includes('+') ? 'mzw-transaction__amount-positive' : ''}
          ${transaction.decline_reason ? 'mzw-transaction__detail-decline' : ''}
        `}
        >
          {amount}
        </div>
      </li>
    );
  }
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired, // eslint-disable-line
  setActiveTransaction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setActiveTransaction: transaction => dispatch(setActiveTransactionAction(transaction)),
});

export default connect(null, mapDispatchToProps)(Transaction);
