
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '../../components/Navbar/Navbar';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    return <div className=''>
        <div className='max-w-[1200px] border border-white mx-auto'>
                <Navbar></Navbar>
                {authModal.isOpen && <AuthModal></AuthModal>}
        </div>
        
    </div>
}
export default AuthPage;