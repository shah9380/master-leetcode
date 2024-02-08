
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '../../components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const router = useRouter();
    const[user, loading, error] = useAuthState(auth);
    const[pageLoading,setPageLoading] = useState(true);
    useEffect(()=>{
        if(user) router.push("/");
        if(!loading && !user) setPageLoading(false)
    },[user, router, loading]);
    const authModal = useRecoilValue(authModalState);

    if(pageLoading) return null;
    return <div className=''>
        <div className='max-w-[1200px] border border-white mx-auto'>
                <Navbar></Navbar>
                {authModal.isOpen && <AuthModal></AuthModal>}
        </div>
        
    </div>
}
export default AuthPage;