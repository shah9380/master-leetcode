import React from 'react';
import Link from 'next/link';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return (
        <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 bg-white border'>
			<Link href='/' className='flex items-center justify-center h-20'>
				<img style={{backgroundColor: "white", height: "50px"}} src='https://leetcode.com/static/webpack_bundles/images/logo.c36eaf5e6.svg' alt='LeetCode'/>
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-blue-400 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-blue-800 hover:bg-gray-500/50 hover:border-2 hover:border-black border-2 border-transparent
                transition duration-300 ease-in-out
                '
					
				>
					Sign In
				</button>
			</div>
		</div>
    )
}
export default Navbar;