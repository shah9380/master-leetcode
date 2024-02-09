// import Image from "next/image";
// import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar/Topbar";
import ProblemsTable from "@/components/Problems-Table/ProblemsTable";
import { useState } from "react";


// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);

	// if (!hasMounted) return null;
  return (
    <main className={`min-h-screen`}>
          <Topbar />
          <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-medium mb-4 block text-center">&rdquo; QUALITY OVER QUANTITY &rdquo;</h2>
          <table className="w-full">
            {!loadingProblems && (<thead className="border-b-2 border-gray-400">
                <tr>
                  <th>STATUS</th>
                  <th>TITLE</th>
                  <th>DIFFICULTY</th>
                  <th>CATEGORY</th>
                  <th>SOLUTION</th>
                </tr>
            </thead>)}
            <ProblemsTable setLoadingProblems={setLoadingProblems}></ProblemsTable>
          </table>
        </div>
        {/* <form action="" className="flex flex-col gap-4">
          <input type="text" placeholder="problem id" name="id" />
          <input type="text" placeholder="title" name="title" />
          <input type="text" placeholder="difficulty" name="difficulty" />

          <input type="text" placeholder="category" name="category" />

          <input type="text" placeholder="order" name="order" />

          <input type="text" placeholder="videoId?" name="videoId" />
          <input type="text" placeholder="link?" name="link" />
          <button className="text-white">Save to database</button>
        </form> */}
    </main>
  );
}
