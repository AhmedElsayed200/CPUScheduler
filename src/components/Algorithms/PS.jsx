export const PS = (arrivalTime, burstTime, priorities) => {
  const solvedProcesses = [];
  const rQueue = [];
  const doneJobs = [];
  let processes = [];
  let fTime = [];
  let ganttChartInfo = [];
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let tatV = 0,
    watV = 0;

  for (let i = 0; i < arrivalTime.length; i++) {
    processes.push({
      processID: "P" + i,
      aTime: arrivalTime[i],
      bTime: burstTime[i],
      priority: priorities[i],
    });
  }
  processes.sort((ele1, ele2) => {
    return ele1.aTime > ele2.aTime
      ? 1
      : ele1.aTime < ele2.aTime
      ? -1
      : ele1.priority > ele2.priority
      ? 1
      : ele1.priority < ele2.priority
      ? -1
      : 0;
  });

  rQueue.push(processes[0]);
  fTime.push(processes[0].bTime + processes[0].aTime);
  tatV = fTime[0] - processes[0].aTime;
  watV = fTime[0] - processes[0].aTime - processes[0].bTime;
  totalTurnAroundTime += tatV;
  totalWaitingTime += watV;
  solvedProcesses.push({
    ...processes[0],
    ft: fTime[0],
    tat: tatV,
    wat: watV,
  });

  for (let i = 0; i < processes.length; i++) {
    if (processes[i].aTime <= fTime[0] && !rQueue.includes(processes[i])) {
      rQueue.push(processes[i]);
    }
  }

  rQueue.shift();
  doneJobs.push(processes[0]);

  ganttChartInfo.push({
    processID: processes[0].processID,
    start: processes[0].aTime,
    stop: fTime[0],
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
            : ele1.priority > ele2.priority
            ? 1
            : ele1.priority < ele2.priority
            ? -1
            : 0;
        });
      rQueue.push(undoneJobs[0]);
    }

    // Equal-priority processes are scheduled in FCFS order.
    const rQsortedP = [...rQueue].sort((ele1, ele2) => {
      return ele1.priority > ele2.priority
        ? 1
        : ele1.priority < ele2.priority
        ? -1
        : ele1.aTime > ele2.aTime
        ? 1
        : ele1.aTime < ele2.aTime
        ? -1
        : 0;
    });

    const execProcess = rQsortedP[0];

    const prevfTime = fTime[fTime.length - 1];

    if (execProcess.aTime > prevfTime) {
      fTime.push(execProcess.aTime + execProcess.bTime);
      const latestFtime = fTime[fTime.length - 1];
      ganttChartInfo.push({
        processID: execProcess.processID,
        start: execProcess.aTime,
        stop: latestFtime,
      });
    } else {
      fTime.push(prevfTime + execProcess.bTime);
      const latestFtime = fTime[fTime.length - 1];
      ganttChartInfo.push({
        processID: execProcess.processID,
        start: prevfTime,
        stop: latestFtime,
      });
    }

    const latestFtime = fTime[fTime.length - 1];

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

    for (let i = 0; i < processes.length; i++) {
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
  const avgTurnAroundTime = totalTurnAroundTime / arrivalTime.length;
  const avgWaitingTime = totalWaitingTime / arrivalTime.length;

  return { solvedProcesses, ganttChartInfo, avgTurnAroundTime, avgWaitingTime };
};
