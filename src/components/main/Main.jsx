import React from 'react';
import Card from '../Card/Card';
import "./main.scss";

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

export default Main;