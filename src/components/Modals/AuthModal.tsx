import React from 'react';
import Login from './Login';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    
    return (
        <>
	<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60'></div>
	<div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>
		<div className='relative w-full h-full mx-auto flex items-center justify-center'>
			<div className='bg-white rounded-lg shadow relative w-full bg-black/25 mx-6'>
				<div className='flex justify-end p-2'>
					<button
						type='button'
						className='bg-transparent rounded-full h-6 w-6 pb-2 text-sm ml-auto items-center hover:bg-gray-800/50 hover:text-white text-black'
					>
						x
					</button>
				</div>
                <Login />
			</div>
		</div>
	</div>
	</>
    )
}
export default AuthModal;