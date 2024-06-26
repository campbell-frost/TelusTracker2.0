import React, { useState } from "react";

import { IncrementTime, GetRandomAffirmation, ClearTime, GetRandomJr } from "../../wailsjs/go/main/App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TelusDark from "../assets/TelusTrackerDark.png"
import TelusLight from "../assets/TelusTracker.png"
import { useDarkMode } from "./DarkModeContext";
function App() {
  const [time, setTime] = useState(0);
  const [affirmation, setAffirmation] = useState("");
  const [jr, setJr] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { dark } = useDarkMode();

  const incrementTime = async (time: number) => {
    try {
      const result = await IncrementTime(time);
      setTime(result);
      getRandomAffirmation();
      getRandomJr();
    } catch (e) {
      console.log("an error occurred", e);
    }
    setInputValue("");
  };

  const getRandomAffirmation = async () => {
    try {
      const result = await GetRandomAffirmation();
      setAffirmation(result);
    } catch (e) {
      if (e) {
        setError(e.toString());
      }
    }
  }

  const getRandomJr = async () => {
    try {
      const result = await GetRandomJr();
      setJr(result);
    } catch (e) {
      if (e) {
        console.log(e.toString());
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementTime(parseInt(inputValue, 10));
  };

  const handleClear = async () => {
    const result = await ClearTime();
    setTime(result);
  };

  return (
    <>
      {dark ? <img src={TelusDark} alt="Telus Dark" /> : <img src={TelusLight} alt="Telus Light" />}
      <div className="flex gap-8 items-start">
        <div className="text-2xl font-bold flex-1 flex flex-col pl-40 items-start space-y-4">
          <h1>Enter time worked</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-start">
            <Input value={inputValue} onChange={handleChange} type="text" className="w-full" />
            <div className="flex space-x-2">
              <Button type="submit">Calculate</Button>
              <Button variant={"outline"} type="button" onClick={handleClear}>Clear</Button>
            </div>
          </form>
        </div>
        <div className="text-2xl font-bold flex-1 flex flex-col pr-10 items-start space-y-4">
          <h1>Total time: {time}</h1>
          {affirmation &&
            <h1>"{affirmation}"
              <br />- {jr}
            </h1>
          }
        </div>
      </div>
      {error && <h1>
        {error}
      </h1>
      }
      <p className="absolute right-4 bottom-4"><a href="http://frostie.vercel.app">Buy my mixtape</a></p>
    </>

  );
}

export default App;