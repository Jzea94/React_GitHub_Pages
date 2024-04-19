import { useState } from "react"
import PropTypes from "prop-types"
import './Button.css'

export default function FollowButton ({textOne, textTwo,textTree, initialState}) {
  const [isFollowing, setFollowing] = useState(initialState)
  const [isHover, setIsHover] = useState(false)

  let text = isFollowing ? textTwo : textOne 

  let buttonClassName

  if (isFollowing && isHover) {
    buttonClassName = 'bt-unfollow-hovered'
    text = textTree
  }else if (isFollowing) {
    buttonClassName = 'bt-unfollow'
  }

  const handleClick = () => {
    setFollowing(!isFollowing)
    setIsHover(false)
  }

  return (
    <button
    className={buttonClassName}  
    onClick={handleClick}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}>
      {text}
    </button>
  )
}

FollowButton.propTypes = {
  textOne: PropTypes.string.isRequired,
  textTwo: PropTypes.string.isRequired,
  textTree: PropTypes.string.isRequired,
  initialState: PropTypes.bool.isRequired
}