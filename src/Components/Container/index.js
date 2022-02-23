import {Component} from 'react'

import Button from '../Button'

import Thumbnail from '../Thumbnail'

import './index.css'

class Container extends Component {
  state = {
    scoreList: [],
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    selectedButton: 'FRUIT',
    timer: 60,
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
  }

  onClickTab = id => {
    this.setState({selectedButton: id})
  }

  onClickPlayAgain = () => {
    this.setState({
      scoreList: [],
      imgUrl:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      selectedButton: 'FRUIT',
      timer: 60,
    })
    this.componentDidMount()
  }

  onClickThumbnail = id => {
    const {imgUrl, scoreList} = this.state
    const {imagesList} = this.props
    const [clickedImage] = imagesList.filter(eachItem => eachItem.id === id)
    if (clickedImage.imageUrl === imgUrl) {
      this.setState(prevState => ({
        scoreList: [...prevState.scoreList, imgUrl],
      }))
      const newScoreList = [...scoreList, imgUrl]
      const newList = imagesList.filter(
        eachItem => !newScoreList.includes(eachItem.imageUrl),
      )
      const newUrl = newList[Math.ceil(Math.random() * newList.length)]
      this.setState({imgUrl: newUrl.imageUrl})
    } else {
      this.setState({timer: 0})
    }
  }

  render() {
    const {selectedButton, scoreList, timer, imgUrl} = this.state
    const score = scoreList.length
    const {tabsList, imagesList} = this.props
    const filteredList = imagesList.filter(
      eachItem => eachItem.category === selectedButton,
    )
    let secondContainer
    if (timer === 0) {
      this.componentWillUnmount()
      secondContainer = (
        <div className="second-container">
          <div className="match-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy"
            />
            <p className="trophy-text">YOUR SCORE</p>
            <p className="trophy-score">{score}</p>
            <div className="play-again-button">
              <img
                scr="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="play-again-image"
              />
              <button
                type="button"
                onClick={this.onClickPlayAgain}
                className="play-again-button play-again-text"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      secondContainer = (
        <div className="second-container">
          <img src={imgUrl} alt="match" className="display-image" />
          <ul className="buttons-container">
            {tabsList.map(eachItem => (
              <Button
                details={eachItem}
                selectedButton={selectedButton}
                onClickTab={this.onClickTab}
                key={eachItem.tabId}
              />
            ))}
          </ul>
          <ul className="thumbnail-container">
            {filteredList.map(eachItem => (
              <Thumbnail
                details={eachItem}
                key={eachItem.id}
                onClickThumbnail={this.onClickThumbnail}
              />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="bg-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <ul className="score-timer-container">
            <li className="score-text">
              <p className="score-text">
                Score: <span className="score">{score}</span>
              </p>
            </li>
            <li className="score">
              <img
                scr="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
            </li>
            <li>
              <p className="score">{timer} sec</p>
            </li>
          </ul>
        </nav>
        {secondContainer}
      </div>
    )
  }
}

export default Container
