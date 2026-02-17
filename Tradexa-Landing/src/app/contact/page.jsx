import Contactus from '@/common/module/Contact'
import React from 'react'

export const metadata = {
  title: 'Contact - Tradexa',
  description: 'Contactez Tradexa',
  
}

const Contact = () => {
  return (
    <div className='flex justify-center  w-full'>
      <Contactus />
    </div>
  )
}

export default Contact
