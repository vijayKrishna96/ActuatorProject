import React, { useState } from "react";

const EditableSelect = ({ options, listId, defaultValue, className = "bg-gray-200 rounded px-2 py-1 w-32" }) => {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <>
      <input
        list={listId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
      />
      <datalist id={listId}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt} />
        ))}
      </datalist>
    </>
  );
};

const FormField = ({ label, children, className = "flex justify-between items-center" }) => (
  <div className={className}>
    <p className={label.includes("Unit Type") || label.includes("Stem Diameter") ? "text-[#08549c] font-semibold" : ""}>{label}:</p>
    {children}
  </div>
);

const RadioGroup = ({ name, options, defaultIndex = 0 }) => (
  <div className="flex flex-col gap-2 mt-2">
    {options.map((option, i) => (
      <label key={i} className="flex items-center gap-1 text-black">
        <input type="radio" name={name} defaultChecked={i === defaultIndex} />
        {option}
      </label>
    ))}
  </div>
);

const InputField = ({ label, unit, className = "w-24 h-7 bg-gray-200 rounded border border-gray-300" }) => (
  <div className="flex items-center mb-2">
    <label className="w-36">{label}:</label>
    <input type="text" className={className} />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

export default function ActuatorSizing() {
  const [showButtons, setShowButtons] = useState(false);
  
  const options = {
    productBrand: ["Bray", "Velan", "Emerson"],
    valveSeries: ["S21", "S22", "S23"],
    discConfig: ["Full Disc", "Segmented", "Double Offset"],
    appCategory: ["Class A", "Class B", "Class C"],
    valveSize: ["100", "200", "350", "500"],
    diffPressure: ["10", "20", "30"],
    stemMaterial: ["SS316", "SS304", "Monel"],
    valveType: ["Butterfly", "Ball", "Gate"],
    unitType: ["Metric", "Inch"],
  };

  const valveFields = [
    { label: "Unit Type", key: "unitType", default: "Metric" },
    { label: "Product Brand", key: "productBrand" },
    { label: "Valve Series", key: "valveSeries" },
    { label: "Disc Configuration", key: "discConfig" },
    { label: "Application Category", key: "appCategory" },
    { label: "Valve Size ( mm )", key: "valveSize" },
    { label: "Differential Pressure", key: "diffPressure" },
    { label: "Stem Material", key: "stemMaterial" },
  ];

  const actuatorSeries = [
    "S92/93 - Rack & Pinion Actuator",
    "S92/93EH - R&P Electro Hydraulic Actuator", 
    "S98 - Pneumatic Scotch Yoke Actuator",
    "S98H - Hydraulic Scotch Yoke Actuator",
    "S98EH - SY Electro Hydraulic Actuator"
  ];

  const torqueLabels = {
    valve: ["Break to Open", "Run to Open", "End to Open", "Break to Close", "Run to Close", "End to Close"],
    actuator: ["Hydraulic Start", "Hydraulic Min", "Hydraulic End", "Spring Start", "Spring Min", "Spring End"]
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 text-[12px] font-sans min-h-screen">
      
      {/* Valve Information */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
          <div className="w-[45%] space-y-2 text-black">
            <p className="text-sm font-bold mb-2 text-[#08549c]">Valve Information</p>
            <div className="space-y-2">
              {valveFields.map(field => (
                <FormField key={field.key} label={field.label}>
                  <EditableSelect options={options[field.key]} listId={field.key} defaultValue={field.default} />
                </FormField>
              ))}
              <FormField label="VMC">
                <input type="text" className="bg-gray-200 rounded px-2 py-1 w-32" />
              </FormField>
              <FormField label="Enter MAST Value">
                <input type="text" className="rounded px-2 py-1 w-32 bg-gray-200" />
              </FormField>
            </div>
          </div>

          <div className="w-[50%] text-black">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-[#08549c]">Default Sizing Units</p>
              <button className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded text-sm">Clear All</button>
            </div>
            <div className="space-y-2">
              <FormField label="User Defined">
                <input type="checkbox" className="form-checkbox mr-[230px]" />
              </FormField>
              <FormField label="Valve Type" className="flex items-center justify-between mr-[115px]">
                <EditableSelect options={options.valveType} listId="valveType" />
              </FormField>
              <FormField label="Required Safety Factor">
                <input type="text" className="border rounded px-1 py-1 w-10 bg-yellow-100 text-center mr-[150px]" defaultValue="1.25" />
              </FormField>
              <p className="text-xs text-gray-500 text-right mr-[130px]">(Example: 1.25)</p>
              <FormField label="Stem Diameter" className="flex items-center justify-between mt-10">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="stemUnit" />
                    <span>Inch</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="stemUnit" defaultChecked />
                    <span>Metric</span>
                  </label>
                  <input type="text" className="border rounded px-2 py-1 w-16" />
                </div>
              </FormField>
            </div>
          </div>
        </div>
      </div>

      {/* Actuator Selector */}
      <div className="bg-white p-4 shadow-lg rounded-lg space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <h2 className="font-bold">Actuator Selector</h2>
            <label className="font-bold block mb-2">Supply Pressure:</label>
            <div className="flex items-center gap-2">
              <select className="bg-[#d9d9d9] text-gray-700 px-2 py-1 rounded w-[100px]">
                <option>SELECT</option>
              </select>
              <span className="text-black">bar</span>
            </div>
          </div>
          <div>
            <label className="font-bold block mb-2 pt-[23px]">Actuator Type:</label>
            <RadioGroup name="actuatorType" options={["Spring Return", "Double Acting"]} />
          </div>
          <div>
            <label className="font-bold block mb-2 pt-[23px]">Actuator Series:</label>
            <div className="flex flex-col space-y-1">
              {actuatorSeries.map((series, i) => (
                <label key={i} className="flex items-center gap-1 text-black flex-wrap">
                  <input type="radio" name="series" defaultChecked={i === 0} />
                  {series}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label className="font-bold block mb-1">Actuator Selected</label>
            <div className="space-y-2 text-black">
              {["Actuator Model", "Actuator Size", "No. of Spring"].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <label className="w-[120px]">{label}</label>
                  <input type="text" className="w-[120px] bg-[#d9d9d9] px-2 py-1 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Fail Safe Condition</label>
            <RadioGroup name="fail" options={["Fail Close (Fail Clockwise - FCW)", "Fail Open (Fail Counter Clockwise - FCCW)"]} />
          </div>
          <div className="space-y-4">
            {[
              { label: "Act. Orientation", options: ["Perpendicular To Pipe"] },
              { label: "Manual Override", options: ["None"] }
            ].map((field, i) => (
              <div key={i}>
                <label className="block mb-1 font-semibold">{field.label}</label>
                <select className="w-full bg-[#d9d9d9] text-black px-2 py-1 rounded">
                  {field.options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <button
            className="bg-[#08549c] text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 mt-[30px]"
            onClick={() => setShowButtons(true)}
          >
            Select Actuator
          </button>
          {showButtons && (
            <div className="flex gap-4 mt-4">
              <button className="bg-[#08549c] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800">
                Actuator Configuration
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Torque UI */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="grid grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center mb-3">
              <label className="w-28 text-[#08549c] font-semibold">Value Torques</label>
              <select className="w-36 h-7 bg-gray-100 border rounded px-2 ml-2">
                <option>6 Values</option>
              </select>
            </div>
            {torqueLabels.valve.map((label, i) => (
              <InputField key={i} label={label} unit="Nm" className="w-24 h-7 bg-gray-200 rounded border ml-[1px]" />
            ))}
            <div className="mt-2 text-sm text-gray-500">(Seating)</div>
          </div>
          
          <div>
            <div className="text-[#08549c] font-semibold mb-5">Actuator Torques</div>
            {torqueLabels.actuator.map((label, i) => (
              <InputField key={i} label={label} unit="Nm" />
            ))}
          </div>
          
          <div>
            <div className="text-[#08549c] font-semibold mb-5">Actual S.F</div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="mb-2">
                <input type="text" className="w-24 h-7 bg-gray-200 rounded border border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="bg-white shadow-lg rounded-lg flex items-center justify-center h-full min-h-[400px]">
        <div className="text-gray-400 text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-sm">Actuator Image</span>
          </div>
          <p className="text-sm">Image placeholder</p>
        </div>
      </div>
    </div>
  );
}