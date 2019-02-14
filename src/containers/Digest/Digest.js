import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import StorySearch from '../../components/StorySearch'
import StoryFilterSelector from '../../containers/StoryFilterSelector/StoryFilterSelector'
import StoryFilterResultsBar from '../StoryFilterResultsBar/StoryFilterResultsBar'
import StoryContent from '../../components/StoryContent/StoryContent'
import Stories from '../Stories/Stories'
import './Digest.css'

// import { unique } from '../../helpers'

const newStoriesUrl = 'http://localhost:3001/api/v1/stories'
const savedStoriesUrl = 'http://localhost:3001/api/v1/saved-stories'
const cheerio = require('cheerio')
const axios = require('axios')

class Digest extends Component {
  state = {
    stories: [],
    searchedStories: [],
    searchQuery: undefined,
    selectedStory: undefined,
    filterMetadata: {
      websites: [],
      categories: []
    },
    selectedFilters: {
      websites: [],
      categories: []
    },
    showFilters: false,
    showSavedStories: false,
    selectedStoryContentText: undefined
  }

  getStoriesFromAPI = () => {
    return fetch(newStoriesUrl)
      .then(res => res.json())
  }

  getSavedStoriesFromApi = () => {
    return fetch(savedStoriesUrl)
      .then(res => res.json())
  }

  addLikesToApi = () => {

  }

  componentDidMount () {
    this.getStoriesFromAPI()
      .then(allStories => {
        const uniqueWebsites = [...new Set(allStories.map(item => item.website.name))]
        const uniqueCategories = [...new Set(allStories.map(item => item.category.name))] // ES6 Spread Operator and Set return a UNIQUE array
        this.setState({
          stories: allStories,
          filterMetadata: {
            websites: uniqueWebsites,
            categories: uniqueCategories
          }
        })
      })
  }

  getStoriesOrLikeStories = () => {
    return this.state.showSavedStories
      ? this.state.stories.filter(story => story.liked)
      : this.state.stories
  }

  getSearchedStories = (searchQuery) => this.getStoriesOrLikeStories().filter(story => story.title.toLowerCase().includes(searchQuery.toLowerCase()))

  handleSearchInput = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }

  getStories = () => {
    const { searchQuery } = this.state
    if (searchQuery === undefined) {
      return this.getStoriesOrLikeStories()
    } else {
      return this.getSearchedStories(searchQuery)
    }
  }

  // areFiltersEmpty = () => this.state.selectedFilters.website.length

  filteredStories = () => {
    const { selectedFilters } = this.state
    return this.getStories().filter(story =>
      selectedFilters.websites.length ? selectedFilters.websites.includes(story.website.name) : true
    ).filter(story => selectedFilters.categories.length ? selectedFilters.categories.includes(story.category.name) : true)
  }

  toggleFilter = (value, type) => {
    let newValues = [...this.state.selectedFilters[type]]
    newValues = newValues.includes(value) ? newValues.filter(item => item !== value) : [...newValues, value]
    this.setState({
      selectedFilters: {
        ...this.state.selectedFilters,
        [type]: newValues
      }
    })
  }

  toggleLike = (event, id) => {
    event.stopPropagation()
    event.preventDefault()

    // console.log(this.state.stories)
    const storyClone = [...this.state.stories]
    const likeStories = storyClone.map(story =>
      story.id === id ? { ...story, liked: !story.liked } : story
    )
    this.setState({ stories: likeStories })
  }

  setSelectedStory = story => {
    const app = document.querySelector('.App')
    app.classList.add('popup_is_shown')
    this.setState({ selectedStory: story })
    this.retrieveStoryContentText(story)
  }

  getSelectedStory = id => {
    const selectedStory = this.state.stories.find(stateStory => stateStory.id === parseInt(id))
    if (selectedStory && !this.state.selectedStoryContentText) {
      this.retrieveStoryContentText(selectedStory)
      const app = document.querySelector('.App')
      app.classList.add('popup_is_shown')
    }
    return selectedStory
  }

  clearSelectedStory = () => {
    const app = document.querySelector('.App')
    app.classList.remove('popup_is_shown')

    this.setState({ selectedStory: undefined })
  }

  handleShowFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  handleShowSavedStories = () => {
    this.setState({
      showSavedStories: !this.state.showSavedStories
    })
  }

  scraperIndependent = (story) => {
    const storyUrl = story.link
    axios.get(storyUrl).then((res) => {
      const nodeList = cheerio.load(res.data)('.body-content p')
      const newList = nodeList.filter(i => ![...nodeList[i].children].some(el => el.name === 'span'))
      this.setState({
        selectedStoryContentText: newList
      })
    })
  }

  scraperGuardian = (story) => {
    const storyUrl = story.link
    axios.get(storyUrl).then((res) => {
      const newList = cheerio.load(res.data)('.content__article-body p')
      this.setState({
        selectedStoryContentText: newList
      })
    })
  }

  scraperReuters = (story) => {
    const storyUrl = story.link
    axios.get(storyUrl).then((res) => {
      const newList = cheerio.load(res.data)('.StandardArticleBody_body p')
      this.setState({
        selectedStory: story,
        selectedStoryContentText: newList
      })
    })
  }

  scraperBBC = (story) => {
    const storyUrl = story.link
    axios.get(storyUrl).then((res) => {
      const newList = cheerio.load(res.data)('.story-body__inner p')
      this.setState({
        selectedStory: story,
        selectedStoryContentText: newList
      })
    })
  }

  retrieveStoryContentText = (story) => {
    const storyScrapeResult = {
      'Guardian': this.scraperGuardian,
      'Reuters': this.scraperReuters,
      'BBC': this.scraperBBC,
      'Independent': this.scraperIndependent
    }

    const website = story.website.name
    return (storyScrapeResult[website])(story) // envoke ONLY the relevent method above
  }

  render () {
    const { toggleLike, handleSearchInput, setSelectedStory, getSelectedStory, clearSelectedStory, filteredStories, toggleFilter } = this
    return (
      <div className='App'>
        <img src={require('../../icons/news-digest-logo.svg')} alt='news-digest-logo' />
        <h1 className='news-digest-title'>NEWS DIGEST</h1>
        <button>Logout</button>

        <div>
          {
            !this.state.showFilters && <StorySearch
              style={{ margin: '0 auto', maxWidth: 800 }}
              handleSearchInput={handleSearchInput}
            />
          }

          {this.state.showFilters
            ? <button className={'close-btn'} onClick={this.handleShowFilters}>CLOSE</button>
            : <button className={this.state.showFilters && 'filter-btn'} onClick={this.handleShowFilters}>FILTER</button>
          }
          {
            this.state.showFilters &&
            <StoryFilterSelector
              filterTags={this.state.filterMetadata}
              toggleFilter={toggleFilter}
              selectedWebsites={this.state.selectedFilters.websites}
              selectedCategories={this.state.selectedFilters.categories}
            />
          }
          {
            !this.state.showFilters && <StoryFilterResultsBar
              filterTags={this.state.filterMetadata}
              toggleFilter={toggleFilter}
              selectedWebsites={this.state.selectedFilters.websites}
              selectedCategories={this.state.selectedFilters.categories}
            />

          }
          {this.state.showSavedStories
            ? <Link to='/stories'><button className={'saved-stories-back-to-feed-btn'} onClick={this.handleShowSavedStories}>BACK TO FEED</button></Link>
            : <Link to='/saved-stories'><button className={this.state.showSavedStories && 'saved-stories-btn'} onClick={this.handleShowSavedStories}>SAVED STORIES</button></Link>
          }

          <div className={this.state.selectedStory ? 'show_story content_wrapper' : 'content_wrapper'}>

            <Stories
              getStories={filteredStories}
              toggleLike={toggleLike}
              setSelectedStory={setSelectedStory}
            />

            <Route exact path='/stories/:id' component={routerProps => {
              return <StoryContent
                selectedStory={getSelectedStory(routerProps.match.params.id)}
                selectedStoryContentText={this.state.selectedStoryContentText}
                toggleLike={toggleLike}
                clearSelectedStory={clearSelectedStory}
                {...routerProps}
              />
            }
            }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Digest
