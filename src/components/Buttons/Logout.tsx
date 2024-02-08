import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

type LogoutProps = {
    
};


const Logout:React.FC<LogoutProps> = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout = ()=>{
        signOut();
    }
    return <button className='hover:bg-gray-800/25' onClick={handleLogout}>
        <FiLogOut></FiLogOut>
    </button>
}
export default Logout;