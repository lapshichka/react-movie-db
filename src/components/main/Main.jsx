import React from 'react'
import Card from '../card/Card'
import "./main.scss"

function Main() {
  return (
    <main className='main'>
      <div className='container'>
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  )
}

export default Main