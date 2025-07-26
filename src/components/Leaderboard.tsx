import { useLeaderboard } from "../utils/leaderboard";


const Leaderboard = ({ difficulty }: { difficulty: string }) => {
  const tries = useLeaderboard(difficulty);
  const difficulties = ["easy", "medium", "hard"];

  return (

    <div className=" relative mt-6 text-sm flex flex-col p-4 overflow-auto overflow-x-hidden items-center w-[30vw] h-[80vh] shadow-gray-400  border-2 bg-white/15 backdrop-blur-md text-white rounded ring-3  ring-blue-300">

      <h2 className="text-lg font-bold mb-4 font-Silkscreen "> Leaderboard</h2>
      <ol>
        {difficulties.map((diff) => (
          <li key={diff} className="font-Silkscreen text-green-400 flex flex-col items-center">
            <span className="font-bold text-red-400 mt-4 ">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
            <ol className="list-none flex flex-col items-center gap-4  my-3">
              <li className="flex w-[27vw] justify-between items-center border-2 text-orange-400 border-white px-4 py-3 hover:bg-white hover:border-gray-800">
                <p>Player</p>
                <p># Tries</p>
              </li>
              {tries.length > 0 ? tries.filter((t) => t.difficulty === diff)
                .sort((a, b) => a.tries - b.tries)
                .map((entry, i) => (
                  <li className="flex w-[27vw] justify-between items-center border-2 border-white px-4 py-3 hover:bg-white hover:border-gray-800" key={i}>
                  
                    <p>{entry.name}</p>
                    <p>{entry.tries}</p>
                  </li>
                )) : <li>No entries yet</li>}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
