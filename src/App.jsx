import { useState } from "react";
import InputPage from "./containers/InputPage";
import OutputPage from "./containers/OutputPage";

const App = () => {
  const [algorithm, setAlgorithm] = useState("First Come First Serve, FCFS");
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [burstTimes, setBurstTimes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [quantumTime, setQuantumTime] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  console.log(showOutput);

  return (
    <div className="flex justify-around pt-8">
      <InputPage
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setArrivalTimes={setArrivalTimes}
        setBurstTimes={setBurstTimes}
        setPriorities={setPriorities}
        setQuantumTime={setQuantumTime}
        setShowOutput={setShowOutput}
      />
      <OutputPage
        algorithm={algorithm}
        arrivalTimes={arrivalTimes}
        burstTimes={burstTimes}
        priorities={priorities}
        quantumTime={quantumTime}
        showOutput={showOutput}
      />
    </div>
  );
}

export default App;
