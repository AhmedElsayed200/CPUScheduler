import React from "react";
import { FCFS } from "../../components/Algorithms/FCFS";
import { PS } from "../../components/Algorithms/PS";
import { RR } from "../../components/Algorithms/RR";
import { SJF } from "../../components/Algorithms/SJF";
import { SJFP } from "../../components/Algorithms/SJFP";
import { GanttChart } from "../../components/GanttChart";

const OutputPage = ({
  algorithm,
  arrivalTimes,
  burstTimes,
  priorities,
  quantumTime,
  showOutput,
}) => {
  let result;
  if (showOutput) {
    switch (algorithm) {
      case "First Come First Serve, FCFS":
        result = FCFS(arrivalTimes, burstTimes);
        break;
      case "Shortest Job First, SJF":
        result = SJF(arrivalTimes, burstTimes);
        break;
      case "Shortest Job First, SJF (P)":
        result = SJFP(arrivalTimes, burstTimes);
        break;
      case "Priority Scheduling":
        result = PS(arrivalTimes, burstTimes, priorities);
        break;
      case "Round Robin, RR":
        result = RR(arrivalTimes, burstTimes, quantumTime);
        break;
      default:
        result = 0;
        break;
    }
  }

  console.log(algorithm, result);
  return (
    <div className="flex flex-col bg-white h-fit w-3/5 px-6 py-6 border-2 border-gray-100 rounded-lg shadow-lg">
      <p className="mb-6 font-extrabold font-sans text-2xl">Output</p>
      {showOutput && <GanttChart ganttChartInfo={result.ganttChartInfo} />}
    </div>
  );
};

export default OutputPage;
