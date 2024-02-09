"use client"
import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground:React.FC<PlaygroundProps> = ({problem, setSuccess}) => {
    const boilerplate = problem.starterCode;
    let[userCode,setUserCode] = useState<string>(boilerplate);
    const[activeTestCaseId,setActiveTestCaseId] = useState<number>(0);
    const [user] = useAuthState(auth);
    const {query: {pid}} = useRouter();
    const handleSubmit = async ()=>{
        if(!user){
            alert("Please Login First");
            return;
        }
        try {
            userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${userCode}`)();//to convert te user string function to Function
            const handler = problems[pid as string].handlerFunction;
            if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
				}
			}

        } catch (error) {
            console.log("you're wrong")
            console.log(error);
            alert("OoPs one or more testcases failed")
        }
    }
    useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);
    const onChange = (value: string)=>{
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value));
    }
    return <div className='flex flex-col bg-dark-layer-1 relative w-full'>
            <PreferenceNav></PreferenceNav>
            <Splitter gutterSize={5} style={{minHeight: '300px'}} layout="vertical">
                    <SplitterPanel className="w-full overflow-auto bg-[#1E1E1E]">
                            <CodeMirror height='full' value={userCode} theme={vscodeDark} extensions={[javascript()]} onChange={onChange} style={{fontSize: 16}}></CodeMirror>
                    </SplitterPanel>
                    <SplitterPanel className="w-full px-5 overflow-auto relative bg-[#1E1E1E]">
                            <div className='flex h-10 item-center space-x-6 w-full'>
                                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                    <div className='text-sm font-medium leading-5 text-white'>TestCases</div>
                                    <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                                </div>
                            </div>
                            <div className='flex'>
                                {/* case 1 */}

                                {problem.examples.map((example,idx)=>(
                                    <div className='mr-2 item-start mt-2 text-white' key={example.id} onClick={()=>{setActiveTestCaseId(idx)}}>
                                    <div className='flex flex-wrap item-center gap-y-4'>
                                        <div className='font-medium items-center teransition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative px-4 py-1 cursor-pointer whitespace-nowwrap rounded-lg'>
                                                    Case {idx+1}
                                        </div>
                                    </div>
                                    </div>
                                ))}
                                
                                
                            </div>
                            <div className='font-semibold'>
                                    <p className='text-sm font-medium mt-4 text-white '>Input</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                        {problem.examples[activeTestCaseId].inputText}
                                    </div>
                                    <p className='text-sm font-medium mt-4 text-white '>Output</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                    {problem.examples[activeTestCaseId].outputText}
                                    </div>
                            </div>
                            <EditorFooter handleSubmit= {handleSubmit}></EditorFooter>
                    </SplitterPanel>
            </Splitter>
        </div>
}
export default Playground;