import React from 'react'
import "./card.scss"

function Card() {
  return (
    <div className='card'>
      <div>
        <img className='cover' src="https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/8472ca52-2751-4bbe-9a08-8a1be75f93d5/300x450" alt="Бумажный дом" />
      </div>

      <div className='text-content'>
        <div className='title'>Money Heist</div>
        <div className='opening'>December 20, 2017</div>
        <div className='genres'>
          <div className='genre'>Action</div>
          <div className='genre'>Drama</div>
        </div>
        <div className='description'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card