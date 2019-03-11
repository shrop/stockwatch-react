import axios from 'axios';

const StockAPI = {
  publishableToken: 'pk_3d12c4e90ede4d44a066ab6573730347',
  endpoint: 'https://cloud.iexapis.com/beta',
  endpointAlt: 'https://api.iextrading.com/1.0',
  getAllSymbolsPromise() {
    const allSymbolsEndpoint = this.endpointAlt + '/ref-data/symbols';
    return axios.get(allSymbolsEndpoint);
  },
  getStockInfoPromise(stock) {
    const stockInfoEndpoint = this.endpoint + `/stock/${stock}/quote?token=${this.publishableToken}`;
    return axios.get(stockInfoEndpoint);
  },
  getStockHistoryPromise(stock, range) {
    const stockHistoryEndpoint = this.endpoint + `/stock/${stock}/chart/${range}?token=${this.publishableToken}`;
    return axios.get(stockHistoryEndpoint);
  },
  getStockLogoPromise(stock) {
    const logoEndpoint = this.endpoint + `/stock/${stock}/logo?token=${this.publishableToken}`;
    return axios.get(logoEndpoint);
  }
};

export { StockAPI };
