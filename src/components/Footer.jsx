import React from 'react'

const Footer = () => {
  return (
    <div className="h-10 flex w-full justify-around bg-slate-800  items-center text-white">
        <span className='font-bold text-2xl'>
                <span className='text-green-600'>&lt;</span>
                Pass
                <span className='text-green-600'>OP/&gt;</span>
            </span>
                
        <span className='flex'>created with <img width={25} height={25} src="./icons/heart.png" alt="" /> by alyahmed</span>
        
    </div>
  )
}

export default Footer
