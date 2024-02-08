import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type SignUpProps = {
    
};

const SignUp:React.FC<SignUpProps> = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassword")=>{
        
        setAuthModalState((prev)=>({...prev, type}))
    }
    const [inputs,setInputs] = useState({email:'', displayName:',', password:''})
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
    }
    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser) return;
            router.push("/")
        } catch (error: any) {
            alert(error.message);
        }
    }
    //added from github of firebase
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    useEffect(()=>{
        if(error){
            alert(error.message);
        }
    },[error])
    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email<span style={{color: "red"}}>*</span>
				</label>
				<input
                onChange={handleChangeInput}
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
				<label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
					Name<span style={{color: "red"}}>*</span>
				</label>
				<input
                    onChange={handleChangeInput}
					type='displayName'
					name='displayName'
					id='displayName'
                    required
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='Shah Islam'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password<span style={{color: "red"}}>*</span>
				</label>
				<input
                    onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
                    required
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
                text-sm px-5 py-2.5 text-center bg-white/25 hover:bg-white/50 hover:text-blue-200'>
				{loading ? "Registering..." : "Register"}
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={()=>(handleClick("login"))}>
					Log In
				</a>
			</div>
		</form>
    );
}
export default SignUp;