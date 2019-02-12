import React from 'react'
import StoryMetadataBtn from '../../components/StoryMetadataBtn'

const StoryFilterResultsBar = props => {

  const { toggleFilter, selectedWebsites, selectedCategories } = props
  // debugger
  // console.log(filterTags)
  return (
    <div>
      <div className='website-tags'>
        {
          selectedWebsites.map((website, index) => {
            return <StoryMetadataBtn
              type={'websites'}
              filterItem={website}
              key={index}
              toggleFilter={toggleFilter}
              isSelected={props.selectedWebsites.includes(website)}
            />
          })
        }

      </div>
      <div className='category-tags'>
        {
          selectedCategories.map((category, index) => {
            return <StoryMetadataBtn
              type={'categories'}
              filterItem={category}
              key={index}
              toggleFilter={toggleFilter}
              isSelected={props.selectedCategories.includes(category)}
            />
          })
        }
      </div>
    </div>
  )
}

export default StoryFilterResultsBar
