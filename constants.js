const link = (base, currency) =>
  `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`;
const somethingWentWrong = 'Something went wrong';

module.exports = {
  link,
  somethingWentWrong,
};
