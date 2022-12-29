import React from "react";
const OutputPage = ({algorithm, arrivalTimes, burstTimes, priorities, quantumTime}) => {
    return (
        <div className="flex flex-col bg-white h-fit w-3/5 px-6 py-6 border-2 border-gray-100 rounded-lg shadow-lg">
            <p className="mb-6 font-extrabold font-sans text-2xl">Output</p>
        </div>
    );
};

export default OutputPage;
