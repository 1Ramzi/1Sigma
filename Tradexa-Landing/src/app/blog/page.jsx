import Blog from '@/common/module/Blog'
import React from 'react'

export const metadata = {
  title: 'Blog - Tradexa',
  description: 'Articles et analyses de trading',
  
}

const Blogpost = () => {
  return (
    <div className='mt-20 flex justify-center'>
      <Blog/>
    </div>
  )
}

export default Blogpost
