import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { firestore } from '@/firebase/firebase';
import { DBProblem } from '@/utils/types/problem';

type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProblemsTable:React.FC<ProblemsTableProps> = ({setLoadingProblems})=>{
    // const problems = 
    const problems = useGetProblems(setLoadingProblems);
    return (
        <>
            <tbody>
            {problems?.map((problem, idx)=>{
                return(
                    <tr className={`${idx % 2 == 1 ? 'bg-gray-700/25': ''}`} key={problem.id}>
                        <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green'>
                            <BsCheckCircle className='text-green-600' fontSize={"18"} width={"18"} />
                        </th>
                        <td className='px-6 py-4 font-medium'>
                                {problem.link ?
                                <Link className='hover:text-blue-600' href={problem.link} target='_blank'>
                                    
                                </Link>
                                :
                                
                                <Link className='hover:text-blue-600' href={`/problems/${problem.id}`}>
                                    {problem.title}
                                </Link>}
                        </td>
                        <td className={`${problem.difficulty=== "Easy" ? 'text-green-600' : (problem.difficulty=== 'Hard'? 'text-red-600': 'text-amber-600')} font-medium`}>
                                {problem.difficulty}
                        </td>
                        <td className='px-6 py-4 font-medium'>
                            {problem.category}
                        </td>
                        <td className='px-6 py-4 font-medium'>
                            {problem.videoId ? (
                                <Link href={`/video/${problem.videoId}`}>
                                <p className='shadow-lg hover:bg-cyan-400/25 w-fit p-4 rounded-full active:scale-[0.90]'>▶️</p>
                            </Link>
                            ) : (<p className='text-gray-400'>Coming Soon</p>)}
                            
                        </td>
                    </tr>
                )
                })}
            </tbody>
            {/* <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center ' >
                    <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0'  />
                                <YouTube videoId={"xty7fr-k0TU"} loading='lazy' iframeClassName='w-full min-h-[500px]' />
                            </div>
                        </div>
                    </div>
            </tfoot> */}
        </>
        
    )
}
export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>){
    const [problems,setProblems] = useState<DBProblem[]>([]);

    useEffect(()=>{
        const getProblems = async ()=>{
            const q = query(collection(firestore, "problems"), orderBy("order", "asc"))
            const querySnapshot = await getDocs(q);
            const tmp: DBProblem[] = [];
            querySnapshot.forEach((doc)=>{
                tmp.push({id:doc.id, ...doc.data()} as DBProblem)
            });
            setProblems(tmp);
            setLoadingProblems(false)
        }
        getProblems()
    },[setLoadingProblems])
    return problems;
}