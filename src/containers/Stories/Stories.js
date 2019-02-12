import React from 'react'
import StoryCell from '../../components/StoryCell'
import './Stories.css'

export default ({ getStories, toggleLike, setSelectedStory }) => {
  return (
    <div className='Stories' >
      {
        getStories().map(story =>
          <StoryCell
            key={story.id}
            story={story}
            toggleLike={toggleLike}
            setSelectedStory={setSelectedStory}
          />
        )
      }
    </div>
  )
}
