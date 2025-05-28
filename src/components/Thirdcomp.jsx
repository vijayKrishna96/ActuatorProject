import React from "react";
export default function TorqueUI() {
  return (
    <div className="flex justify-center p-8 bg-white font-sans text-[12px]">
      <div className="grid grid-cols-3 gap-10 text-sm text-gray-800 items-start text-[12px]">
        {/* Valve Torques Column */}
        <div>
          {/* Dropdown aligned exactly with input fields */}
          <div className="flex items-center mb-3">
            <label className="w-28 text-[#08549c] font-semibold">
              Value Torques
            </label>
            <div className="" /> {/* Empty spacer to match label width */}
            <select className="w-36 h-7 bg-gray-100 border rounded px-2">
              <option>6 Values</option>
            </select>
          </div>
          {/* 6 Torque Input Fields */}
          {[
            "Break to Open",
            "Run to Open",
            "End to Open",
            "Break to Close",
            "Run to Close",
            "End to Close",
          ].map((label, i) => (
            <div key={i} className="flex items-center mb-2 ml-[1px]">
              <label className="w-36">{label}:</label>
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300"
              />
              <span className="ml-2">Nm</span>
            </div>
          ))}
          <div className="mt-2 text-sm text-gray-500 ">(Seating)</div>
        </div>
        {/* Actuator Torques Column */}
        <div>
          <div className="text-[#08549c] font-semibold mb-5">
            Actuator Torques
          </div>
          {[
            "Hydraulic Start",
            "Hydraulic Min",
            "Hydraulic End",
            "Spring Start",
            "Spring Min",
            "Spring End",
          ].map((label, i) => (
            <div key={i} className="flex items-center mb-2">
              <label className="w-36">{label}:</label>
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300 "
              />
              <span className="ml-2">Nm</span>
            </div>
          ))}
        </div>
        {/* Actual S.F Column */}
        <div>
          <div className="text-[#08549c] font-semibold mb-5">Actual S.F</div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mb-2">
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
