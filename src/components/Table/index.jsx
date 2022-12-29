import { Row } from "./Row";

export const Table = ({ data }) => {
  const header = {
    processID: "Process ID",
    aTime: "Arrival Time",
    bTime: "Burst Time",
    ft: "Completion Time",
    tat: "Turn around Time",
    wat: "Waiting Time",
  };
  return (
    <div className="mt-4">
      <p className="mb-2 font-bold font-sans text-xl text-gray-500">
        Calculations:
      </p>
      <div className="mb-2">
        <Row data={header} />
      </div>
      {data.map((row, i) => (
        <Row key={row.processID+i} data={row} />
      ))}
    </div>
  );
};
