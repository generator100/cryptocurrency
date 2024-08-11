import React, { useContext, useEffect, useState } from 'react';
import "./Coin.css"
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';


const Coin = () => {
  const {coinId} = useParams()
  const [coinData,setCoinData] = useState();
  const [historicalData,setHistoricalData] = useState();
  const {currancy} = useContext(CoinContext)
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-aH7nN7XMMMC2RWrHtvwkbX6t'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async() =>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-aH7nN7XMMMC2RWrHtvwkbX6t'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currancy.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));

  }
  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currancy])
  if(coinData, historicalData) {
    return (
      <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypo Market Rank </li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current price </li>
          <li>{currancy.symbol}{coinData.market_data.current_price[currancy.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap </li>
          <li>{currancy.symbol}{coinData.market_data.market_cap[currancy.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High </li>
          <li>{currancy.symbol}{coinData.market_data.high_24h[currancy.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low </li>
          <li>{currancy.symbol}{coinData.market_data.low_24h[currancy.name].toLocaleString()}</li>
        </ul>
      </div>
      </div>
    );
  }else{
    return (
      <div className='spinner'>
      <div className="spin">

      </div>
      </div>
    );
  }

}

export default Coin;
