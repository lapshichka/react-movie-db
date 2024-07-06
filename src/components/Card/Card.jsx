import React from 'react'
import "./card.scss"

import PropTypes from 'prop-types'

function Card({data}) {
  return (
    <>
      {data.map(({ posterPath, releaseDate, title, overview }) => (
        <div className='card'>
          <div>
            <img className='cover' src={`https:/${posterPath}`} alt={`${title}`} />
          </div>
  
          <div className='text-content'>
            <div className='title'>{title}</div>
            {/* December 20, 2017 */}
            <div className='opening'>{releaseDate}</div>
            <div className='genres'>
              <div className='genre'>Action</div>
              <div className='genre'>Drama</div>
            </div>
            <div className='description'>
              <p>
                {overview}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
Card.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      posterPath: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  )
}
Card.defaultProps = {
  data: []
}
export default Card