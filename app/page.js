'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Components
import Overview from "./components/Overview"
import Holdings from './components/Holdings'
import Values from './components/Values'
import Assets from './components/Assets'

export default function Home() {
  const [account, setAccount] = useState(null)
  const [trackedAssets, setTrackedAssets] = useState([])

  const [markets, setMarkets] = useState(null)
  const [tokens, setTokens] = useState([])

  const getMarkets = async () => {
    const ROOT_URL = 'https://api.coingecko.com/api/v3'
    const ENDPOINT = '/coins/markets'
    const AMOUNT = 25
    const ARGUMENTS = `?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=${AMOUNT}&page=1&sparkline=false&locale=en`

    const response = await fetch(ROOT_URL + ENDPOINT + ARGUMENTS)

    setMarkets(await response.json())
  }

  const getToken = async () => {
    // TODO: Fetch token info via API and sew it together

    const id = trackedAssets[trackedAssets.length - 1]

    // Market data
    const market = markets.find((market) => (
      market.id === id
    ))

    // Token details via API
    const ROOT_URL = 'https://api.coingecko.com/api/v3'
    const TOKEN_ENPOINT = `/coins/${id}`
    const TOKEN_ARGUMENTS = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

    const tokenResponse = await fetch(ROOT_URL + TOKEN_ENPOINT + TOKEN_ARGUMENTS)
    const tokenData = await tokenResponse.json()
    const details = tokenData.detail_platforms.ethereum

    // 7 day price data via API
    const PRICES_ENDPOINT = `/coins/${id}/market_chart/`
    const PRICES_ARGUMENTS = '?vs_currency=usd&days=7&interval=daily'

    const pricesResponse = await fetch(ROOT_URL + PRICES_ENDPOINT + PRICES_ARGUMENTS)
    const prices = (await pricesResponse.json()).prices

    // Balance via blockchain call
    const ETH_RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/E4_lJ3TqfDmKsg1q3QsZYePyu_DFhMHC'
    const ABI = ['function balanceOf(address) view returns (uint)']
    const PROVIDER = new ethers.JsonRpcProvider(ETH_RPC_URL)

    let balance

    if(details) {
      const contract = new ethers.Contract(details.contract_address, ABI, PROVIDER)
      balance = Number(ethers.formatUnits(await contract.balanceOf(account), details.decimal_place))
    } else {
      balance = Number(ethers.formatUnits(await PROVIDER.getBalance(account), 18))
    }

    const token = {
      id: id,
      market: market,
      token: tokenData,
      address: details ? details.contract_address : null,
      prices: prices,
      balance: balance,
      value: balance * market.current_price
    }

    if(tokens.length === 0) {
      setTokens([token])
    } else {
      setTokens([...tokens, token])
    }
  }

  useEffect(() => {
    if(!markets) {
      getMarkets()
    }

    if(trackedAssets.length !== 0) {
      getToken()
    }

  }, [trackedAssets])

  return (
    <main>
      <h2>Portfolio Overview</h2>

        <Overview
          account={account}
          setAccount={setAccount}
          markets={markets}
          trackedAssets={trackedAssets}
          setTrackedAssets={setTrackedAssets}
          tokens={tokens}
        />

      <div className="details">
        <div className="divider"></div>

        <Holdings tokens={tokens} />

        <Values tokens={tokens} />

        <Assets tokens={tokens} setTokens={setTokens} trackedAssets={trackedAssets} setTrackedAssets={setTrackedAssets} />

      </div>
    </main>
  )
}
