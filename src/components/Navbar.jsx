import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex justify-around items-center h-20'>
        <div className="logo">
            <span className='font-bold text-2xl'>
                <span className='text-green-600'>&lt;</span>
                Pass
                <span className='text-green-600'>OP/&gt;</span>
            </span>
        </div>

        <ul className='flex gap-8'>
            <li className='hover:font-bold'><a href="/">Home</a></li>
            <li className='hover:font-bold'><a href="#">About</a></li>
            <li className='hover:font-bold'><a href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
