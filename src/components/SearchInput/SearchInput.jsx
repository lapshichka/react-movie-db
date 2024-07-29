import React, {Component} from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

export default class SearchInput extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      error: '',
    }
    this.debouncedFunction = debounce(this.onValueChange, 2000).bind(this)
  }

  onValueChange = () => {
    const {title} = this.state
    const {updateMovie, page} = this.props

    if (title) {
      updateMovie(title, page)
    }
    this.setState({title: ''})
  }

  handleInputChange = (e) => {
    const {value} = e.target
    this.setState({title: value}, () => {
      this.debouncedFunction()
    })
  }

  render() {
    const {error} = this.state

    const visibleError = error && <ErrorIndicator errorText={error} />
    const content = !error && <Input onChange={this.handleInputChange} addonBefore={<SearchOutlined />} placeholder="Enter movie title..." />

    return (
      <>
      {visibleError}
      {content}
      </>
    )
  }
}
SearchInput.propTypes = {
  updateMovie: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}