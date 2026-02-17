import React from 'react'
import Hero from '../Hero'
import Faq from '../Faq'
import Blog from '../Blog'
import Feedback from '../Feedback'
import Feature from '../Feature/Feature'
import Pricing from '../Pricing/Pricing'
import Interest from '../EndSection/Interest'

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Pricing/>
      <Faq />
      <Blog/>
      <Feedback/>
      <Interest />
    </div>
  )
}

export default Homepage
