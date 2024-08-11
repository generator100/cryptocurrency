import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) =>{

  const [allCoin, setAllCoin] = useState([])
  const [currancy, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  })
  const fetchAllCoin = async() =>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-aH7nN7XMMMC2RWrHtvwkbX6t'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currancy.name}`, options)
      .then(response => response.json())
      .then(response => setAllCoin(response))
      .catch(err => console.error(err));
  }
  useEffect(()=>{
    fetchAllCoin()
  },[currancy])
  const contextValue = {allCoin,currancy,setCurrency}
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  )
}
export default CoinContextProvider;