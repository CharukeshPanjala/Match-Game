import './index.css'

const Thumbnail = props => {
  const {details, onClickThumbnail} = props
  const {id, thumbnailUrl} = details
  const onClickBtn = () => {
    onClickThumbnail(id)
  }
  return (
    <li className="thumbnail" key={id}>
      <button className="button" type="button" onClick={onClickBtn}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default Thumbnail
