import React from 'react'
import StoryMetadataBtn from '../../components/StoryMetadataBtn'

const StoryFilterResultsBar = props => {
  const { filterTags, toggleFilter } = props
  return (
    <div>
      <div className='website-tags'>
        {
          filterTags.websites.map((website, index) => {
            return <StoryMetadataBtn
              filterItem={website}
              key={index}
              toggleFilter={toggleFilter}
            />
          })
        }

      </div>
      <div className='category-tags'>
        {
          filterTags.categories.map((category, index) => {
            return <StoryMetadataBtn
              filterItem={category}
              key={index}
              toggleFilter={toggleFilter}
            />
          })
        }
      </div>
    </div>
  )
}

export default StoryFilterResultsBar
