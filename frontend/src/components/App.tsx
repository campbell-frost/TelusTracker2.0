import React, { useState } from "react";
import { IncrementTime, GetRandomAffirmation, GetRandomJr } from "../../wailsjs/go/main/App";
import { Input } from "./ui/input";

function App() {
  const [time, setTime] = useState(0);
  const [affirmation, setAffirmation] = useState("");
  const [jr, setJr] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

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
  };

  const getRandomJr = async () => {
    try {
      const result = await GetRandomJr();
      setJr(result);
    } catch (e) {
      if (e) {
        setError(e.toString());
      }
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementTime(parseInt(inputValue, 10));
  };

  return (
    <div className="container  min-h-screen grid mx-auto pt-3 relative">

      <div className="flex items-start">
        <div className=" font-bold flex-1 flex flex-col  space-y-4">
          <h5>Enter time worked</h5>
          <form onSubmit={handleSubmit} className="flex  space-y-2 items-start">
            <Input value={inputValue} onChange={handleChange} type="text" className="w-full" />

          </form>
          <h1 className="justify-center flex text-center text-3xl">{time} minutes </h1>
          {affirmation &&
            <p>"{affirmation}"
              <br />- {jr}
            </p>
          }
          {error &&
            <h5>error</h5>}
        </div>
      </div>
    </div>
  );
}

export default App;
