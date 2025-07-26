import { db } from "../firebase";
import { push, ref } from "firebase/database";
import { onValue } from "firebase/database";
import { useEffect, useState } from "react";

type ScoreEntry = {
  difficulty: string;
  name: string;
  tries: number;
};

export const addTries = (name: string, tries: number, difficulty: string) => {
  const triesRef = ref(db, `leaderboard/${difficulty}`);
  return push(triesRef, {
    name,
    tries,
    difficulty,
    timestamp: Date.now()
  });
};

export const useLeaderboard = (difficulty: string) => {
  const [entries, setEntries] = useState<{
      difficulty: string; name: string; tries: number 
}[]>([]);

  useEffect(() => {
    const triesRef = ref(db, `leaderboard/${difficulty}`);
    const unsubscribe = onValue(triesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const list = Object.values(data) as ScoreEntry[];
      const sorted = list.sort((a, b) => a.tries - b.tries).slice(0, 10);
      setEntries(sorted);
    });

    return () => unsubscribe();
  }, [difficulty]);

  return entries;
};
