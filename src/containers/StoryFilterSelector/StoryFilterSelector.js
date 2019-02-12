import React from 'react'
import StoryMetadataBtn from '../../components/StoryMetadataBtn'

const StoryFilterSelector = props => {
  const { filterTags, toggleFilter } = props
  console.log(filterTags)
  return (
    <div>
      <div className='website-tags'>
        {
          filterTags.websites.map((website, index) => {
            
            return <StoryMetadataBtn
              type={'websites'}
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
              type={'categories'}
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

export default StoryFilterSelector
