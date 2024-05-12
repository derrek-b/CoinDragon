import { useState } from 'react'

import Details from "./Details"
import Image from 'next/image'

// Images
import minus from '../assets/minus.svg'

const Assets = ({ tokens, setTokens, trackedAssets, setTrackedAssets }) => {
  const [selectedToken, setSelectedToken] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const getModalDetails = (token) => {
    setShowDetailsModal(true)
    setSelectedToken(token)
  }

  const untrackAsset = (token, index) => {
    if(tokens.length === 1) {
      setTokens([])
    } else {
      const newTokens = [...tokens]
      newTokens.splice(index, 1)
      setTokens(newTokens)
    }ssets(newTrackedAssets)
  }

  return(
    <div className="assets">
      <h3>My Assets</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Token</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Holdings</th>
            <th>Total Value <small>(USD)</small></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            tokens.map((token, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{token.market.name}</td>
                <td>{token.market.symbol.toUpperCase()}</td>
                <td>{token.market.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
                <td>{token.balance}</td>
                <td>{token.value.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
                <td>
                  <button onClick={() => getModalDetails(token)}>Details</button>
                </td>
                <td>
                  <button className='untrack' onClick={() => untrackAsset(token, index)}>
                    <Image src={minus} alt='Untrack asset' height={20} width={20} />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {showDetailsModal && <Details selectedToken={selectedToken} setShowDetailsModal={setShowDetailsModal} />}
    </div>
  )
}

export default Assets
