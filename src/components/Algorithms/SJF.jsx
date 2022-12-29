export const SJF = (arrivalTime, burstTime) => {
  let processes = [];
  const solvedProcesses = [];
  const rQueue = [];
  const doneJobs = [];
  let finishTime = [];
  let ganttChartInfo = [];
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;

  // Create an array of objects containing the processID, arrival time, and burst time

  for (let i = 0; i < arrivalTime.length; i++) {
    processes.push({
      processID: "P" + i, // generate processID identifier
      aTime: arrivalTime[i],
      bTime: burstTime[i],
    });
  }

  // Sort the processes by arrival and burst time
  processes.sort((a, b) => {
    return a.aTime > b.aTime
      ? 1
      : a.aTime < b.aTime
      ? -1
      : a.bTime > b.bTime
      ? 1
      : a.bTime < b.bTime
      ? -1
      : 0;
  });

  rQueue.push(processes[0]);
  finishTime.push(processes[0].bTime + processes[0].aTime);
  let tatV = finishTime[0] - processes[0].aTime,
    watV = finishTime[0] - processes[0].aTime - processes[0].bTime;
  solvedProcesses.push({
    ...processes[0],
    ft: finishTime[0],
    tat: tatV,
    wat: watV,
  });
  totalTurnAroundTime += tatV;
  totalWaitingTime += watV;

  for (let i = 0; i < processes.length; i++) {
    if (!rQueue.includes(processes[i]) && processes[i].aTime <= finishTime[0]) {
      rQueue.push(processes[i]);
    }
  }

  rQueue.shift();
  doneJobs.push(processes[0]);

  ganttChartInfo.push({
    processID: processes[0].processID,
    start: processes[0].aTime,
    stop: finishTime[0],
  });

  for (let i = 1; i < processes.length; i++) {
    if (rQueue.length === 0 && doneJobs.length !== processes.length) {
      const undoneJobs = processes
        .filter((p) => {
          return !doneJobs.includes(p);
        })
        .sort((ele1, ele2) => {
          return ele1.aTime > ele2.aTime
            ? 1
            : ele1.aTime < ele2.aTime
            ? -1
            : ele1.bTime > ele2.bTime
            ? 1
            : ele1.bTime < ele2.bTime
            ? -1
            : 0;
        });
      rQueue.push(undoneJobs[0]);
    }

    const rqSortedByBT = [...rQueue].sort((ele1, ele2) => {
      return ele1.bTime > ele2.bTime
        ? 1
        : ele1.bTime < ele2.bTime
        ? -1
        : ele1.aTime > ele2.aTime
        ? 1
        : ele1.aTime < ele2.aTime
        ? -1
        : 0;
    });

    const execProcess = rqSortedByBT[0];

    const previousFinishTime = finishTime[finishTime.length - 1];

    if (execProcess.aTime > previousFinishTime) {
      finishTime.push(execProcess.aTime + execProcess.bTime);
      const latestFtime = finishTime[finishTime.length - 1];
      ganttChartInfo.push({
        processID: execProcess.processID,
        start: execProcess.aTime,
        stop: latestFtime,
      });
    } else {
      finishTime.push(previousFinishTime + execProcess.bTime);
      const latestFtime = finishTime[finishTime.length - 1];
      ganttChartInfo.push({
        processID: execProcess.processID,
        start: previousFinishTime,
        stop: latestFtime,
      });
    }

    const latestFtime = finishTime[finishTime.length - 1];
    tatV = latestFtime - execProcess.aTime;
    watV = latestFtime - execProcess.aTime - execProcess.bTime;
    solvedProcesses.push({
      ...execProcess,
      ft: latestFtime,
      tat: tatV,
      wat: watV,
    });
    totalTurnAroundTime += tatV;
    totalWaitingTime += watV;

    for (let i = 0; i < processes.length; ++i) {
      if (
        processes[i].aTime <= latestFtime &&
        !rQueue.includes(processes[i]) &&
        !doneJobs.includes(processes[i])
      ) {
        rQueue.push(processes[i]);
      }
    }

    const indexToRemove = rQueue.indexOf(execProcess);
    if (indexToRemove > -1) {
      rQueue.splice(indexToRemove, 1);
    }

    doneJobs.push(execProcess);
  }

  // Sort the processes by arrival time
  solvedProcesses.sort((ele1, ele2) => {
    return ele1.aTime > ele2.aTime
      ? 1
      : ele1.aTime < ele2.aTime
      ? -1
      : ele1.processID > ele2.processID
      ? 1
      : ele1.processID < ele2.processID
      ? -1
      : 0;
  });
    
  // Calculate the average turn-around time and average waiting time
  const avgTurnAroundTime = totalTurnAroundTime / processes.length;
  const avgWaitingTime = totalWaitingTime / processes.length;

  return { solvedProcesses, ganttChartInfo, avgTurnAroundTime, avgWaitingTime };
};
