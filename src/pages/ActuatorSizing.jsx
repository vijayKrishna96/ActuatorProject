import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import Configuration from "./ActuatorConfiguration";


// --- Helper Components ---
const EditableSelect = ({
  options = [],
  listId,
  defaultValue,
  className = "bg-gray-200 rounded px-2 py-1 w-32",
  value,
  onChange,
}) => (
  <>
    <input
      list={listId}
      value={value}
      onChange={onChange}
      className={className}
      defaultValue={defaultValue}
    />
    <datalist id={listId}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt} />
      ))}
    </datalist>
  </>
);

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="flex flex-col gap-2 mt-2">
    {options.map((option, i) => (
      <label key={i} className="flex items-center gap-1 text-black">
        <input
          type="radio"
          name={name}
          checked={value === option}
          onChange={() => onChange(option)}
        />
        {option}
      </label>
    ))}
  </div>
);

const InputField = ({
  label,
  unit,
  value,
  onChange,
  className = "w-24 h-7 bg-gray-200 rounded border border-gray-300",
  type = "text",
  disabled = false,
}) => (
  <div className="flex items-center mb-2">
    <label className="w-36">{label}:</label>
    <input
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      style={{ marginLeft: 0 }}
      inputMode={type === "number" ? "numeric" : undefined}
      pattern={type === "number" ? "[0-9]*" : undefined}
      disabled={disabled}
    />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

const PEDBox = ({ value, onChange }) => (
  <div className="border border-gray-300 rounded px-4 py-2 w-[180px]">
    <div className="flex flex-col gap-2">
      <label className="text-[#08549c] font-semibold text-sm mb-1">
        PED Option:
      </label>
      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="ped"
          value="Non PED"
          checked={value === "Non PED"}
          onChange={onChange}
        />
        Non PED
      </label>
      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="ped"
          value="PED"
          checked={value === "PED"}
          onChange={onChange}
        />
        PED
      </label>
    </div>
  </div>
);

// --- Main Component ---
export default function ActuatorSizing({ setActiveTab, dashboardData }) {
  const [valveData, setValveData] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [valveType, setValveType] = useState("");
  const [torques, setTorques] = useState(["", "", "", "", "", ""]);
  const [actuatorSeries, setActuatorSeries] = useState([]);
  const [actuatorType, setActuatorType] = useState("Spring Return");
  const [failOrConfig, setFailOrConfig] = useState(
    "Fail Close (Fail Clockwise - FCW)"
  );
  const [pedOption, setPedOption] = useState("Non PED");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [stemUnit, setStemUnit] = useState("Metric");
  const [stemDiameter, setStemDiameter] = useState("");
  const [safetyFactor, setSafetyFactor] = useState("1.25");
  const [valveCountOption, setValveCountOption] = useState("6 Values");
  const [actualSF, setActualSF] = useState(Array(6).fill(""));

  const navigate = useNavigate(); // <-- useNavigate hook for navigation

  // Supply Pressure values from image 2
  const supplyPressureOptions = [
    "2.8",
    "3.1",
    "3.4",
    "3.8",
    "4.1",
    "4.5",
    "4.8",
    "5.2",
    "5.5",
    "5.9",
    "6.2",
    "6.6",
    "6.9",
    "7.2",
    "7.6",
    "7.9",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchValveData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/valve/", {
          method: "GET",
        });
        const data = await res.json();
        setValveData(data.data || []);
      } catch {
        console.error("Failed to fetch valve data");
      }
    };
    fetchValveData();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/series/", {
          method: "GET",
        });
        const data = await res.json();
        setActuatorSeries(data.data ? data.data.map((s) => s.name) : []);
      } catch {
        setActuatorSeries([]);
        console.error("Failed to fetch actuator series");
      }
    };
    fetchSeries();
  }, []);

  useEffect(() => {
    if (actuatorSeries.length > 0) {
      const s98Series = actuatorSeries.find((s) => s.includes("S98"));
      if (s98Series) setSelectedSeries(s98Series);
      else setSelectedSeries(actuatorSeries[0]);
    }
  }, [actuatorSeries]);

  const handleValveTypeChange = (e) => {
    setValveType(e.target.value);
    setTorques(["", "", "", "", "", ""]);
  };
  const handleTorqueChange = (idx, e) => {
    let value = e.target.value;
    let newTorques = [...torques];
    if (value !== "") {
      value = Math.round(parseFloat(value));
    }
    newTorques[idx] = value;
    if (idx === 0 && value !== "") {
      const num = parseFloat(value) || 0;
      if (valveType.toLowerCase() === "ball") {
        newTorques = [
          Math.round(num),
          Math.round(num * 0.75),
          Math.round(num * 0.8),
          Math.round(num * 0.8),
          Math.round(num * 0.75),
          Math.round(num * 0.9),
        ];
      } else if (valveType.toLowerCase() === "butterfly") {
        newTorques = [
          Math.round(num),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num),
        ];
      } else {
        newTorques[0] = Math.round(num);
      }
    }
    setTorques(newTorques);
  };
  const handleActuatorTypeChange = (option) => {
    setActuatorType(option);
    if (option === "Spring Return") {
      setFailOrConfig("Fail Close (Fail Clockwise - FCW)");
    } else {
      setFailOrConfig("Single Cylinder");
    }
  };
  const handleFailOrConfigChange = (option) => {
    setFailOrConfig(option);
  };
  const handlePEDChange = (e) => {
    setPedOption(e.target.value);
  };
  const handleStemUnitChange = (e) => {
    setStemUnit(e.target.value);
  };
  const handleStemDiameterChange = (e) => {
    setStemDiameter(e.target.value);
  };
  const handleSafetyFactorChange = (e) => {
    setSafetyFactor(e.target.value);
  };
  const handleValveCountChange = (e) => {
    setValveCountOption(e.target.value);
    if (e.target.value === "3 Values") {
      setTorques(["", "", ""]);
      setActualSF(["", "", ""]);
    } else {
      setTorques(["", "", "", "", "", ""]);
      setActualSF(["", "", "", "", "", ""]);
    }
  };
  const handleActualSFChange = (idx, e) => {
    let newSF = [...actualSF];
    newSF[idx] = e.target.value;
    setActualSF(newSF);
  };
  const handleClearAll = () => {
    setValveType("");
    setTorques(
      valveCountOption === "6 Values" ? ["", "", "", "", "", ""] : ["", "", ""]
    );
    setActuatorType("Spring Return");
    setFailOrConfig("Fail Close (Fail Clockwise - FCW)");
    setPedOption("Non PED");
    if (actuatorSeries.length > 0) {
      const s98Series = actuatorSeries.find((s) => s.includes("S98"));
      if (s98Series) setSelectedSeries(s98Series);
      else setSelectedSeries(actuatorSeries[0]);
    } else {
      setSelectedSeries("");
    }
    setStemUnit("Metric");
    setStemDiameter("");
    setSafetyFactor("1.25");
    setValveCountOption("6 Values");
    setActualSF(["", "", "", "", "", ""]);
    setShowButtons(false);
  };

  const rackPinionSeries = [
    "S92/93 - Rack & Pinion Actuator",
    "S92/93EH - R&P Electro Hydraulic Actuator",
  ];
  const pneumaticSpringSeries = [
    "S92/93 - Rack & Pinion Actuator",
    "S92/93EH - R&P Electro Hydraulic Actuator",
    "S98 - Pneumatic Scotch Yoke Actuator",
  ];

  const showFailSafeRackPinion =
    rackPinionSeries.includes(selectedSeries) &&
    actuatorType === "Spring Return";

  let actuatorTorquesLabels = [];
  if (
    (selectedSeries === "S98H - Hydraulic Scotch Yoke Actuator" ||
      selectedSeries === "S98EH - SY Electro Hydraulic Actuator") &&
    actuatorType === "Double Acting"
  ) {
    actuatorTorquesLabels = [
      "Hydraulic Start",
      "Hydraulic Min",
      "Hydraulic End",
      "Hydraulic Start2",
      "Hydraulic Min2",
      "Hydraulic End2",
    ];
  } else if (pneumaticSpringSeries.includes(selectedSeries)) {
    if (actuatorType === "Spring Return") {
      actuatorTorquesLabels = [
        "Pneumatic Start",
        "Pneumatic Min",
        "Pneumatic End",
        "Spring Start",
        "Spring Min",
        "Spring End",
      ];
    } else {
      actuatorTorquesLabels = [
        "Pneumatic Start",
        "Pneumatic Min",
        "Pneumatic End",
        "Pneumatic Start2",
        "Pneumatic Min2",
        "Pneumatic End2",
      ];
    }
  } else {
    actuatorTorquesLabels = [
      "Hydraulic Start",
      "Hydraulic Min",
      "Hydraulic End",
      "Spring Start",
      "Spring Min",
      "Spring End",
    ];
  }

  const torqueLabels6 = [
    "Break to Open",
    "Run to Open",
    "End to Open",
    "Break to Close",
    "Run to Close",
    "End to Close",
  ];
  const torqueLabels3 = ["Break to Open", "Run to Open", "End to Open"];
  const torqueLabels =
    valveCountOption === "6 Values" ? torqueLabels6 : torqueLabels3;
  const valveTypeOptions = Array.from(
    new Set(valveData.map((item) => item.name).filter(Boolean))
  );

  // --- REDIRECT HANDLER ---
  const handleActuatorConfigurationClick = () => {
    if (setActiveTab) {
      setActiveTab("S98 Part#");
    }// Redirect to ActuatorConfiguration.jsx page/route
  };

  return (
    <div className="p-4 bg-gray-100 text-[12px] font-sans min-h-screen h-screen overflow-hidden">
      {/* Top row: Valve Info + Actuator Selector */}
      <div className="flex gap-3 mb-3">
        {/* Valve Information */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-[500px] flex flex-col items-center">
          <div className="flex flex-col items-center w-full ">
            <div className="text-black w-[370px]">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-bold text-[#08549c] mt-[10px]">
                  <b>Actuator Sizing Units</b>
                </p>
              </div>
              <div className="flex items-center justify-center mt-[-30px] mr-[-323px] ">
                <button
                  className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded text-sm mr-[280px]"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              </div>
              {/* Vertically aligned form fields below heading */}
              <div className="flex flex-col items-center mt-6 w-full">
                <div className="flex flex-col gap-5 w-full">
                  {/* Valve Type */}
                  <div className="flex items-center">
                    <span className="mr-2 font-bold w-[140px] ">
                      Valve Type:
                    </span>
                    <select
                      className="bg-gray-200 rounded px-2 py-1 w-32 ml-4 font-semibold"
                      value={valveType}
                      onChange={handleValveTypeChange}
                    >
                      <option value="">Select Valve Type</option>
                      {valveTypeOptions.map((type, idx) => (
                        <option key={idx} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Required Safety Factor */}
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="mr-2 font-bold w-[140px] ">
                        Required Safety Factor:
                      </span>
                      <input
                        type="text"
                        className="border rounded px-1 py-1 w-10 bg-yellow-100 text-center ml-4 font-semibold"
                        value={safetyFactor}
                        onChange={handleSafetyFactorChange}
                      />
                    </div>
                    <span className="text-xs text-gray-500 ml-[164px] mt-[10px]">
                      (e.g. 1.25)
                    </span>
                  </div>
                  {/* Stem Diameter */}
                  <div className="flex items-center">
                    <span className="text-[#08549c] font-semibold  w-[140px]  mr-2">
                      Stem Diameter:
                    </span>
                    <div className="flex items-center space-x-3 ml-4">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="stemUnit"
                          value="Inch"
                          checked={stemUnit === "Inch"}
                          onChange={handleStemUnitChange}
                        />
                        <span className="font-semibold">Inch</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="stemUnit"
                          value="Metric"
                          checked={stemUnit === "Metric"}
                          onChange={handleStemUnitChange}
                        />
                        <span className="font-semibold">Metric</span>
                      </label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-16"
                        value={stemDiameter}
                        onChange={handleStemDiameterChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Torque ui section*/}

        <div className="bg-white p-4 shadow-lg rounded-lg w-[1012px]">
          <div className="grid grid-cols-3 gap-10 items-start ">
            <div>
              <div className="flex items-center mb-3">
                <label className="w-28 text-[#08549c] font-semibold">
                  Value Torques
                </label>
                <select
                  className="w-36 h-7 ml-2 rounded"
                  style={{ border: "none", background: "#f3f4f6" }}
                  value={valveCountOption}
                  onChange={handleValveCountChange}
                >
                  <option value="6 Values">6 Values</option>
                  <option value="3 Values">3 Values</option>
                </select>
              </div>
              {torqueLabels.map((label, i) => (
                <InputField
                  key={i}
                  label={label}
                  unit="Nm"
                  value={torques[i] !== undefined ? torques[i] : ""}
                  onChange={(e) => handleTorqueChange(i, e)}
                  type="text"
                />
              ))}
              <div className="mt-2 text-sm text-gray-500">(Seating)</div>
            </div>
            <div className="ml-[30px]">
              <div className="text-[#08549c] font-semibold mb-5 ">
                Actuator Torques
              </div>
              {actuatorTorquesLabels
                .slice(0, torqueLabels.length)
                .map((label, i) => (
                  <InputField key={i} label={label} unit="Nm" type="text" />
                ))}
            </div>
            <div>
              <div className="text-[#08549c] font-semibold mb-5 ml-[50px]">
                Actual S.F
              </div>
              {[...Array(torqueLabels.length)].map((_, i) => (
                <div key={i} className="mb-2 ml-[-30px]">
                  <input
                    type="text"
                    className="w-24 h-7 bg-gray-200 rounded border border-gray-300 "
                    style={{ marginLeft: 80 }}
                    value={actualSF[i] !== undefined ? actualSF[i] : ""}
                    onChange={(e) => handleActualSFChange(i, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom row: Actuator Image & Actuator Selector*/}
      <div className="flex gap-3">
        <div
          className="bg-white shadow-lg rounded-lg flex items-center justify-center h-full min-h-[400px] w-[500px]"
          style={{ height: "400px" }}
        >
          <div className="text-gray-400 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-sm">Actuator Image</span>
            </div>
            <p className="text-sm">Image placeholder</p>
          </div>
        </div>
        {/* Actuator selector with fixed height matching image section */}
        <div style={{ minWidth: 600, flex: 1 }}>
          {rackPinionSeries.includes(selectedSeries) ? (
            <div>
              <div
                className="bg-white p-4 shadow-lg rounded-lg space-y-4"
                style={{ height: "400px", overflowY: "auto" }}
              >
                <div className="grid grid-cols-3 gap-2 ">
                  {/* Actuator Series  */}
                  <div
                    className="flex flex-col justify-start"
                    style={{
                      maxWidth: "320px",
                      marginLeft: "-60px",
                    }}
                  >
                    <h2 className="font-bold text-[#08549c] ml-[60px]">
                      Actuator Selector
                    </h2>
                    <label className="font-bold block mb-2 text-[#08549c] ml-[60px]">
                      Actuator Series:
                    </label>
                    <div className="flex flex-col ml-[60px]">
                      {actuatorSeries.map((series, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-2 text-black"
                          style={{
                            marginBottom: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "300px",
                          }}
                          title={series}
                        >
                          <input
                            type="radio"
                            name="series"
                            checked={selectedSeries === series}
                            onChange={() => setSelectedSeries(series)}
                          />
                          <span className="whitespace-nowrap">{series}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Actuator Type  */}
                  <div>
                    <label className="font-bold block mb-2 pt-[23px] text-[#08549c]">
                      Actuator Type:
                    </label>
                    <RadioGroup
                      name="actuatorType"
                      options={["Spring Return", "Double Acting"]}
                      value={actuatorType}
                      onChange={handleActuatorTypeChange}
                    />
                  </div>
                  <div>
                    {/* Fail Safe Condition for Spring Return */}
                    {actuatorType === "Spring Return" && (
                      <>
                        <label className="font-bold block mb-2 pt-[23px] text-[#08549c]">
                          Fail Safe Condition
                        </label>
                        <RadioGroup
                          name="fail"
                          options={[
                            "Fail Close (Fail Clockwise - FCW)",
                            "Fail Open (Fail Counter Clockwise - FCCW)",
                          ]}
                          value={failOrConfig}
                          onChange={handleFailOrConfigChange}
                        />
                      </>
                    )}
                    {/* Actuator Configuration for Double Acting */}
                    {actuatorType === "Double Acting" &&
                      selectedSeries !== "S92/93 - Rack & Pinion Actuator" && (
                        <>
                          <label className="font-bold block mb-2 pt-[23px] text-[#08549c]">
                            Actuator Configuration
                          </label>
                          <RadioGroup
                            name="actuatorConfiguration"
                            options={["Single Cylinder", "Dual Cylinder"]}
                            value={failOrConfig}
                            onChange={handleFailOrConfigChange}
                          />
                        </>
                      )}
                    {/* No section shown for Double Acting and S92/93 - Rack & Pinion Actuator */}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 position">
                  {/* Actuator Selected */}
                  <div>
                    <label className="font-bold block mb-1 text-[#08549c]">
                      Actuator Selected
                    </label>
                    <div className="space-y-2 text-black">
                      {["Actuator Model", "Actuator Size", "No. of Spring"].map(
                        (label, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <label className="w-[120px]">{label}</label>
                            <input
                              type="text"
                              className="w-[120px] bg-[#d9d9d9] px-2 py-1 rounded"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {/* Supply Pressure vertically aligned with Actuator Type, and inline with Actuator Selected */}
                  <div className="flex flex-col justify-center ">
                    <label className="font-bold block  text-[#08549c]">
                      Supply Pressure:
                    </label>
                    <div className="flex items-center  ">
                      <select className="bg-[#d9d9d9] text-gray-700 px-2 py-1 rounded w-[100px] ">
                        <option>SELECT</option>
                        {supplyPressureOptions.map((pressure, idx) => (
                          <option key={idx}>{pressure}</option>
                        ))}
                      </select>
                      <span className="text-black">bar</span>
                    </div>
                  </div>
                  <div className=" text-[#08549c] mr-[50px]">
                    {[
                      {
                        label: "Act. Orientation",
                        options: ["Perpendicular To Pipe", "Parallel"],
                      },
                      {
                        label: "Manual Override",
                        options: ["None", "Gearbox"],
                      },
                    ].map((field, i) => (
                      <div key={i}>
                        <label className="block mb-1 font-semibold">
                          {field.label}
                        </label>
                        <select className="w-full bg-[#d9d9d9] text-black px-2 py-1 rounded">
                          {field.options.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    className="bg-[#08549c] text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 mt-[30px] "
                    onClick={() => setShowButtons(true)}
                  >
                    Select Actuator
                  </button>
                  {showButtons && (
                    <div className="flex gap-4 mt-4">
                      <button
                        className="bg-[#08549c] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800"
                        onClick={handleActuatorConfigurationClick} // <-- redirect here
                      >
                        Actuator Configuration
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-white p-7 shadow-lg rounded-lg space-y-6"
              style={{ height: "400px", overflowY: "auto", maxWidth: "md" }}
            >
              <div className="grid grid-cols-3 items-start">
                {/* Actuator Series */}
                <div
                  className="flex flex-col"
                  style={{ minWidth: 260, maxWidth: 400 }}
                >
                  <label className="font-bold block mb-2 text-[#08549c]">
                    Actuator Series:
                  </label>
                  <div
                    className="flex flex-wrap gap-2"
                    style={{
                      overflow: "visible",
                    }}
                  >
                    {actuatorSeries.map((series, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-black"
                        style={{
                          marginBottom: 0,
                          whiteSpace: "nowrap",
                          overflow: "visible",
                          textOverflow: "ellipsis",
                          maxWidth: "none",
                        }}
                        title={series}
                      >
                        <input
                          type="radio"
                          name="series"
                          checked={selectedSeries === series}
                          onChange={() => setSelectedSeries(series)}
                        />
                        <span className="whitespace-nowrap">{series}</span>
                      </label>
                    ))}
                  </div>
                  {/* Supply Pressure below Actuator Series, inline with PED Option */}
                  <div className="flex flex-row gap-4 mt-4 items-center">
                    <div
                      className="flex items-center gap-2 border border-gray-300 rounded px-2 py-2 bg-gray-50 "
                      style={{ minWidth: 200 }}
                    >
                      <label className="font-bold block text-[#08549c] mb-0 mr-1">
                        Supply Pressure:
                      </label>
                      <select className="bg-[#d9d9d9] text-gray-700 px-2 py-1 rounded w-[90px]">
                        <option>SELECT</option>
                        {supplyPressureOptions.map((pressure, idx) => (
                          <option key={idx}>{pressure}</option>
                        ))}
                      </select>
                      <span className="text-black">bar</span>
                    </div>
                  </div>
                </div>
                {/* Actuator Type and Yoke Type, PED Option below */}
                <div
                  className="flex flex-col justify-start ml-[40px]"
                  style={{ minWidth: 260 }}
                >
                  {/* Row: Actuator Type */}
                  <div className="flex flex-col">
                    <label className="font-bold block mb-2 text-[#08549c]">
                      Actuator Type:
                    </label>
                    <RadioGroup
                      name="actuatorType"
                      options={["Spring Return", "Double Acting"]}
                      value={actuatorType}
                      onChange={handleActuatorTypeChange}
                    />
                  </div>
                  {/* Yoke Type box (single line) */}
                  <div
                    className="border border-gray-300 rounded px-2 py-2 bg-gray-50 flex items-center gap-3 mt-6 flex-nowrap"
                    style={{
                      minWidth: 330,
                      maxWidth: 370,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span className="text-[#08549c] font-semibold text-[13px] mb-0">
                      Yoke Type:
                    </span>
                    <label className="flex items-center gap-1 text-[13px] mb-0">
                      <input type="radio" name="yokeType" />
                      Preferred
                    </label>
                    <label className="flex items-center gap-1 text-[13px] mb-0">
                      <input type="radio" name="yokeType" />
                      Symmetric
                    </label>
                    <label className="flex items-center gap-1 text-[13px] mb-0">
                      <input type="radio" name="yokeType" defaultChecked />
                      Canted
                    </label>
                  </div>
                  {/* PED Option box (single line) */}
                  <div
                    className="border border-gray-300 rounded px-2 py-2 flex items-center gap-2 mt-6"
                    style={{
                      minWidth: 180,
                      maxWidth: 250,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <label className="text-[#08549c] font-semibold text-sm mb-0 mr-2 ">
                      PED Option:
                    </label>
                    <label className="flex items-center gap-1 text-sm mb-0 ">
                      <input
                        type="radio"
                        name="ped"
                        value="Non PED"
                        checked={pedOption === "Non PED"}
                        onChange={handlePEDChange}
                      />
                      Non PED
                    </label>
                    <label className="flex items-center gap-1 text-sm mb-0">
                      <input
                        type="radio"
                        name="ped"
                        value="PED"
                        checked={pedOption === "PED"}
                        onChange={handlePEDChange}
                      />
                      PED
                    </label>
                  </div>
                </div>
                {/* Fail Safe/Config */}
                <div className="ml-[80px]">
                  <label className="font-bold block mb-2 text-[#08549c] ">
                    {actuatorType === "Spring Return"
                      ? "Fail Safe Condition"
                      : "Actuator Configuration"}
                  </label>
                  <RadioGroup
                    name="failOrConfig"
                    options={
                      actuatorType === "Spring Return"
                        ? [
                            "Fail Close (Fail Clockwise - FCW)",
                            "Fail Open (Fail Counter Clockwise - FCCW)",
                          ]
                        : ["Single Cylinder", "Dual Cylinder"]
                    }
                    value={failOrConfig}
                    onChange={handleFailOrConfigChange}
                  />
                </div>
              </div>
              {/* Row 3: Select Actuator Button and Actuator Selected inline */}
              <div className="flex flex-row gap-8 mt-2 items-center">
                {/* Select Actuator Button */}
                <div className="flex flex-col items-start h-full">
                  <button
                    className="bg-[#08549c] text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 mt-[25px]"
                    onClick={() => setShowButtons(true)}
                  >
                    Select Actuator
                  </button>
                  {showButtons && (
                    <button
                      className="ml-0 mt-2 bg-[#08549c] text-white px-5 py-2 rounded font-semibold hover:bg-blue-800"
                      onClick={handleActuatorConfigurationClick} // <-- redirect here
                    >
                      Actuator Configuration
                    </button>
                  )}
                </div>
                {/* Actuator Selected */}
                <div className="">
                  <label className="font-bold block mb-2 text-[#08549c]">
                    Actuator Selected
                  </label>
                  <div className="space-y-2 text-black">
                    <input
                      type="text"
                      className="w-[140px] bg-[#d9d9d9] px-3 py-2 rounded"
                      placeholder="Actuator Model"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
