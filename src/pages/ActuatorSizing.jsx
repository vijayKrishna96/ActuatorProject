import React, { useState, useEffect, useCallback } from "react";
import {
  ACTUATOR_PROXY_API,
  GETALL_OPERATINGPRESSURE,
  GETALL_VALVETYPES,
} from "../utils/constants/Api";

// Reusable Components
const EditableSelect = ({
  options,
  listId,
  value,
  onChange,
  className = "bg-gray-200 rounded px-2 py-1 w-32",
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
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

const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  className = "flex flex-col space-y-2",
}) => (
  <div className={className}>
    {options.map((option) => (
      <label key={option.value} className="flex items-center gap-2 text-[12px]">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
        />
        {option.label}
      </label>
    ))}
  </div>
);

const FailSafeCondition = ({ formData, handleFormFieldChange }) => (
  <div className="p-4 rounded-lg space-y-4 text-[#8c001a]">
    <h2 className="font-bold text-sm">Fail Safe Condition</h2>
    <div>
      <label className="font-bold block mb-2">Fail Safe Action:</label>
      <RadioGroup
        name="failSafeAction"
        value={formData.failSafeAction}
        onChange={(value) => handleFormFieldChange("failSafeAction", value)}
        options={[
          {
            value: "Fail Close (Fail Clockwise - FCW)",
            label: "Fail Close (Fail Clockwise - FCW)",
          },
          {
            value: "Fail Open (Fail Counter Clockwise - FCCW)",
            label: "Fail Open (Fail Counter Clockwise - FCCW)",
          },
        ]}
        className="flex flex-col text-black space-y-2"
      />
    </div>
  </div>
);

// Constants
const VALVE_TORQUE_RATIOS = {
  ball: {
    runToOpen: 0.75,
    endToOpen: 0.8,
    breakToClose: 0.8,
    runToClose: 0.75,
    endToClose: 0.9,
  },
  butterfly: {
    runToOpen: 0.3,
    endToOpen: 0.3,
    breakToClose: 0.3,
    runToClose: 0.3,
    endToClose: 1.0,
  },
};

const TORQUE_LABELS = {
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
    "Pneumatic End",
    "Spring Start",
    "Spring Min",
    "Spring End",
  ],
};

const TORQUE_FIELD_MAPPING = {
  "Break to Open": "breakToOpen",
  "Run to Open": "runToOpen",
  "End to Open": "endToOpen",
  "Break to Close": "breakToClose",
  "Run to Close": "runToClose",
  "End to Close": "endToClose",
  "Pneumatic Start": "pneumaticStart",
  "Pneumatic Min": "pneumaticMin",
  "Pneumatic End": "pneumaticEnd",
  "Spring Start": "springStart",
  "Spring Min": "springMin",
  "Spring End": "springEnd",
};

const INITIAL_FORM_DATA = {
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
  pneumaticStart: "",
  pneumaticMin: "",
  pneumaticEnd: "",
  springStart: "",
  springMin: "",
  springEnd: "",
  actualSF: {
    pneumaticStart: "",
    pneumaticMid: "",
    pneumaticEnd: "",
    springStart: "",
    springMid: "",
    springEnd: "",
  },
};

export default function ActuatorSizing({ setActiveTab, setShowDatasheet }) {
  const [showButtons, setShowButtons] = useState(false);
  const [valueCount, setValueCount] = useState(6);
  const [valveTypes, setValveTypes] = useState([]);
  const [operatingPressures, setOperatingPressures] = useState([]);
  const [alert, setAlert] = useState(null);
  const [selectedValveType, setSelectedValveType] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Utility functions
  const showAlert = useCallback((message, type = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculateSF = (apiValue, formValue) => {
    const apiNum = parseFloat(apiValue);
    const formNum = parseFloat(formValue);
    return formNum !== 0 ? (apiNum / formNum).toFixed(2) : "N/A";
  };

  // Auto-calculate torque values
  const autoCalculateTorqueValues = useCallback(
    (breakToOpenValue, valveType) => {
      if (!breakToOpenValue || !valveType) return;

      const baseValue = parseFloat(breakToOpenValue);
      if (isNaN(baseValue)) return;

      const ratios = VALVE_TORQUE_RATIOS[valveType.toLowerCase()];
      if (!ratios) return;

      const calculatedValues = Object.entries(ratios).reduce(
        (acc, [key, ratio]) => {
          acc[key] = Math.round(baseValue * ratio).toString();
          return acc;
        },
        {}
      );

      setFormData((prev) => ({ ...prev, ...calculatedValues }));
      showAlert(
        `Torque values auto-calculated for ${valveType} valve!`,
        "success"
      );
    },
    [showAlert]
  );

  // Handle valve type selection
  const handleValveTypeChange = useCallback(
    (valveType) => {
      setSelectedValveType(valveType);
      if (formData.breakToOpen?.trim()) {
        autoCalculateTorqueValues(formData.breakToOpen.trim(), valveType);
      }
    },
    [formData.breakToOpen, autoCalculateTorqueValues]
  );

  const handleBreakToOpenBlur = useCallback(() => {
    if (formData.breakToOpen?.trim() && selectedValveType) {
      autoCalculateTorqueValues(formData.breakToOpen.trim(), selectedValveType);
    }
  }, [formData.breakToOpen, selectedValveType, autoCalculateTorqueValues]);

  // API call for actuator selection
  const handleSelectActuator = useCallback(async () => {
    if (!ACTUATOR_PROXY_API) {
      showAlert("API endpoint not configured", "error");
      console.error("ACTUATOR_PROXY_API environment variable is not set");
      return;
    }

    if (!formData.supplyPressure || !selectedValveType || !formData.yokeType) {
      showAlert("Please fill all required fields", "error");
      return;
    }

    const requestData = {
      actuatorType:
        formData.actuatorType === "Spring Return" ? "Spring" : "Double",
      actuatorYokeType: formData.yokeType,
      operatingPressure: parseFloat(formData.supplyPressure),
      endCloseValue: parseFloat(formData.endToClose) || 0,
      failSafeValue: formData.failSafeAction.includes("Fail Close")
        ? "FailClose"
        : "FailOpen",
    };

    try {
      const response = await fetch(ACTUATOR_PROXY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to fetch actuator data");

      const data = await response.json();
      console.log("API Response:", data);

      // Fixed: Use correct property names from API response
      setFormData((prev) => ({
        ...prev,
        actuatorModel: data.actuatorName,
        pneumaticStart:
          data.pneumaticStart?.toString() ||
          data.pnuematicStart?.toString() ||
          "",
        pneumaticMin:
          data.pneumaticMid?.toString() || data.pnuematicMid?.toString() || "",
        pneumaticEnd:
          data.pneumaticEnd?.toString() || data.pnuematicEnd?.toString() || "",
        springStart: data.springStart?.toString() || "",
        springMin: data.springMid?.toString() || "",
        springEnd: data.springEnd?.toString() || "",
        actualSF: {
          pneumaticStart: calculateSF(
            data.pneumaticStart || data.pnuematicStart,
            prev.breakToOpen
          ),
          pneumaticMid: calculateSF(
            data.pneumaticMid || data.pnuematicMid,
            prev.runToOpen
          ),
          pneumaticEnd: calculateSF(
            data.pneumaticEnd || data.pnuematicEnd,
            prev.endToOpen
          ),
          springStart: calculateSF(data.springStart, prev.breakToClose),
          springMid: calculateSF(data.springMid, prev.runToClose),
          springEnd: calculateSF(data.springEnd, prev.endToClose),
        },
      }));

      showAlert("Actuator selected successfully!", "success");
      setShowButtons(true);
    } catch (error) {
      console.error("Error selecting actuator:", error);
      showAlert("Failed to select actuator", "error");
    }
  }, [formData, selectedValveType, showAlert]);

  const clearAllData = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedValveType("");
    setAlert(null);
    showAlert("All data cleared successfully!", "info");
  }, [showAlert]);

  const handleActuatorConfiguration = useCallback(() => {
    setActiveTab("S98Part");
    setShowDatasheet(true);
  }, [setActiveTab, setShowDatasheet]);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [valveTypesRes, operatingPressuresRes] = await Promise.all([
          fetch(GETALL_VALVETYPES),
          fetch(GETALL_OPERATINGPRESSURE),
        ]);

        if (!valveTypesRes.ok || !operatingPressuresRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [valveTypesData, operatingPressuresData] = await Promise.all([
          valveTypesRes.json(),
          operatingPressuresRes.json(),
        ]);

        setValveTypes(valveTypesData);
        setOperatingPressures(operatingPressuresData);
      } catch (error) {
        console.error("Error fetching data:", error);
        showAlert("Failed to load data", "error");
      }
    };

    fetchData();
  }, [showAlert]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 text-[12px] font-sans min-h-screen">
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
              <p className="font-bold text-[#08549c] text-[12px]">
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
      <div className="bg-white p-4 shadow-lg rounded-lg space-y-4 text-[#0D47A1] text-[12px]">
        <h2 className="font-bold">Actuator Selector</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="font-semibold block mb-2 text-[12px]">
                  Supply Pressure:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-[#d9d9d9] text-black px-2 py-1 rounded w-[100px]"
                    value={formData.supplyPressure}
                    onChange={(e) =>
                      updateFormData("supplyPressure", e.target.value)
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
              <div className="mt-6">
                <label className="font-semibold block mb-2 text-[#0D47A1] text-[12px]">
                  Actuator Type:
                </label>
                <RadioGroup
                  name="actuatorType"
                  value={formData.actuatorType}
                  onChange={(value) => updateFormData("actuatorType", value)}
                  options={[
                    { value: "Spring Return", label: "Spring Return" },
                    { value: "Double Acting", label: "Double Acting" },
                  ]}
                  className="flex flex-col text-black space-y-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 border border-gray-400 rounded p-3 w-fit">
              <label className="font-semibold text-[#0D47A1] text-[12px]">
                Yoke Type:
              </label>
              <RadioGroup
                name="yokeType"
                value={formData.yokeType}
                onChange={(value) => updateFormData("yokeType", value)}
                options={[
                  { value: "Preferred", label: "Preferred" },
                  { value: "Symmetric", label: "Symmetric" },
                  { value: "Canted", label: "Canted" },
                ]}
                className="flex space-x-4"
              />
            </div>
          </div>

          <div>
            <label className="font-bold block mb-2">Actuator Series:</label>
            <div className="flex flex-col text-black space-y-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="actuatorSeries" defaultChecked />
                S98 - Pneumatic Scotch Yoke Actuator
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
                    updateFormData("actuatorModel", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {formData.actuatorType === "Spring Return" ? (
            <FailSafeCondition
              formData={formData}
              handleFormFieldChange={updateFormData}
            />
          ) : (
            <div>
              <label className="font-bold block mb-2 text-[#0D47A1] text-[12px]">
                Actuator Configurator
              </label>
              <RadioGroup
                name="actuatorConfig"
                value={formData.actuatorConfig}
                onChange={(value) => updateFormData("actuatorConfig", value)}
                options={[
                  { value: "Single Cylinder", label: "Single Cylinder" },
                  { value: "Dual Cylinder", label: "Dual Cylinder" },
                ]}
                className="flex flex-col space-y-1 text-black text-[12px]"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <button
              className="bg-[#0D47A1] text-white px-6 py-2 rounded font-semibold hover:bg-[#5e4b91]"
              onClick={handleSelectActuator}
            >
              Select Actuator
            </button>
            {showButtons && (
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-[#0D47A1] text-white px-4 py-2 rounded font-semibold hover:bg-[#0d52a1]"
                  onClick={handleActuatorConfiguration}
                >
                  Actuator Configuration
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-bold block mb-2 text-[#8c001a]">PED</label>
            <div className="flex space-x-4 border border-gray-400 rounded px-3 py-2 text-black w-fit">
              <RadioGroup
                name="ped"
                value={formData.ped}
                onChange={(value) => updateFormData("ped", value)}
                options={[
                  { value: "Non PED", label: "Non PED" },
                  { value: "PED", label: "PED" },
                ]}
                className="flex space-x-4"
              />
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
                onChange={(e) => setValueCount(parseInt(e.target.value))}
                value={valueCount}
              >
                <option value={6}>6 Values</option>
                <option value={3}>3 Values</option>
              </select>
            </div>

            {TORQUE_LABELS.valve.slice(0, valueCount).map((label, i) => {
              const fieldKey = TORQUE_FIELD_MAPPING[label];
              return (
                <div key={i} className="mb-3">
                  {/* adds vertical space below each field */}
                  <InputField
                    label={label}
                    unit="Nm"
                    onBlur={
                      label === "Break to Open"
                        ? handleBreakToOpenBlur
                        : undefined
                    }
                    value={formData[fieldKey]}
                    onChange={(e) => updateFormData(fieldKey, e.target.value)}
                    className="w-24 h-7 bg-gray-200 rounded border-none ml-[1px]"
                  />
                </div>
              );
            })}
            <div className="mt-2 text-sm text-gray-500">(Seating)</div>
          </div>

          <div>
            <div className="text-[#08549c] font-semibold mb-5">
              Actuator Torques
            </div>
            {TORQUE_LABELS.actuator.slice(0, valueCount).map((label, i) => {
              const fieldKey = TORQUE_FIELD_MAPPING[label];
              return (
                <InputField
                  key={i}
                  label={label}
                  unit="Nm"
                  value={formData[fieldKey]}
                  onChange={(e) => updateFormData(fieldKey, e.target.value)}
                />
              );
            })}
          </div>

          <div>
            <div className="text-[#08549c] font-semibold mb-5">Actual S.F</div>
            {[
              "pneumaticStart",
              "pneumaticMid",
              "pneumaticEnd",
              "springStart",
              "springMid",
              "springEnd",
            ]
              .slice(0, valueCount)
              .map((field, i) => (
                <div key={i} className="mb-3">
                  <input
                    type="text"
                    className="w-24 h-7 bg-gray-200 rounded border border-gray-300"
                    value={formData.actualSF[field] || ""}
                    readOnly
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
