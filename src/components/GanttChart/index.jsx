export const GanttChart = ({ ganttChartInfo }) => {
  return (
    <>
      <p className="mb-2 font-bold font-sans text-xl text-gray-500">Gantt Chart:</p>
      <div className="flex flex-wrap">
        {ganttChartInfo.map((ele, i) => (
          <div key={ele+i} className="relative rounded-lg px-4 py-2 bg-indigo-500 mr-2 mb-6 font-sans text-sm text-white">
            {ele.processID}
            <p className="absolute -bottom-5 left-0 text-xs text-black antialiased lining-nums">
              {ele.start}
            </p>
            <p className="absolute -bottom-5 right-0 text-xs text-black antialiased lining-nums">
              {ele.stop}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
