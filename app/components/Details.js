import Image from 'next/image'

// Images
import close from '../assets/close.svg'
import up from '../assets/up.svg'
import down from '../assets/down.svg'

const Details = ({ setShowDetailsModal, selectedToken }) => {

  const closeHandler = () => {
    setShowDetailsModal(false)
  }

  return(
    <div className='popup'>
    {console.log(selectedToken)}
      <div className='popup__content token'>

        <div className='token__title'>
          <Image src={selectedToken.market.image} width={40} height={40} alt='token image' />
          <h3>{selectedToken.market.name} <small>{selectedToken.market.symbol.toUpperCase()}</small></h3>
        </div>

        <hr />

        <button onClick={closeHandler}>
          <Image src={close} height={15} width={15} alt='Close popup' />
        </button>

        <div className='token__price'>
          <p>
            {selectedToken.market.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}

            <small>
              <Image src={selectedToken.market.price_change_percentage_24h < 0 ? down : up} width={15} height={15} />

              <span className={selectedToken.market.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                {selectedToken.market.price_change_percentage_24h.toFixed(2)}%
              </span>
            </small>

          </p>
        </div>

        <hr />

        <div className='token__details'>
          <div>
            <h4>Atll Time High</h4>
            <p>{selectedToken.market.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</p>
          </div>
          <div>
            <h4>Market Cap</h4>
            <p>{selectedToken.market.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</p>
          </div>
          <div>
            <h4>Circulating Supply</h4>
            <p>{selectedToken.market.circulating_supply.toLocaleString('en-US')}</p>
          </div>
          <div>
            <h4>Total Supply</h4>
            <p>{selectedToken.market.total_supply.toLocaleString('en-US')}</p>
          </div>
          <div>
            <h4>Max Supply</h4>
            <p>{selectedToken.market.max_supply ? selectedToken.market.max_supply.toLocaleString('en-US') : ((<>&#8734;</>))}</p>
          </div>
          {selectedToken.address &&
            <div>
              <h4>Contract Address</h4>
              <p>{selectedToken.address}</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Details
