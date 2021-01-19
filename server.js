const express = require('express');
const Request = require('request');
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');
const { link, somethingWentWrong } = require('./constants');
const app = express();

app.get('/api/rates', async (req, res) => {
  try {
    const { base, currency } = req.query;
    if(!base){
      return res.status(BAD_REQUEST).json({ error: 'base is a required query' });
    }
    if(!currency){
      return res.status(BAD_REQUEST).json({ error: 'currency is a required query' });
    }
    Request.get(link(base, currency), (error, response, body) => {
      if (error) {
        return res.status(BAD_REQUEST).json({ error: error });
      }
      return res.status(OK).json({ results: JSON.parse(body) });
    });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: somethingWentWrong });
  }
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
