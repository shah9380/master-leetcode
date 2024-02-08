import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar/Topbar";
import ProblemsTable from "@/components/Problems-Table/ProblemsTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen`}>
          <Topbar />
          <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-medium mb-4 block text-center">&rdquo; QUALITY OVER QUANTITY &rdquo;</h2>
          <table className="w-full">
            <thead className="border-b-2 border-gray-400">
                <tr>
                  <th>STATUS</th>
                  <th>TITLE</th>
                  <th>DIFFICULTY</th>
                  <th>CATEGORY</th>
                  <th>SOLUTION</th>
                </tr>
            </thead>
            <ProblemsTable></ProblemsTable>
          </table>
        </div>
    </main>
  );
}
