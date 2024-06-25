import React, { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

import { IncrementTime, GetRandomAffirmation, ClearTime, GetRandomJr } from "../wailsjs/go/main/App";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import TelusLight from "./assets/TelusTracker.png";
import TelusDark from "./assets/TelusTrackerDark.png";

function App() {
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState(0);
  const [affirmation, setAffirmation] = useState("");
  const [jr, setJr] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

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
    <div className="min-h-screen grid mx-auto py-8 relative">
      <button
        onClick={() => darkModeHandler()}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
      >
        {dark ? <IoSunny /> : <IoMoon />}
      </button>
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
          <h1>Total time: <strong>{time}</strong></h1>
          <h1>{affirmation} - {jr}</h1>
        </div>
      </div>
      {error && <h1>

        {error}
      </h1>
      }
    </div>
  );
}

export default App;