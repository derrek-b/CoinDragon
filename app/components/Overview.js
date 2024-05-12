import { useState, useEffect } from 'react'
import Image from 'next/image'

// Components
import Account from './Account'
import Add from './Add'

// Images
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import add from '../assets/add.svg'

const Overview = ({ account, setAccount, markets, trackedAssets, setTrackedAssets, tokens }) => {
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const [value, setValue] = useState(0)
  const [percentChange, setPercentChange] = useState(0)

  const addModalOpenHandler = () => {
    if(account) {
      setShowAddModal(true)
    } else {
      setShowAccountModal(true)
      return
    }
  }

  const calculateTotalValue = () => {
    const total = tokens.reduce((acc, token) => {
      return acc += token.value
    }, 0)

    setValue(total)
  }

  const calculatePercentChange = () => {
    let currentValue = value
    let pastValue = 0

    tokens.forEach((token) => {
      pastValue += token.value - token.market.price_change_24h
    })

    setPercentChange(((currentValue - pastValue) / pastValue) * 100)
  }

  useEffect(() => {
    if(tokens.length !== 0) {
      calculateTotalValue()
      calculatePercentChange()
    } else {
      setValue(0)
      setPercentChange(0)
    }
  })

  return(
    <div className="overview">

      <div className="overview__account">
        <h3>Account</h3>

        {account ? (
          <p>{account.slice(0, 5)}...{account.slice(-4)}</p>
        ) : (
          <button onClick={() => setShowAccountModal(true)}>
            <Image src={add} width={20} height={20} alt='Set account'/>
          </button>
        )}
      </div>

      <div className="overview__tracked">
        <h3>Assets Tracked</h3>
        <p>{tokens.length}</p>
        <button onClick={addModalOpenHandler}>
          <Image src={add} width={20} height={20} alt="Add token" />
        </button>
      </div>

      <div className="overview__total">
        <h3>Total Value</h3>
        <p>{value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</p>
      </div>

      <div className="overview__change">
        <h3>% Changed (24h)</h3>
        <p>
          <Image src={percentChange < 0 ? down : up} width={20} height={20} alt="Change direction" />
          <span className={percentChange < 0 ? 'red' : 'green'}>{percentChange.toFixed(2)}%</span>
        </p>
      </div>

      {showAccountModal &&
      <Account
        setAccount={setAccount}
        setShowAccountModal={setShowAccountModal}
      />}

      {showAddModal &&
      <Add
        account={account}
        setShowAddModal={setShowAddModal}
        markets={markets}
        trackedAssets={trackedAssets}
        setTrackedAssets={setTrackedAssets}
      />}
    </div>
  )
}

export default Overview
