import React, { useState, useEffect } from "react";

const EditableSelect = ({
  options,
  listId,
  defaultValue,
  value,
  onChange,
  className = "bg-gray-200 rounded px-2 py-1 w-32",
}) => {
  const [inputValue, setInputValue] = useState(value || defaultValue || "");

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <input
        list={listId}
        value={inputValue}
        onChange={handleInputChange}
        className={className}
      />
      <datalist id={listId}>
        {options.map((opt, index) => (
          <option
            key={opt._id || index}
            value={opt.name || opt.type || opt.pressure || opt}
          />
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
          ? "text-[#08549c] font-semibold text-[12px]"
          : ""
      }
    >
      {label}:
    </p>
    {children}
  </div>
);

const InputField = ({
  label,
  unit,
  value,
  onChange,
  onBlur,
  className = "w-24 h-7 bg-gray-200 rounded border border-gray-300",
}) => (
  <div className="flex items-center mb-2">
    <label className="w-36">{label}:</label>
    <input
      type="text"
      className={className}
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
    />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

// Alert Component
const Alert = ({ message, type = "error", onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === "error"
        ? "bg-red-100 border border-red-400 text-red-700"
        : type === "success"
        ? "bg-green-100 border border-green-400 text-green-700"
        : "bg-blue-100 border border-blue-400 text-blue-700"
    }`}
  >
    <div className="flex items-center justify-between">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold hover:opacity-70"
      >
        ×
      </button>
    </div>
  </div>
);

// Fail Safe Condition Component
const FailSafeCondition = ({ formData, handleFormFieldChange }) => (
  <div className=" p-4  rounded-lg space-y-4 text-[#8c001a]">
    <h2 className="font-bold text-sm">Fail Safe Condition</h2>

    <div className="space-y-4">
      {/* Fail Safe Action */}
      <div>
        <label className="font-bold block mb-2">Fail Safe Action:</label>
        <div className="flex flex-col text-black space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="failSafeAction"
              value="Fail Close (Fail Clockwise - FCW)"
              checked={
                formData.failSafeAction === "Fail Close (Fail Clockwise - FCW)"
              }
              onChange={(e) =>
                handleFormFieldChange("failSafeAction", e.target.value)
              }
            />
            Fail Close (Fail Clockwise - FCW)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="failSafeAction"
              value="Fail Open (Fail Counter Clockwise - FCCW)"
              checked={
                formData.failSafeAction ===
                "Fail Open (Fail Counter Clockwise - FCCW)"
              }
              onChange={(e) =>
                handleFormFieldChange("failSafeAction", e.target.value)
              }
            />
            Fail Open (Fail Counter Clockwise - FCCW)
          </label>
        </div>
      </div>

      
    </div>
  </div>
);

export default function ActuatorSizing({setActiveTab , setShowDatasheet}) {
  const [showButtons, setShowButtons] = useState(false);
  const [valueCount, setValueCount] = useState(6);
  const [valveTypes, setValveTypes] = useState([]);
  const [operatingPressures, setOperatingPressures] = useState([]);
  const [alert, setAlert] = useState(null);
  const [selectedValveType, setSelectedValveType] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    supplyPressure: "",
    actuatorType: "Double Acting",
    yokeType: "",
    actuatorModel: "",
    actuatorConfig: "",
    ped: "",
    failSafeAction: "", // New field for Spring Return
    // Torque values
    breakToOpen: "",
    runToOpen: "",
    endToOpen: "",
    breakToClose: "",
    runToClose: "",
    endToClose: "",
    // Actuator torques
    hydraulicStart: "",
    hydraulicMin: "",
    hydraulicEnd: "",
    springStart: "",
    springMin: "",
    springEnd: "",
  });

  const [isAutoPopulating, setIsAutoPopulating] = useState(false);

  const handleChange = (e) => {
    const selected = parseInt(e.target.value);
    setValueCount(selected);
  };

  const handleActuatorConfiguration = () => {
    console.log("handleActuatorConfiguration");
    // Navigate to S98Part tab which shows ValveConfigInterface
    setActiveTab("S98Part");
    setShowDatasheet(true);
  };

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
      "Pneumatic Start",
      "Pneumatic Min",
      "pneumatic End",
      "Spring Start",
      "Spring Min",
      "Spring End",
    ],
  };

  // Show alert function
  const showAlert = (message, type = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Auto-calculate torque values based on valve type and Break to Open value
  const autoCalculateTorqueValues = (breakToOpenValue, valveType) => {
    if (!breakToOpenValue || !valveType) return;

    const baseValue = parseFloat(breakToOpenValue);
    if (isNaN(baseValue)) return;

    let calculatedValues = {};

    if (valveType.toLowerCase() === "ball") {
      // Ball valve percentages based on Image 1
      calculatedValues = {
        runToOpen: Math.round(baseValue * 0.75).toString(), // 75%
        endToOpen: Math.round(baseValue * 0.8).toString(), // 80%
        breakToClose: Math.round(baseValue * 0.8).toString(), // 80%
        runToClose: Math.round(baseValue * 0.75).toString(), // 75%
        endToClose: Math.round(baseValue * 0.9).toString(), // 90%
      };
    } else if (valveType.toLowerCase() === "butterfly") {
      // Butterfly valve percentages based on Image 2
      const smallValue = Math.round(baseValue * 0.3); // 30%
      calculatedValues = {
        runToOpen: smallValue.toString(),
        endToOpen: smallValue.toString(),
        breakToClose: smallValue.toString(),
        runToClose: smallValue.toString(),
        endToClose: baseValue.toString(), // Same as Break to Open
      };
    }

    setFormData((prev) => ({
      ...prev,
      ...calculatedValues,
    }));

    showAlert(
      `Torque values auto-calculated for ${valveType} valve!`,
      "success"
    );
  };

  // Auto-populate function with improved error handling
  const autoPopulateFields = async (breakToOpenValue) => {
    if (!breakToOpenValue || isAutoPopulating) return;

    setAlert(null);
    setIsAutoPopulating(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/valve/actutors?breakToOpen=${breakToOpenValue}`
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Received data:", data);

        if (data && data.length > 0) {
          const actuatorData = data[0];

          setFormData((prev) => ({
            ...prev,
            supplyPressure: actuatorData.supplyPressure?.toString() || "",
            actuatorType: actuatorData.actuatorType || "Double Acting",
            yokeType: actuatorData.yokeType || "",
            actuatorModel: actuatorData.actuatorModel || "",
            runToOpen: actuatorData.runToOpen?.toString() || "",
            endToOpen: actuatorData.endToOpen?.toString() || "",
            breakToClose: actuatorData.breakToClose?.toString() || "",
            runToClose: actuatorData.runToClose?.toString() || "",
            endToClose: actuatorData.endToClose?.toString() || "",
          }));

          showAlert("Data auto-populated successfully!", "success");
          console.log("Auto-populated data:", actuatorData);
        } else {
          // If no API data found, try auto-calculation based on valve type
          if (selectedValveType) {
            autoCalculateTorqueValues(breakToOpenValue, selectedValveType);
          } else {
            showAlert(
              `No actuator data found for Break to Open value: ${breakToOpenValue}`,
              "error"
            );
          }
        }
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error auto-populating fields:", error);
      // Fallback to auto-calculation if API fails
      if (selectedValveType) {
        autoCalculateTorqueValues(breakToOpenValue, selectedValveType);
      } else {
        showAlert(
          "Failed to fetch actuator data. Please select a valve type for auto-calculation.",
          "error"
        );
      }
    } finally {
      setIsAutoPopulating(false);
    }
  };

  // Handle torque input changes
  const handleTorqueChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle break to open blur event
  const handleBreakToOpenBlur = () => {
    if (formData.breakToOpen && formData.breakToOpen.trim() !== "") {
      autoPopulateFields(formData.breakToOpen.trim());
    }
  };

  // Handle form field changes
  const handleFormFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle valve type selection
  const handleValveTypeChange = (valveType) => {
    setSelectedValveType(valveType);
    // If Break to Open already has a value, recalculate
    if (formData.breakToOpen && formData.breakToOpen.trim() !== "") {
      autoCalculateTorqueValues(formData.breakToOpen.trim(), valveType);
    }
  };

  // Clear all form data
  const clearAllData = () => {
    setFormData({
      supplyPressure: "",
      actuatorType: "Double Acting",
      yokeType: "",
      actuatorModel: "",
      actuatorConfig: "",
      ped: "",
      failSafeAction: "",
      breakToOpen: "",
      runToOpen: "",
      endToOpen: "",
      breakToClose: "",
      runToClose: "",
      endToClose: "",
      hydraulicStart: "",
      hydraulicMin: "",
      hydraulicEnd: "",
      springStart: "",
      springMin: "",
      springEnd: "",
    });
    setSelectedValveType("");
    setAlert(null);
    showAlert("All data cleared successfully!", "info");
  };

  

  useEffect(() => {
    fetch("http://localhost:5000/api/valve")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch valve types");
        return res.json();
      })
      .then((data) => {
        console.log(data, "valve");
        setValveTypes(data);
      })
      .catch((err) => {
        console.error("Error fetching valve types:", err);
        showAlert("Failed to load valve types", "error");
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/valve/operating-pressure")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch operating pressures");
        return res.json();
      })
      .then((data) => {
        setOperatingPressures(data);
      })
      .catch((err) => {
        console.error("Error fetching operating pressures:", err);
        showAlert("Failed to load operating pressures", "error");
      });
  }, []);

  const torqueFieldMapping = {
    "Break to Open": "breakToOpen",
    "Run to Open": "runToOpen",
    "End to Open": "endToOpen",
    "Break to Close": "breakToClose",
    "Run to Close": "runToClose",
    "End to Close": "endToClose",
    "Hydraulic Start": "hydraulicStart",
    "Hydraulic Min": "hydraulicMin",
    "Hydraulic End": "hydraulicEnd",
    "Spring Start": "springStart",
    "Spring Min": "springMin",
    "Spring End": "springEnd",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4  text-[12px] font-sans min-h-screen">
      {/* Alert Component */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Default Sizing Units */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
          <div className="w-[50%] text-black">
            <div className="flex justify-between items-center mb-2">
              <p className=" font-bold text-[#08549c] text-[12px] ">
                Default Sizing Units
              </p>
              <button
                className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded text-[12px]"
                onClick={clearAllData}
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              <FormField
                label="Valve Type"
                className="flex items-center justify-between mr-[115px]"
              >
                <EditableSelect
                  options={valveTypes}
                  listId="valveType"
                  value={selectedValveType}
                  onChange={handleValveTypeChange}
                />
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
                  <label className="flex items-center space-x-1 ">
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
      {/* /* Actuator Selector - Original */}
      <div className="bg-white p-4 shadow-lg rounded-lg space-y-4 text-[#0D47A1] text-[12px]">
        <h2 className="font-bold ">Actuator Selector</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Supply Pressure */}
              <div>
                <label className="font-semibold block mb-2 text-[12px]">Supply Pressure:</label>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-[#d9d9d9] text-[#0D47A1] px-2 py-1 rounded w-[100px]"
                    value={formData.supplyPressure}
                    onChange={(e) =>
                      handleFormFieldChange("supplyPressure", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {operatingPressures.map((item) => (
                      <option key={item._id} value={item.pressure}>
                        {item.pressure}
                      </option>
                    ))}
                  </select>
                  <span className="text-black">bar</span>
                </div>
              </div>
              {/* Actuator Type Selection */}
              <div className="mt-6">
                <label className="font-semibold block mb-2 text-[#0D47A1] text-[12px]">
                  Actuator Type:
                </label>
                <div className="flex flex-col text-black space-y-1">
                  <label className="flex items-center gap-2 text-[12px]">
                    <input
                      type="radio"
                      name="actuatorType"
                      value="Spring Return"
                      checked={formData.actuatorType === "Spring Return"}
                      onChange={(e) =>
                        handleFormFieldChange("actuatorType", e.target.value)
                      }
                    />
                    Spring Return
                  </label>
                  <label className="flex items-center gap-2 text-[12px]">
                    <input
                      type="radio"
                      name="actuatorType"
                      value="Double Acting"
                      checked={formData.actuatorType === "Double Acting"}
                      onChange={(e) =>
                        handleFormFieldChange("actuatorType", e.target.value)
                      }
                    />
                    Double Acting
                  </label>
                </div>
              </div>
            </div>

            {/* Yoke Type */}
            <div className="flex items-center space-x-4 border border-gray-400 rounded p-3 w-fit">
              <label className="font-semibold text-[#0D47A1] text-[12px]">Yoke Type:</label>
              {["Preferred", "Symmetric", "Canted"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-black text-[12px]"
                >
                  <input
                    type="radio"
                    name="yokeType"
                    value={type}
                    checked={formData.yokeType === type}
                    onChange={(e) =>
                      handleFormFieldChange("yokeType", e.target.value)
                    }
                  />
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

        <div className="grid grid-cols-2 gap-4">
          {/* Actuator Selected */}
          <div>
            <label className="font-semibold block mb-2 text-[#0D47A1] text-[12px]">
              Actuator Selected
            </label>
            <div className="space-y-2 text-black text-[12px]">
              <div className="flex items-center gap-2">
                <label className="w-[120px]">Actuator Model</label>
                <input
                  type="text"
                  className="w-[120px] bg-[#d9d9d9] px-2 py-1 rounded"
                  value={formData.actuatorModel}
                  onChange={(e) =>
                    handleFormFieldChange("actuatorModel", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Actuator Configuration */}
          {/* Conditional Rendering based on Actuator Type */}
          {formData.actuatorType === "Spring Return" ? (
            <FailSafeCondition
              formData={formData}
              handleFormFieldChange={handleFormFieldChange}
            />
          ) : (
            <div>
              <label className="font-bold block mb-2 text-[#0D47A1] text-[12px]">
                Actuator Configurator
              </label>
              <div className="flex flex-col space-y-1 text-black text-[12px]">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="actuatorConfig"
                    value="Single Cylinder"
                    checked={formData.actuatorConfig === "Single Cylinder"}
                    onChange={(e) =>
                      handleFormFieldChange("actuatorConfig", e.target.value)
                    }
                  />
                  Single Cylinder
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="actuatorConfig"
                    value="Dual Cylinder"
                    checked={formData.actuatorConfig === "Dual Cylinder"}
                    onChange={(e) =>
                      handleFormFieldChange("actuatorConfig", e.target.value)
                    }
                  />
                  Dual Cylinder
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Select Button */}
          <div className="mt-4">
            <button
              className="bg-[#0D47A1] text-white px-6 py-2 rounded font-semibold hover:bg-[#5e4b91]"
              onClick={() => setShowButtons(true)}
            >
              Select Actuator
            </button>
            {showButtons && (
              <div className="flex gap-4 mt-4">
                <button className="bg-[#0D47A1] text-white px-4 py-2 rounded font-semibold hover:bg-[#0d52a1]"
                onClick={handleActuatorConfiguration}
                >
                  Actuator Configuration
                </button>
              </div>
            )}
          </div>

          {/* PED */}
          <div className="flex flex-col">
            <label className="font-bold block mb-2 text-[#8c001a]">PED</label>
            <div className="flex space-x-4 border border-gray-400 rounded px-3 py-2 text-black w-fit">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="ped"
                  value="Non PED"
                  checked={formData.ped === "Non PED"}
                  onChange={(e) => handleFormFieldChange("ped", e.target.value)}
                />
                Non PED
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="ped"
                  value="PED"
                  checked={formData.ped === "PED"}
                  onChange={(e) => handleFormFieldChange("ped", e.target.value)}
                />
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
                className="w-36 h-7 bg-gray-100 border-none rounded px-2 ml-2"
                onChange={handleChange}
                value={valueCount}
              >
                <option value={6}>6 Values</option>
                <option value={3}>3 Values</option>
              </select>
            </div>

            {/* Show valve type indicator */}
            {selectedValveType && (
              <div className="mb-2 text-sm text-blue-600">
                Selected: {selectedValveType} valve
              </div>
            )}

            {torqueLabels.valve.slice(0, valueCount).map((label, i) => {
              const fieldKey = torqueFieldMapping[label];
              return (
                <InputField
                  key={i}
                  label={label}
                  unit="Nm"
                  value={formData[fieldKey]}
                  onChange={(e) => handleTorqueChange(fieldKey, e.target.value)}
                  onBlur={
                    label === "Break to Open"
                      ? handleBreakToOpenBlur
                      : undefined
                  }
                  className={`w-24 h-7 bg-gray-200 rounded border-none ml-[1px] ${
                    label === "Break to Open" && isAutoPopulating
                      ? "bg-yellow-100"
                      : ""
                  }`}
                />
              );
            })}
            <div className="mt-2 text-sm text-gray-500">(Seating)</div>
            {isAutoPopulating && (
              <div className="mt-2 text-sm text-blue-600">
                Auto-calculating...
              </div>
            )}
          </div>

          <div>
            <div className="text-[#08549c] font-semibold mb-5">
              Actuator Torques
            </div>
            {torqueLabels.actuator.slice(0, valueCount).map((label, i) => {
              const fieldKey = torqueFieldMapping[label];
              return (
                <InputField
                  key={i}
                  label={label}
                  unit="Nm"
                  value={formData[fieldKey]}
                  onChange={(e) => handleTorqueChange(fieldKey, e.target.value)}
                />
              );
            })}
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
          <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
            <span>Actuator Image Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
