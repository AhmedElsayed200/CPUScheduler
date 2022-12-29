import React, { useState } from "react";
import InputTextField from "../../components/InputText";
import DropdownMenu from "../../components/Dropdown";
import ErrorMessage from "../../components/ErrorMessage";

const InputPage = ({
  algorithm,
  setAlgorithm,
  setArrivalTimes,
  setBurstTimes,
  setPriorities,
  setQuantumTime,
}) => {
  const [error, setError] = useState(false);

  const handleSubmission = () => {
    const arrivalInput = document.getElementById("arrivalInput"),
      burstInput = document.getElementById("burstInput"),
      priorityInput = document.getElementById("priorityInput"),
      quantumInput = document.getElementById("quantumInput");
    let arrivalArray = 0,
      burstArray = 0,
      priorityArray = 0,
      quantumValue = 0;
    arrivalArray = arrivalInput?.value?.match(/\d+/g)?.map(Number);
    burstArray = burstInput?.value?.match(/\d+/g)?.map(Number);
    priorityArray = priorityInput?.value?.match(/\d+/g)?.map(Number);
    quantumValue = quantumInput?.value?.match(/\d+/g)?.map(Number);
    console.log(
      algorithm,
      arrivalArray,
      burstArray,
      priorityArray,
      quantumValue
    );

    if (
      !arrivalArray ||
      !burstArray ||
      arrivalArray.length !== burstArray.length ||
      (algorithm === "Priority Scheduling" &&
        (!priorityArray || arrivalArray.length !== priorityArray.length)) ||
      (algorithm === "Round Robin, RR" &&
        (!quantumValue || quantumValue[0] <= 0 || quantumValue.length > 1))
    ) {
      setError(true);
      return;
    }
    setError(false);
    setArrivalTimes(arrivalArray);
    setBurstTimes(burstArray);
    setPriorities(priorityArray);
    setQuantumTime(quantumValue);
  };

  return (
    <div className="flex flex-col bg-white h-min w-72 px-6 py-6 border-2 border-gray-100 rounded-lg shadow-lg">
      <p className="mb-6 font-extrabold font-sans text-2xl">Input</p>
      <DropdownMenu algorithm={algorithm} setAlgorithm={setAlgorithm} />
      <InputTextField
        setArrivalTimes={setArrivalTimes}
        title="Arrival Times"
        id="arrivalInput"
        placeholder="e.g. 0 3 5 12 4"
      />
      <InputTextField
        setBurstTimes={setBurstTimes}
        title="Burst Times"
        id="burstInput"
        placeholder="e.g. 3 6 10 12 1"
      />
      {algorithm === "Priority Scheduling" && (
        <InputTextField
          setPriorities={setPriorities}
          title="Priorities"
          id="priorityInput"
          placeholder="Lower no. = higher priority"
        />
      )}
      {algorithm === "Round Robin, RR" && (
        <InputTextField
          setQuantumTime={setQuantumTime}
          title="Time Quantum"
          id="quantumInput"
          placeholder="e.g. 4"
        />
      )}
      <div className="mb-8 relative">
        {error && <ErrorMessage />}
        <button
          onClick={handleSubmission}
          className="absolute right-0 bg-indigo-500 hover:bg-indigo-700 text-white py-1 px-3 rounded"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InputPage;
