import React, { useEffect, useState } from 'react';
import './FetchData.css';
import axios from 'axios';

function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7caa286848a84a88a998698201b66c48')
      .then(res => {
        const rates = res.data.rates;

        const currenciesToDisplay = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

        const formattedData = currenciesToDisplay.map(currency => ({
          currency: currency,
          buyRate: rates[currency],
          exchangeRate: 1 / rates[currency],
          sellRate: 1 / rates[currency],
        }));

        setData(formattedData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {data.map((currencyData, index) => (
              <tr key={index}>
                <td>{currencyData.currency}</td>
                <td>{currencyData.buyRate}</td>
                <td>{currencyData.exchangeRate}</td>
                <td>{currencyData.sellRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FetchData;
