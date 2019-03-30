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
  purchaseStockPromise(stock, price, quantity) {
    const transaction = {
      data: {
        type: 'node--transaction',
        attributes: {
          title: `${stock}: Stock Transaction by admin`,
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
              id: "8f208229-a56b-40b5-ae32-a7b77d74193e"
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
    // Still using hardcoded UUID to fetch by.
    // TODO: Get UUID of the currently logged in user.
    const queryData = qs.stringify({
      filter: {
        'someFilter': {
          'condition': {
            'path': 'transaction_owner.id',
            'value': '8f208229-a56b-40b5-ae32-a7b77d74193e'
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
