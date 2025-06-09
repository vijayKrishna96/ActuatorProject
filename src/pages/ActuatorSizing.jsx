import React, { useState } from "react";
import { useEffect } from "react";

const EditableSelect = ({
  options,
  listId,
  defaultValue,
  className = "bg-gray-200 rounded px-2 py-1 w-32",
}) => {
  const [value, setValue] = useState(defaultValue || "");
  console.log("options", options);
  return (
    <>
      <input
        list={listId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
      />
      <datalist id={listId}>
        {options.map((opt) => (
          <option key={opt._id} value={opt.type} />
        ))}
      </datalist>
    </>
  );
};

const FormField = ({
  label,
  children,
  className = "flex justify-between items-center",
}) => (
  <div className={className}>
    <p
      className={
        label.includes("Unit Type") || label.includes("Stem Diameter")
          ? "text-[#08549c] font-semibold"
          : ""
      }
    >
      {label}:
    </p>
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

const InputField = ({
  label,
  unit,
  className = "w-24 h-7 bg-gray-200 rounded border border-gray-300",
}) => (
  <div className="flex items-center mb-2">
    <label className="w-36">{label}:</label>
    <input type="text" className={className} />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

export default function ActuatorSizing() {
  const [showButtons, setShowButtons] = useState(false);
  const [valueCount, setValueCount] = useState(6);
  const [valveTypes, setValveTypes] = useState([]);
  const [operatingPressures, setOperatingPressures] = useState([]);

  const handleChange = (e) => {
    const selected = parseInt(e.target.value);
    setValueCount(selected);
  };

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

  const actuatorSeries = ["S98 - Pneumatic Scotch Yoke Actuator"];

  const torqueLabels = {
    valve: [
      "Break to Open",
      "Run to Open",
      "End to Open",
      "Break to Close",
      "Run to Close",
      "End to Close",
    ],
    actuator: [
      "Hydraulic Start",
      "Hydraulic Min",
      "Hydraulic End",
      "Spring Start",
      "Spring Min",
      "Spring End",
    ],
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/valve/actuator-types")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setValveTypes(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/valve/operating-pressure")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setOperatingPressures(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        // setLoading(false);
      });
  }, []);

  console.log(operatingPressures, "operatingPressures");

  // useEffect(() => {
  //   const fetchCourseData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/valve/actuator-types`);
  //       console.log(response);
  //     } catch (err) {
  //       console.error("Error fetching categories:", err.message);
  //       // setError("Failed to load categories");
  //     }
  //   };
  //   fetchCourseData();
  // }, []);

  // console.log(valveTypes, "valvetypes")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-gray-100 text-[12px] font-sans min-h-screen">
      {/* Valve Information */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
          {/* <div className="w-[45%] space-y-2 text-black">
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
          </div> */}

          <div className="w-[50%] text-black">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-[#08549c]">
                Default Sizing Units
              </p>
              <button className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded text-sm">
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              <FormField label="User Defined">
                <input type="checkbox" className="form-checkbox mr-[230px]" />
              </FormField>
              <FormField
                label="Valve Type"
                className="flex items-center justify-between mr-[115px]"
              >
                <EditableSelect options={valveTypes} listId="valveType" />
              </FormField>
              <FormField label="Required Safety Factor">
                <input
                  type="text"
                  className="border rounded px-1 py-1 w-10 bg-yellow-100 text-center mr-[150px]"
                  defaultValue="1.25"
                />
              </FormField>
              <p className="text-xs text-gray-500 text-right mr-[130px]">
                (Example: 1.25)
              </p>
              <FormField
                label="Stem Diameter"
                className="flex items-center justify-between mt-10"
              >
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="stemUnit" />
                    <span>Inch</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="stemUnit" defaultChecked />
                    <span>Metric</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-16"
                  />
                </div>
              </FormField>
            </div>
          </div>
        </div>
      </div>

      {/* Actuator Selector */}
      <div className="bg-white p-4 shadow-lg rounded-lg space-y-4 text-[#8c001a]">
        <h2 className="font-bold text-lg">Actuator Selector</h2>

        {/* Row 1: 3 Columns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Supply Pressure */}
              <div>
                <label className="font-bold block mb-2">Supply Pressure:</label>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-[#d9d9d9] text-gray-700 px-2 py-1 rounded w-[100px]"
                    defaultValue="" // optional: to show placeholder
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {operatingPressures.map((item) => (
                      <option key={item._id} value={item.pressure}>
                        {item.pressure}
                      </option>
                    ))}
                  </select>
                  <span className="text-black">bar</span>
                </div>
              </div>

              {/* Actuator Type */}
              <div>
                <label className="font-bold block mb-2">Actuator Type:</label>
                <div className="flex flex-col text-black space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="actuatorType"
                      value="Spring Return"
                    />
                    Spring Return
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="actuatorType"
                      value="Double Acting"
                      defaultChecked
                    />
                    Double Acting
                  </label>
                </div>
              </div>
            </div>
            {/* Yoke Type */}
            <div className="flex items-center space-x-4 border border-gray-400 rounded p-3 w-fit">
              <label className="font-bold text-[#8c001a]">Yoke Type:</label>
              {["Preferred", "Symmetric", "Canted"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-black"
                >
                  <input type="radio" name="yokeType" value={type} />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Actuator Series */}
          <div>
            <label className="font-bold block mb-2">Actuator Series:</label>
            <div className="flex flex-col text-black space-y-1">
              {actuatorSeries.map((series, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="actuatorSeries"
                    defaultChecked={series.includes("S98")}
                  />
                  {series}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: 3 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Actuator Selected */}
          <div>
            <label className="font-bold block mb-2 text-[#8c001a]">
              Actuator Selected
            </label>
            <div className="space-y-2 text-black">
              <div className="flex items-center gap-2">
                <label className="w-[120px]">Actuator Model</label>
                <input
                  type="text"
                  className="w-[120px] bg-[#d9d9d9] px-2 py-1 rounded"
                />
              </div>
            </div>
          </div>

          {/* Actuator Configuration */}
          <div>
            <label className="font-bold block mb-2 text-[#8c001a]">
              Actuator Configuration
            </label>
            <div className="flex flex-col space-y-1 text-black">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="actuatorConfig"
                  value="Single Cylinder"
                />
                Single Cylinder
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="actuatorConfig"
                  value="Dual Cylinder"
                />
                Dual Cylinder
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Select Button */}
          <div className="mt-4">
            <button
              className="bg-[#8c001a] text-white px-6 py-2 rounded font-semibold hover:bg-[#6e0016]"
              onClick={() => setShowButtons(true)}
            >
              Select Actuator
            </button>
            {showButtons && (
              <div className="flex gap-4 mt-4">
                <button className="bg-[#8c001a] text-white px-4 py-2 rounded font-semibold hover:bg-[#6e0016]">
                  Actuator Configuration
                </button>
              </div>
            )}
          </div>

          {/* PED */}
          <div className=" flex flex-col ">
            <label className="font-bold block mb-2 text-[#8c001a]">PED</label>
            <div className="flex space-x-4 border border-gray-400 rounded px-3 py-2 text-black w-fit">
              <label className="flex items-center gap-2">
                <input type="radio" name="ped" value="Non PED" />
                Non PED
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="ped" value="PED" />
                PED
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Torque UI */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="grid grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center mb-3">
              <label className="w-28 text-[#08549c] font-semibold">
                Value Torques
              </label>
              <select
                className="w-36 h-7 bg-gray-100 border rounded px-2 ml-2"
                onChange={handleChange}
                value={valueCount}
              >
                <option value={6}>6 Values</option>
                <option value={3}>3 Values</option>
              </select>
            </div>

            {torqueLabels.valve.slice(0, valueCount).map((label, i) => (
              <InputField
                key={i}
                label={label}
                unit="Nm"
                className="w-24 h-7 bg-gray-200 rounded border ml-[1px]"
              />
            ))}
            <div className="mt-2 text-sm text-gray-500">(Seating)</div>
          </div>

          <div>
            <div className="text-[#08549c] font-semibold mb-5">
              Actuator Torques
            </div>
            {torqueLabels.actuator.slice(0, valueCount).map((label, i) => (
              <InputField key={i} label={label} unit="Nm" />
            ))}
          </div>

          <div>
            <div className="text-[#08549c] font-semibold mb-5">Actual S.F</div>
            {[...Array(valueCount)].map((_, i) => (
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

      {/* Image Placeholder */}
      <div className="bg-white shadow-lg rounded-lg flex items-center justify-center h-full min-h-[400px]">
        <div className="text-gray-400 text-center">
          
          <img src="\src\assets\DA.bmp" alt="" />
        </div>
      </div>
    </div>
  );
}
