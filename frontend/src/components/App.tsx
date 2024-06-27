import { useState, ChangeEvent, FormEvent } from "react";
import { IncrementTime, GetRandomAffirmation, GetRandomJr } from "../../wailsjs/go/main/App";
import { Input } from "./ui/input";

interface HistoryEntry {
  time: number;
  affirmation: string;
  jr: string;
}

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const incrementTime = async (time: number) => {
    try {
      const result = await IncrementTime(time);
      const newAffirmation = await GetRandomAffirmation();
      const newJr = await GetRandomJr();

      setHistory(prevHistory => [
        { time: result, affirmation: newAffirmation, jr: newJr },
        ...prevHistory
      ]);

    } catch (e: any) {
      setError(e.toString());
    }
    setInputValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementTime(parseInt(inputValue, 10));
  };

  return (
    <div className="container min-h-screen grid mx-auto py-3 relative">
      <div className="flex items-start">
        <div className="font-bold flex-1 flex flex-col space-y-4">
          <h5 className="text-2xl flex justify-center">Enter time worked</h5>
          <form onSubmit={handleSubmit} className="flex space-y-2 items-start">
            <Input value={inputValue} onChange={handleChange} type="text" className="w-full rounded-lg" />
          </form>
          {history.map((entry, index) => (
            <div key={index}>
              <h1 className="justify-center flex text-center text-3xl pb-3">{entry.time} minutes </h1>
              <p>
                "{entry.affirmation}"
                <br />- {entry.jr}
              </p>
            </div>
          ))}
          {error && <h5>error</h5>}
        </div>
      </div>
    </div>
  );
}


