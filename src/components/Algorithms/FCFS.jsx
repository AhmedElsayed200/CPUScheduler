export const FCFS = (arrivalTime, burstTime) => {
  let finishTime = []; // array to store the finish time for each process
  let ganttChartInfo = []; // array to store information for the Gantt chart
  let totalTurnAroundTime = 0; // variable to store the total turn-around time
  let totalWaitingTime = 0; // variable to store the total waiting time

  // Create an array of objects containing the processID, arrival time, and burst time
  // for each process, sorted by arrival time
  const processes = arrivalTime
    .map((ele, i) => ({
      processID: "P" + i, // generate processID identifier
      aTime: ele,
      bTime: burstTime[i],
    }))
    .sort((ele1, ele2) => ele1.aTime - ele2.aTime);

  // Solve the processes using the FCFS algorithm
  const solvedProcesses = [];
  for (let i = 0; i < processes.length; i++) {
    const process = processes[i];
    let startTime;
    if (i === 0 || process.aTime > finishTime[i - 1]) {
      // if this is the first process or the arrival time is after the previous process's finish time,
      // the start time is the arrival time
      startTime = process.aTime;
      finishTime[i] = process.aTime + process.bTime;
    } else {
      // otherwise, the start time is the previous process's finish time
      startTime = finishTime[i - 1];
      finishTime[i] = finishTime[i - 1] + process.bTime;
    }
    // add the start and finish times to the Gantt chart information
    ganttChartInfo.push({
      processID: process.processID,
      start: startTime,
      stop: finishTime[i],
    });

    // Calculate the finish time, turn-around time, and waiting time for the process
    const ft = finishTime[i];
    const tat = ft - process.aTime;
    const wat = ft - process.aTime - process.bTime;

    // add the turn-around time and waiting time to the totals
    totalTurnAroundTime += tat;
    totalWaitingTime += wat;

    solvedProcesses.push({
      ...process,
      ft,
      tat,
      wat,
    });
  }

  // Calculate the average turn-around time and average waiting time
  const avgTurnAroundTime = totalTurnAroundTime / processes.length;
  const avgWaitingTime = totalWaitingTime / processes.length;

  return { solvedProcesses, ganttChartInfo, avgTurnAroundTime, avgWaitingTime };
};
