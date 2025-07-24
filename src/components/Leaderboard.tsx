import { useLeaderboard } from "../utils/leaderboard";


const Leaderboard = ({ difficulty }: { difficulty: string }) => {
  const tries = useLeaderboard(difficulty);
  const difficulties = ["easy", "medium", "hard"];

  return (
    <div className="mt-6 text-sm flex flex-col w-[30vw] h-[80vh] shadow-gray-400  border-4 bg-black text-white p-4 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4 font-Silkscreen "> Leaderboard</h2>
      <ol>
        {difficulties.map((diff) => (
          <li key={diff} className="font-Silkscreen text-green-400 flex flex-col items-start">
            <span className="font-bold text-orange-400 ">{diff.charAt(0).toUpperCase() + diff.slice(1)}:</span>
            <ol className="list-none pl-4 my-3">
              {tries.length > 0 ? tries.filter((t) => t.difficulty === diff)
                .sort((a, b) => a.tries - b.tries)
                .map((entry, i) => (
                  <li key={i}>
                    {i + 1}. {entry.name} – {entry.tries}
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
