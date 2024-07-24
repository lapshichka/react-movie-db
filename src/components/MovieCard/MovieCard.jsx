import React, { Component } from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'
import defaultPoster from '../../assets/images/default_poster.jpg'


export default class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.updateSize()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.containerRef.current && 
      (prevState.width !== this.containerRef.current.offsetWidth || 
      prevState.height !== this.containerRef.current.offsetHeight)) {
    this.updateSize()
  }
  }

  updateSize = () => {
    if (this.containerRef.current) {
      this.setState({
        width: this.containerRef.current.offsetWidth,
        height: this.containerRef.current.offsetHeight
      })
    }
  }

  trimTextToFit = (text) => {
    const {width, height} = this.state
    let newText = text
  
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
  
    const getTextWidth = (t) => context.measureText(t).width
    const containerWidth = width
    const lineHeight = 20
    const maxLines = Math.floor(height / lineHeight)
  
    if (getTextWidth(newText) < containerWidth && maxLines) {
      return newText
    }
  
    newText = typeof newText === 'string' ? newText.split(' ') : newText
    newText.splice(newText.length - 1, 1)
  
    if (getTextWidth(newText) > containerWidth && maxLines) {
      this.trimTextToFit(newText)
    }
  
    return `${newText.join(' ')}...`
  }

  render () {
    const {posterPath, releaseDate, title, overview} = this.props
    const {width, height} = this.state
    const { Title, Paragraph, Text, Link } = Typography
  
    const path = !posterPath.includes('data:image') ? `https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}` : posterPath
  
    return (
      <Card hoverable className='card'>
        <Flex gap="large">
          <Image
            className='card__image'
            src={path}
            width={115}
            height={165}
            preview={false}
          />
          
          <Flex vertical className='card__text-content text-content' >
            <Title className='text-content__title' level={5}>{title}</Title>
            <Paragraph className='text-content__opening'>
              {typeof releaseDate === 'object' ? format(releaseDate, 'MMMM dd, yyyy') : releaseDate }
            </Paragraph>
            <Flex gap="small">
              <Paragraph className='text-content__genre'>Action</Paragraph>
              <Paragraph className='text-content__genre'>Drama</Paragraph>
            </Flex>
            <Paragraph >
              <Text ref={this.containerRef} disabled={overview.includes('No description')} className='text-content__description'>
                {this.trimTextToFit(overview)}
              </Text>
            </Paragraph>
          </Flex>
        </Flex>
      </Card>
    )
  }
}
MovieCard.propTypes = {
  posterPath: PropTypes.string,
  releaseDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  title: PropTypes.string,
  overview: PropTypes.string,
}
MovieCard.defaultProps = {
  posterPath: defaultPoster,
  releaseDate: 'Unknown release date',
  title: 'Untitled Movie',
  overview: 'No description',
}