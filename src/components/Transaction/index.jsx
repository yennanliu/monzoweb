import React from 'react';
import PropTypes from 'prop-types';
import {
  monzoAmountToFormatted,
  getMerchantLogoUrl,
  getMerchantName,
  getFormattedAmount,
  getFormattedCreationDate,
  getFormattedMerchantAddress,
  getLatitudeLongitudeParameter,
  getTagList,
  getFormattedTimeSinceNow,
} from '../../transactionFns';
import './style.css';

class Transaction extends React.PureComponent {
  render() {
    const {
      amount,
      category,
      created,
      description,
      id,
      merchant,
    } = this.props;

    return (
      <div key={id} className="mzw__transaction">
        <img className="mzw__transaction__logo" src={getMerchantLogoUrl(merchant)} alt={`${getMerchantName(merchant)} logo`} />
        <div className="mzw__transaction__body">
          <div>{getMerchantName(merchant)}</div>
          <div>{getFormattedTimeSinceNow(created)}</div>
        </div>
        <div>{getFormattedAmount(amount)}</div>
        {/* <img width="40rem" src={getMerchantLogoUrl(merchant)} alt={`${getMerchantName(merchant)} logo`} />
        <p><strong>{getMerchantName(merchant)}</strong></p>
        <p><strong>{getFormattedAmount(amount)}</strong></p>
        <p>{getFormattedCreationDate(created)}</p>
        <p><a href={`http://maps.google.com/?ll=${getLatitudeLongitudeParameter(merchant)}`}>{getFormattedMerchantAddress(merchant)}</a></p>
        <p>{category}</p>
        <p>{getTagList(merchant).join(' ')}</p>
        <p>{description}</p> */}
      </div>
    );
  }
}

Transaction.defaultProps = {
  merchant: {},
};

Transaction.propTypes = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  merchant: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Transaction;
