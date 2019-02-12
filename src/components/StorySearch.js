import React from 'react'
import './StorySearch.css'

const StorySearch = (props) => {
  const { handleSearchInput } = props
  return (
    <form className='search-bar-container' onSubmit={(e) => e.preventDefault()}
    >
      <input
        className='search-bar'
        type='text'
        placeholder='Search Stories'
        onChange={handleSearchInput}
      />
    </form>

  )
}

export default StorySearch
