export const RR = (arrivalTime, burstTime, timeQuantum) => {
  const processes = arrivalTime
    .map((ele, i) => ({
      processID: "P" + i, // generate processID identifier
      aTime: ele,
      bTime: burstTime[i],
    }))
    .sort((ele1, ele2) => ele1.aTime - ele2.aTime);

  const rQueue = [];
  let currTime = processes[0].aTime;
  const unfinshedJobs = [...processes];
  const solvedProcesses = [];
  const ganttChartInfo = [];
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let tatV = 0,
    watV = 0;

  const remainingTime = processes.reduce((acc, process) => {
    acc[process.processID] = process.bTime;
    return acc;
  }, {});

  rQueue.push(unfinshedJobs[0]);
  while (true) {
    if (
      !Object.values(remainingTime).reduce((acc, cur) => {
        return acc + cur;
      }, 0) ||
      !unfinshedJobs.length > 0
    )
      break;
    if (rQueue.length === 0 && unfinshedJobs.length > 0) {
      rQueue.push(unfinshedJobs[0]);
      currTime = rQueue[0].aTime;
    }

    const execProcess = rQueue[0];

    if (timeQuantum >= remainingTime[execProcess.processID]) {
      const remainingT = remainingTime[execProcess.processID];
      remainingTime[execProcess.processID] -= remainingT;
      const prevTime = currTime;
      currTime += remainingT;

      ganttChartInfo.push({
        processID: execProcess.processID,
        start: prevTime,
        stop: currTime,
      });
    } else {
      remainingTime[execProcess.processID] -= timeQuantum;
      const prevTime = currTime;
      currTime += timeQuantum;

      ganttChartInfo.push({
        processID: execProcess.processID,
        start: prevTime,
        stop: currTime,
      });
    }
    // eslint-disable-next-line no-loop-func
    const processToCyc = processes.filter((p) => {
      return (
        p.aTime <= currTime &&
        p !== execProcess &&
        !rQueue.includes(p) &&
        unfinshedJobs.includes(p)
      );
    });

    // Push to rQueue [new processes]
    rQueue.push(...processToCyc);

    // move head item to tail
    rQueue.push(rQueue.shift());

    if (remainingTime[execProcess.processID] === 0) {
      const indexToRemoveUJ = unfinshedJobs.indexOf(execProcess);
      if (indexToRemoveUJ > -1) {
        unfinshedJobs.splice(indexToRemoveUJ, 1);
      }
      const indexToRemoveRQ = rQueue.indexOf(execProcess);
      if (indexToRemoveRQ > -1) {
        rQueue.splice(indexToRemoveRQ, 1);
      }
      tatV = currTime - execProcess.aTime;
      watV = currTime - execProcess.aTime - execProcess.bTime;
      solvedProcesses.push({
        ...execProcess,
        ft: currTime,
        tat: tatV,
        wat: watV,
      });
      totalTurnAroundTime += tatV;
      totalWaitingTime += watV;
    }
  }

  // Sort the processes arrival time and then by job name
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
