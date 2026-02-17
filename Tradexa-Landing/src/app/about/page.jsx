import About from '@/common/module/About'
import React from 'react'


export const metadata = {
  title: 'À propos - Tradexa',
  description: 'À propos de Tradexa',
  
}

const page = () => {
  return (
    <div className='mt-20 flex justify-center'>
      <About />
    </div>
  )
}

export default page
