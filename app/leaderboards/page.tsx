import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";

interface User {
  id: string;
  username: string;
  profilePic: string;
  quizResults: { quizScore: number }[];
}

const page = async () => {
  const users = await prisma.user.findMany({
    include: { quizResults: true },
  });

  users.sort((a: User, b: User) =>
    b.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0) -
    a.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0)
  );

  return (
    <div className="max-w-[1500px] mx-auto w-[90%] py-10">
      <h1 className="font-bold mb-4 text-center text-2xl uppercase">
        Leaderboards 🏆
      </h1>
      <ol>
        {users.map((user : User, index : number) => (
          <li
            key={user.id}
            className={`py-4 ${index < 3 ? "font-bold" : ""}`}
          >
            <div className="flex items-center gap-5 w-full">
              <div className="flex sm:flex-row flex-col gap-1 justify-between w-full items-center">
                <div className="flex gap-3 items-center">
                  <span className="text-xl mb-1">{index + 1}</span>
                  <Image
                    src={user.profilePic}
                    width={30}
                    height={30}
                    alt={`Image of ${user.username}`}
                    className="rounded-full"
                  />
                  <span className="text-xl">{user.username}</span>
                  {index === 0 && (
                    <FaCrown className="inline-block w-6 h-6 text-yellow-500 mb-1" />
                  )}
                </div>
                <span>
                  Total Quiz Score:{" "}
                  {user.quizResults.reduce(
                    (acc, curr) => acc + curr.quizScore,
                    0
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center mt-8">
        <Link href="https://flexagram.vercel.app/">
          <button className="bg-violet-500 text-white px-4 py-2 rounded-md">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
