import axios from 'axios';
import qs from 'qs';

const DrupalAPI = {
  serverAPI: 'https://stockwatch-api.shropnet.net/api/node/transaction',
  getAccessToken() {
    // TODO: Determine some way to get a refresh token if the current
    // token has expired.
    let sessionStatus = sessionStorage.getItem('oauthAccessToken');
    if (sessionStatus) {
      return sessionStatus;
    }
  },
  getCurrentUserID() {
    let sessionUserId = sessionStorage.getItem('oauthUserId');
    if (sessionUserId) {
      return sessionUserId;
    }
  },
  purchaseStockPromise(stock, price, quantity) {
    const transaction = {
      data: {
        type: 'node--transaction',
        attributes: {
          title: `${stock}: Stock Transaction`,
          stock_symbol: {
            value: stock
          },
          stock_price: price,
          stock_quantity: quantity
        },
        relationships: {
          transaction_owner: {
            data: {
              type: "user--user",
              id: this.getCurrentUserID()
            }
          }
        }
      }
    };

    return axios({
      method: 'POST',
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "Bearer " + this.getAccessToken()
      },
      url: this.serverAPI,
      data: transaction
    });
  },
  getMyStocksPromise() {
    const queryData = qs.stringify({
      filter: {
        'someFilter': {
          'condition': {
            'path': 'transaction_owner.id',
            'value': this.getCurrentUserID()
          }
        }
      }
    });

    const myStocksEndpoint = this.serverAPI + '?' + queryData;

    return axios({
      method: 'GET',
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "Bearer " + this.getAccessToken()
      },
      url: myStocksEndpoint,
    });
  }
};

export { DrupalAPI };
