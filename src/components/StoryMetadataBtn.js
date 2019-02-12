import React from 'react'
import './StoryMetadataBtn.css'

class StoryMetadataBtn extends React.Component {
  state = {
    clicked: false
  }

  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
    // console.log(this.props.filterItem)

    this.props.toggleFilter(this.props.filterItem, this.props.type)
  }
  render () {
    const classes = this.state.clicked ? 'btn clicked' : 'btn'
    const { filterItem } = this.props

    return (
      <button onClick={this.clickHandler} className={classes}>{filterItem}</button>
    )
  }
}

export default StoryMetadataBtn
