import React from "react";
import { FCFS } from "../../components/Algorithms/FCFS";
import { PS } from "../../components/Algorithms/PS";
import { RR } from "../../components/Algorithms/RR";
import { SJF } from "../../components/Algorithms/SJF";
import { SJFP } from "../../components/Algorithms/SJFP";
import { GanttChart } from "../../components/GanttChart";
import { Table } from "../../components/Table";

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
    <div className="flex flex-col mb-6 bg-white h-fit w-4/5 md:w-3/5 px-6 py-6 border-2 border-gray-100 rounded-lg shadow-lg">
      <p className="mb-6 font-extrabold font-sans text-2xl">Output</p>
      {showOutput && (
        <div>
          <GanttChart ganttChartInfo={result.ganttChartInfo} />
          <Table data={result.solvedProcesses} />
          <div className="mt-8 flex justify-between">
            <div className="text-center">
              <p className="mb-2 font-bold font-sans text-xl text-gray-500">
                Average Turn Around Time
              </p>
              <p className="font-bold font-sans text-lg">{result.avgTurnAroundTime.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-bold font-sans text-xl text-gray-500">
                Average Waiting Time
              </p>
              <p className="font-bold font-sans text-lg">{result.avgWaitingTime.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPage;
