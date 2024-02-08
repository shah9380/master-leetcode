"use client"
import React, { useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';

type PlaygroundProps = {
    problem: Problem
};

const Playground:React.FC<PlaygroundProps> = ({problem}) => {
    const boilerplate = problem.starterCode;
    const[activeTestCaseId,setActiveTestCaseId] = useState<number>(0)
    return <div className='flex flex-col bg-dark-layer-1 relative w-full'>
            <PreferenceNav></PreferenceNav>
            <Splitter gutterSize={5} style={{minHeight: '300px'}} layout="vertical">
                    <SplitterPanel className="w-full overflow-auto bg-[#1E1E1E]">
                            <CodeMirror height='full' value={boilerplate} theme={vscodeDark} extensions={[javascript()]} style={{fontSize: 16}}></CodeMirror>
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
                            <EditorFooter></EditorFooter>
                    </SplitterPanel>
            </Splitter>
        </div>
}
export default Playground;