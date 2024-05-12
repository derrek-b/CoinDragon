import Image from 'next/image'

// Images
import close from '../assets/close.svg'

const Add = ({ setShowAddModal, markets, trackedAssets, setTrackedAssets }) => {

  const addAssetHandler = (e) => {
    e.preventDefault()

    // const assetIndex = trackedAssets.findIndex((asset) => {
    //   return asset === e.target.tokens.value
    // })

    // if(assetIndex === -1) {
      setTrackedAssets([...trackedAssets, e.target.tokens.value])
    // }

    setShowAddModal(false)
  }

  return(
    <div className='popup'>
      <div className='popup__content add'>
        <h3>Add Asset to Track</h3>

        <button onClick={() => setShowAddModal(false)}>
          <Image src={close} height={15} width={15} alt='Close popup' />
        </button>

        <form onSubmit={(e) => addAssetHandler(e)}>
          <label htmlFor='tokens'>Select a Token</label>
          <select name='tokens' id='tokens'>
            {markets.map((token, index) => (
              <option key={index} value={token.id}>{token.symbol.toUpperCase()}</option>
            ))}
          </select>
          <input type='submit' />
        </form>
      </div>
    </div>
  )
}

export default Add
