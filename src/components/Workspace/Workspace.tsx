import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problem';
import { useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type WorkspaceProps ={
    problem: Problem
}

const Workspace: React.FC<WorkspaceProps> = ({problem}) => {
    const[success, setSuccess] = useState(false);
    const { width, height } = useWindowSize();
  return(
                <Splitter style={{minHeight: '300px'}}>
                    <SplitterPanel className="flex align-items-center justify-content-center max-w-[50vw]">
                        <ProblemDescription problem={problem} ></ProblemDescription>
                    </SplitterPanel>
                    <SplitterPanel className="flex align-items-center justify-content-center">
                        <Playground problem={problem} setSuccess={setSuccess}></Playground>
                        {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
                    </SplitterPanel>
                </Splitter>
  )
}

export default Workspace;