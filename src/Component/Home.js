import React from 'react'
import Swiperslider from './Swiperslider'
import SliderMain from './SliderMain';

function Home() {
  return (
     <div className='w-full pb-9 bg-black dark:bg-green-50'>
    <Swiperslider/>
    <SliderMain/>
  </div>
  )
}

export default Home
