import Image from 'next/image'

// Images
import close from '../assets/close.svg'

const Account = ({ setAccount, setShowAccountModal }) => {

  const submitHandler = (e) => {
    e.preventDefault()
    setAccount(e.target.account.value)
    setShowAccountModal(false)
  }

  return(
    <div className='popup'>
      <div className='popup__content account'>
        <h3>Set Account</h3>

        <button onClick={() => setShowAccountModal(false)}>
          <Image src={close} height={15} width={15} alt='Close popup' />
        </button>

        <form onSubmit={submitHandler}>
          <label htmlFor='account'>Enter Ethereum Address</label>
          <input type='text' name='account' placeholder='0x0000...'></input>
          <input type='submit'></input>
        </form>
      </div>
    </div>
  )
}

export default Account
