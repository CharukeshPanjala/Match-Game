import './index.css'

const Button = props => {
  const {details, selectedButton, onClickTab} = props
  const {tabId, displayText} = details
  const highLight = selectedButton === tabId ? 'highlight' : ''
  const onClickButton = () => {
    onClickTab(tabId)
  }
  return (
    <li>
      <button
        className={`tab ${highLight}`}
        type="button"
        id={tabId}
        onClick={onClickButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Button
