import React, { useState } from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { problems } from '@/mockfproblems/problems';
import { Problem } from '@/utils/types/problem';

type WorkspaceProps ={
    problem: Problem
}

const Workspace: React.FC<WorkspaceProps> = ({problem}) => {
  return(
                <Splitter style={{minHeight: '300px'}}>
                    <SplitterPanel className="flex align-items-center justify-content-center max-w-[50vw]">
                        <ProblemDescription problem={problem}></ProblemDescription>
                    </SplitterPanel>
                    <SplitterPanel className="flex align-items-center justify-content-center">
                        <Playground problem={problem}></Playground>
                    </SplitterPanel>
                </Splitter>
  )
}

export default Workspace;

{/* <Split className='split'>
            <ProblemDescription></ProblemDescription>
            <div>The code editor will be there</div>
  </Split> */}