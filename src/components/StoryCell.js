import React from 'react'
import { Link } from 'react-router-dom'

import HearthSVG from './HearthSVG'
import './StoryCell.css'

const StoryCell = ({ story, toggleLike, setSelectedStory }) => {
  const style = {
    width: '250px',
    height: '144px',
    background: `url(${story.image})`,
    backgroundSize: 'cover',
    position: 'relative',
    cursor: 'pointer'
  }

  const svgStyle = {
    position: 'absolute',
    right: 5,
    top: 5
  }

  return (
    <Link to={`/stories/${story.id}`} className='card'>
      <div
        style={style}
        className='card-img-wrapper'
        onClick={() => setSelectedStory(story)}
      >
        <HearthSVG
          story={story}
          handleClick={toggleLike}
          id={story.id}
          style={svgStyle}
          filled={story.liked}
        />
      </div>
      <p className='title-bar'>
        {story.title}
      </p>
    </Link>

  )
}

export default StoryCell
//  style={style} className='card'
