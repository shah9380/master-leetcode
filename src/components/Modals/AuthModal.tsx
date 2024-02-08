import React from 'react';
import Login from './Login';
import SignUp from './Signup';
import ResetPassword from './ResetPassword';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const closeModal = useCloseModal();
    return (
        <>
	<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60' onClick={closeModal}></div>
	<div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>
		<div className='relative w-full h-full mx-auto flex items-center justify-center'>
			<div className='rounded-lg shadow relative w-full bg-black mx-6'>
				<div className='flex justify-end p-2'>
					<button
						type='button'
						className='bg-transparent rounded-full h-6 w-6 pb-2 text-sm ml-auto items-center hover:bg-gray-800/50 hover:text-white text-black' onClick={closeModal}>
						x
					</button>
				</div>
                {authModal.type === 'login'? <Login /> : (authModal.type === 'register' ? <SignUp /> : <ResetPassword />)}
			</div>
		</div>
	</div>
	</>
    )
}
export default AuthModal;

function useCloseModal(){
    const setAuthModalState = useSetRecoilState(authModalState);
    const closeModal = ()=>{
        setAuthModalState((prev)=>({...prev, isOpen:false, type: "login"}))
    }
    return closeModal;
}