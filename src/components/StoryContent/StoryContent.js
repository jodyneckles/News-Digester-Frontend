import React from 'react'
import HearthSVG from '../HearthSVG'
import './StoryContent.css'

const StoryContent = ({ selectedStory, toggleLike, clearSelectedStory }) => {
  const svgStyle = {
    // position: 'absolute',
    // right: 5,
    // top: 5
  }

  return (
    <div className={'story_content'}>
      {
        selectedStory &&
        <div>
          <div className='story_image_wrapper'>
            <img className='story_image_background' src={selectedStory.image} alt={selectedStory.name} />
            <img src={selectedStory.image} alt={selectedStory.name} />
          </div>
          <h3>Headline: {selectedStory.title}</h3>
          <h4>Source: {selectedStory.website.name}</h4>
          <h4>Category: {selectedStory.category.name}</h4>
          <p>{selectedStory.subtext}</p>
          <a href={selectedStory.link}>Go to website</a>
          <div>
            <HearthSVG
              handleClick={toggleLike}
              id={selectedStory.id}
              style={svgStyle}
              filled={selectedStory.liked}
            />
          </div>
          <button onClick={clearSelectedStory}>Go back</button>
        </div>
      }

    </div>
  )
}

export default StoryContent
