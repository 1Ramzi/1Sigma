import SolutionPage from '@/common/module/Solution/component/SolutionPage'
import React from 'react'

export const metadata = {
  title: 'Solutions - Tradexa',
  description: 'Nos solutions de trading',
  
}

const page = () => {
  return (
    <div className='mt-20 flex justify-center'>
      <SolutionPage />
    </div>
  )
}

export default page
