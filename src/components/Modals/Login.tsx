import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword")=>{
        
        setAuthModalState((prev)=>({...prev, type}))
    }
    const[inputs,setInputs] = useState({email: "", password: ""})
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
            setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
      }
      const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            try {
                const user  = await signInWithEmailAndPassword(inputs.email, inputs.password);
                if(!user) return;
                router.push("/");
            } catch (error: any) {
                alert(error.message);
            }   
      }
    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
			<h3 className='text-xl font-medium text-white'>Sign in to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email<span style={{color: "red"}}>*</span>
				</label>
				<input
                    onChange={handleInputChange}
					type='email'
					name='email'
					id='email'
                    required
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password<span style={{color: "red"}}>*</span>
				</label>
				<input
                    onChange={handleInputChange}
					type='password'
					name='password'
                    required
					id='password'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-white/25 hover:bg-white/50 hover:text-blue-200
            '
			>
				{loading? "Loading..." : "Log In"}
			</button>
			<button className='flex w-full justify-end'>
				<a href='#' className='text-sm block hover:underline w-full text-white text-right' onClick={()=>handleClick("forgotPassword")}>
					Forgot Password?
				</a>
			</button>
			<div className='text-sm font-medium text-gray-300'>
				Not Registered?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={()=>handleClick("register")}>
					Create account
				</a>
			</div>
		</form>
    )
}
export default Login;