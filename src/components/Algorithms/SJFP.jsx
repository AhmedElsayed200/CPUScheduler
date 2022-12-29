export const SJFP = (arrivalTime, burstTime) => {
  let processes = [];
  const solvedProcesses = [];
  const ganttChartInfo = [];
  const rQueue = [];
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let tatV = 0,
    watV = 0;

  for (let i = 0; i < arrivalTime.length; i++) {
    processes.push({
      processID: "P" + i,
      aTime: arrivalTime[i],
      bTime: burstTime[i],
    });
  }
  processes.sort((ele1, ele2) => {
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

  let currTime = processes[0].aTime;
  const undoneJobs = [...processes];

  const timeToFinish = processes.reduce((acc, process) => {
    acc[process.processID] = process.bTime;
    return acc;
  }, {});

  rQueue.push(undoneJobs[0]);

  while (true) {
    if (
      !Object.values(timeToFinish).reduce((acc, cur) => {
        return acc + cur;
      }, 0) ||
      !undoneJobs.length > 0
    )
      break;
    let isIdl = undoneJobs.length > 0 && rQueue.length === 0;
    let latestIdle = isIdl ? true : false;
    if (isIdl) {
      rQueue.push(undoneJobs[0]);
    }

    rQueue.sort((ele1, ele2) => {
      // Equal-priority processes are scheduled in FCFS order.
      return timeToFinish[ele1.processID] > timeToFinish[ele2.processID]
        ? 1
        : timeToFinish[ele1.processID] < timeToFinish[ele2.processID]
        ? -1
        : 0;
    });

    const execProcess = rQueue[0];

    // eslint-disable-next-line no-loop-func
    const pLessThanBT = processes.filter((process) => {
      let curr = currTime;
      if (latestIdle) {
        curr = execProcess.aTime;
      }

      return (
        process.aTime <= timeToFinish[execProcess.processID] + curr &&
        !rQueue.includes(process) &&
        undoneJobs.includes(process) &&
        process !== execProcess
      );
    });

    let interrupted = false;
    for (let i = 0; i < pLessThanBT.length; i++) {
      if (latestIdle) {
        currTime = execProcess.aTime;
      }

      const amount = pLessThanBT[i].aTime - currTime;

      if (currTime >= pLessThanBT[i].aTime) {
        rQueue.push(pLessThanBT[i]);
      }

      if (pLessThanBT[i].bTime < timeToFinish[execProcess.processID] - amount) {
        timeToFinish[execProcess.processID] -= amount;
        rQueue.push(pLessThanBT[i]);
        const prevcurrTime = currTime;
        currTime += amount;
        ganttChartInfo.push({
          processID: execProcess.processID,
          start: prevcurrTime,
          stop: currTime,
        });

        interrupted = true;
        pLessThanBT[i] = true;
      }
    }

    // eslint-disable-next-line no-loop-func
    const arrivedJobs = processes.filter((process) => {
      return (
        process.aTime <= currTime &&
        process !== execProcess &&
        !rQueue.includes(process) &&
        undoneJobs.includes(process)
      );
    });

    // Push new processes to rQueue
    rQueue.push(...arrivedJobs);

    if (!interrupted) {
      if (latestIdle) {
        const remT = timeToFinish[execProcess.processID];
        timeToFinish[execProcess.processID] -= remT;
        currTime = execProcess.aTime + remT;

        for (let i = 0; i < pLessThanBT.length; i++) {
          if (pLessThanBT[i] <= currTime) rQueue.push(pLessThanBT[i]);
        }

        ganttChartInfo.push({
          processID: execProcess.processID,
          start: execProcess.aTime,
          stop: currTime,
        });
      } else {
        const remT = timeToFinish[execProcess.processID];
        timeToFinish[execProcess.processID] -= remT;
        const prevcurrTime = currTime;
        currTime += remT;

        // eslint-disable-next-line no-loop-func
        for (let i = 0; i < pLessThanBT.length; i++) {
          if (
            currTime >= pLessThanBT[i].aTime &&
            !rQueue.includes(pLessThanBT[i])
          ) {
            rQueue.push(pLessThanBT[i]);
          }
        }

        ganttChartInfo.push({
          processID: execProcess.processID,
          start: prevcurrTime,
          stop: currTime,
        });
      }
    }

    // Requeueing (move head/first item to tail/last)
    rQueue.push(rQueue.shift());

    // When the process finished executing
    if (timeToFinish[execProcess.processID] === 0) {
      const indexToRemoveUJ = undoneJobs.indexOf(execProcess);
      if (indexToRemoveUJ > -1) {
        undoneJobs.splice(indexToRemoveUJ, 1);
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

  // Sort the processes by job name within arrival time
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
