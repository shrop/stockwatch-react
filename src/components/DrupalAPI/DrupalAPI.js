import axios from 'axios';

const DrupalAPI = {
  serverAPI: 'https://stockwatch-api.shropnet.net/api/node/transaction',
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
        "Content-Type": "application/vnd.api+json"
      },
      url: this.serverAPI,
      data: transaction
    });
  },
  getMyStocksPromise() {
    const myStocksEndpoint = this.serverAPI + '/?filter[transaction_owner]=8f208229-a56b-40b5-ae32-a7b77d74193e';
    const data = {
      'filter[transaction_owner][id]': '8f208229-a56b-40b5-ae32-a7b77d74193e'
    }
    return axios({
      method: 'GET',
      headers: {
        "Content-Type": "application/vnd.api+json"
      },
      url: myStocksEndpoint,
    });
  }
};

export { DrupalAPI };
