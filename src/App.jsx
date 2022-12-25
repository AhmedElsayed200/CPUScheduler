import { useState } from "react";
import InputPage from "./containers/InputPage";
import OutputPage from "./containers/OutputPage";

const App = () => {
  const [algorithm, setAlgorithm] = useState("First Come First Serve, FCFS");
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [burstTimes, setBurstTimes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [quantumTime, setQuantumTime] = useState([]);

  return (
    <div className="App">
      <InputPage
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setArrivalTimes={setArrivalTimes}
        setBurstTimes={setBurstTimes}
        setPriorities={setPriorities}
        setQuantumTime={setQuantumTime}
      />
      <OutputPage
        algorithm={algorithm}
        arrivalTimes={arrivalTimes}
        burstTimes={burstTimes}
        priorities={priorities}
        quantumTime={quantumTime}
      />
    </div>
  );
}

export default App;
