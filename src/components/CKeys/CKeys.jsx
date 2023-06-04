import PropTypes from 'prop-types'
import { keyboardBase } from './CKeys.module.css'
import CButton from '../CButton'
import listButton from '../listButton'

const CKeys = ({ setScreen }) => {
  const handleButtonAction = (value, typeF) => {
    setScreen(value, typeF)
  }

  return (
    <div className={keyboardBase}>
      {listButton.map((buttonT) => (
        <CButton key={buttonT.type}
          content={buttonT.content}
          type={buttonT.type}
          expand={buttonT.content === '0'}
          onClick={() => handleButtonAction(buttonT.content, buttonT.type)}
        />
      ))}
    </div>
  )
}

CKeys.propTypes = {
  setScreen: PropTypes.func.isRequired,
  buttonT: PropTypes.object,
  content: PropTypes.string,
  type: PropTypes.string,
}

export default CKeys
