
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '../../components/Navbar/Navbar';
import React from 'react';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    
    return <div className=''>
        <div className='max-w-[1200px] border border-white mx-auto'>
                <Navbar></Navbar>
                <AuthModal></AuthModal>
        </div>
        
    </div>
}
export default AuthPage;