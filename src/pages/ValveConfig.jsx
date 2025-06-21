import React, { useState } from "react";

const ValveConfigInterface = () => {
  const [selectedOrientation, setSelectedOrientation] = useState("1H1");
  const [selectedOption, setSelectedOption] = useState("Kit");
  const [formData, setFormData] = useState({
    series: "98",
    actuatorSize: "14E3",
    boreSize: "3.5",
    cylinderSize: '16"',
    springSize: "Spring 1",
    baseCode: "213",
    action: "Spring Return, Fail CW",
    mountingYoke: "ISO / Canted",
    ports: "",
    standardOptions: "None",
    designCode: "Standard Pneumatic",
    material: "Standard",
    tempTrim: "Standard (-29 degC to 93 degC)",
    coatings: "Standard",
  });

  const [valveInfo, setValveInfo] = useState({
    valveType: "Ball",
    brandMake: "",
    valveSize: "",
    additionalInfo: "-",
    differentialPressure: "",
    stemMaterial: "",
    requiredSafetyFactor: "1.25",
    stemDiameter: "",
    mountingFlange: "",
    mountingKit: "VMC",
    supplyPressure: "3.4",
  });

  const [torqueData] = useState({
    breakToOpen: { valve: "844", pneumatic: "4342", actualSF: "5.14" },
    runToOpen: { valve: "555", pneumatic: "1523", actualSF: "2.74" },
    endToOpen: { valve: "5000", pneumatic: "1914", actualSF: "0.38" },
    breakToClose: { valve: "10000", spring: "4087", actualSF: "0.41" },
    runToClose: { valve: "2999", spring: "2317", actualSF: "0.77" },
    endToClose: { valve: "1205", spring: "4230", actualSF: "3.51" },
  });

  const handleInputChange = (section, field, value) => {
    if (section === "form") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else if (section === "valve") {
      setValveInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Panel - Configuration Form */}
          <div className="bg-white rounded-lg shadow-lg  p-4">
            <div className="space-y-3">
              {/* Series */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Series
                </label>
                <input
                  type="text"
                  value={formData.series}
                  onChange={(e) =>
                    handleInputChange("form", "series", e.target.value)
                  }
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center text-xs"
                />
              </div>

              {/* Actuator Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Actuator Size
                </label>
                <input
                  type="text"
                  value={formData.actuatorSize}
                  onChange={(e) =>
                    handleInputChange("form", "actuatorSize", e.target.value)
                  }
                  className="w-20 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center text-xs"
                />
                <span className="text-xs text-gray-600">F</span>
              </div>

              {/* Bore Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Bore Size
                </label>
                <input
                  type="text"
                  value={formData.boreSize}
                  onChange={(e) =>
                    handleInputChange("form", "boreSize", e.target.value)
                  }
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center text-xs"
                />
                <span className="text-xs text-gray-600">1</span>
              </div>

              {/* Cylinder Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Cylinder Size
                </label>
                <select
                  value={formData.cylinderSize}
                  onChange={(e) =>
                    handleInputChange("form", "cylinderSize", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded text-xs"
                >
                  <option>16"</option>
                  <option>24"</option>
                  <option>32"</option>
                </select>
                <span className="text-xs text-gray-600">L</span>
                <span className="text-xs text-gray-600">MOP</span>
                <input
                  type="text"
                  value="7"
                  className="w-12 px-2 py-1 bg-gray-200 border border-gray-300 rounded text-center text-xs"
                  readOnly
                />
                <span className="text-xs text-gray-600">bar</span>
              </div>

              {/* Spring Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Spring Size
                </label>
                <select
                  value={formData.springSize}
                  onChange={(e) =>
                    handleInputChange("form", "springSize", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Spring 1</option>
                  <option>Spring 2</option>
                  <option>Spring 3</option>
                </select>
                <span className="text-xs text-gray-600">1</span>
              </div>

              {/* Base Code */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Base Code
                </label>
                <input
                  type="text"
                  value={formData.baseCode}
                  onChange={(e) =>
                    handleInputChange("form", "baseCode", e.target.value)
                  }
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center text-xs"
                />
              </div>

              {/* Action */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Action
                </label>
                <select
                  value={formData.action}
                  onChange={(e) =>
                    handleInputChange("form", "action", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Spring Return, Fail CW</option>
                  <option>Spring Return, Fail CCW</option>
                  <option>Double Acting</option>
                </select>
                <span className="text-xs text-gray-600">C</span>
              </div>

              {/* Mounting/Yoke */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Mounting/Yoke
                </label>
                <select
                  value={formData.mountingYoke}
                  onChange={(e) =>
                    handleInputChange("form", "mountingYoke", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>ISO / Canted</option>
                  <option>NAMUR</option>
                  <option>Direct Mount</option>
                </select>
                <span className="text-xs text-gray-600">2</span>
              </div>

              {/* Ports */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Ports
                </label>
                <select
                  value={formData.ports}
                  onChange={(e) =>
                    handleInputChange("form", "ports", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option value="">Select...</option>
                  <option>1/4 NPT</option>
                  <option>1/2 NPT</option>
                </select>
                <span className="text-xs text-gray-600">*</span>
                <button className="px-3 py-1 bg-gray-200 border border-gray-300 rounded text-xs"></button>
              </div>

              {/* Standard Options */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Standard Options
                </label>
                <select
                  value={formData.standardOptions}
                  onChange={(e) =>
                    handleInputChange("form", "standardOptions", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>None</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <span className="text-xs text-gray-600">N</span>
              </div>

              {/* Design Code */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Design Code
                </label>
                <select
                  value={formData.designCode}
                  onChange={(e) =>
                    handleInputChange("form", "designCode", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Standard Pneumatic</option>
                  <option>ASME</option>
                  <option>API</option>
                </select>
                <span className="text-xs text-gray-600">00</span>
              </div>

              {/* Material */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Material
                </label>
                <select
                  value={formData.material}
                  onChange={(e) =>
                    handleInputChange("form", "material", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Standard</option>
                  <option>Stainless Steel</option>
                  <option>Carbon Steel</option>
                </select>
                <span className="text-xs text-gray-600">0</span>
              </div>

              {/* Temp Trim */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Temp Trim
                </label>
                <select
                  value={formData.tempTrim}
                  onChange={(e) =>
                    handleInputChange("form", "tempTrim", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Standard (-29 degC to 93 degC)</option>
                  <option>High Temp</option>
                  <option>Low Temp</option>
                </select>
                <span className="text-xs text-gray-600">S</span>
              </div>

              {/* Coatings */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Coatings
                </label>
                <select
                  value={formData.coatings}
                  onChange={(e) =>
                    handleInputChange("form", "coatings", e.target.value)
                  }
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1 text-xs"
                >
                  <option>Standard</option>
                  <option>Epoxy</option>
                  <option>Zinc</option>
                </select>
                <span className="text-xs text-gray-600">0</span>
              </div>

              {/* Orientation */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-xs font-medium text-gray-700">
                  Orientation
                </label>
                <input
                  type="text"
                  value={selectedOrientation}
                  onChange={(e) => setSelectedOrientation(e.target.value)}
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center text-xs"
                />
                <button className="px-4 py-1 bg-[#0D47A1] text-white rounded font-medium text-xs">
                  Orientation
                </button>
              </div>

              {/* Options */}
              <div className="flex items-center gap-4">
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Kit"
                      checked={selectedOption === "Kit"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-xs">Kit</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Seal"
                      checked={selectedOption === "Seal"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-xs">Seal</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Repair"
                      checked={selectedOption === "Repair"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-xs">Repair</span>
                  </label>
                </div>
              </div>

              {/* Part Number */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-xs font-medium text-[#0D47A1] mb-2">
                  Part Number
                </h3>
                <div className="text-xl font-bold text-gray-800">
                  98F1L1-213C2*N000S0
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Valve Information */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xs font-semibold text-[#0D47A1] mb-4">
              Valve Information
            </h2>

            <div className="space-y-3">
              {/* Basic Info Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Brand /Make
                  </label>
                  <input
                    type="text"
                    value={valveInfo.brandMake}
                    onChange={(e) =>
                      handleInputChange("valve", "brandMake", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Valve Type
                  </label>
                  <input
                    type="text"
                    value={valveInfo.valveType}
                    onChange={(e) =>
                      handleInputChange("valve", "valveType", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>

              {/* Basic Info Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Valve Size
                  </label>
                  <input
                    type="text"
                    value={valveInfo.valveSize}
                    onChange={(e) =>
                      handleInputChange("valve", "valveSize", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Series/Model
                  </label>
                  <input
                    type="text"
                    className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs"
                    readOnly
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <input
                  type="text"
                  value={valveInfo.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("valve", "additionalInfo", e.target.value)
                  }
                  className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded text-xs"
                />
              </div>

              {/* Differential Pressure & MAST Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Differential Pressure
                  </label>
                  <input
                    type="text"
                    value={valveInfo.differentialPressure}
                    onChange={(e) =>
                      handleInputChange(
                        "valve",
                        "differentialPressure",
                        e.target.value
                      )
                    }
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    MAST Value
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 px-2 py-1 bg-gray-200 border border-gray-300 rounded-l text-xs"
                      readOnly
                    />
                    <span className="px-2 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-xs">
                      Nm
                    </span>
                  </div>
                </div>
              </div>

              {/* Stem Material */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Stem Material
                </label>
                <input
                  type="text"
                  value={valveInfo.stemMaterial}
                  onChange={(e) =>
                    handleInputChange("valve", "stemMaterial", e.target.value)
                  }
                  className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                />
              </div>

              {/* Required Safety Factor & Mounting Flange */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-blue-600 mb-1">
                    Required Safety Factor
                  </label>
                  <input
                    type="text"
                    value={valveInfo.requiredSafetyFactor}
                    onChange={(e) =>
                      handleInputChange(
                        "valve",
                        "requiredSafetyFactor",
                        e.target.value
                      )
                    }
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mounting Flange
                  </label>
                  <input
                    type="text"
                    value={valveInfo.mountingFlange}
                    onChange={(e) =>
                      handleInputChange(
                        "valve",
                        "mountingFlange",
                        e.target.value
                      )
                    }
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>

              {/* Stem Diameter & VMC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-blue-600 mb-1">
                    Stem Diameter
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input type="radio" name="unit" className="mr-1" />
                      <span className="text-xs">Inch</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="unit"
                        defaultChecked
                        className="mr-1"
                      />
                      <span className="text-xs">Metric</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={valveInfo.stemDiameter}
                    onChange={(e) =>
                      handleInputChange("valve", "stemDiameter", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    VMC:
                  </label>
                  <input
                    type="text"
                    value={valveInfo.mountingKit}
                    onChange={(e) =>
                      handleInputChange("valve", "mountingKit", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>

              {/* Mounting Kit */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mounting Kit
                </label>
                <input
                  type="text"
                  className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs"
                  readOnly
                />
              </div>

              {/* Important Note */}
              <div className="text-red-600 font-medium text-xs">
                Important Note
              </div>

              {/* Supply Pressure */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Supply Pressure
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={valveInfo.supplyPressure}
                    onChange={(e) =>
                      handleInputChange(
                        "valve",
                        "supplyPressure",
                        e.target.value
                      )
                    }
                    className="w-20 px-2 py-1 bg-gray-200 border border-gray-300 rounded-l text-center text-xs"
                  />
                  <span className="px-2 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-xs">
                    bar
                  </span>
                </div>
              </div>

              {/* Torque Tables */}
              <div className="mt-6">
                <div className="grid grid-cols-6  mb-3">
                  <div className="text-[#0D47A1] font-medium text-xs">
                    Valve Torques
                  </div>
                  <div className="text-center text-xs text-blue-600">
                    6 Values
                  </div>
                  <div></div>
                  <div className="text-[#0D47A1] font-medium text-xs">
                    Actuator Torques
                  </div>
                  <div></div>
                  <div className="text-[#0D47A1] font-medium text-xs">
                    Actual S.F
                  </div>
                </div>

                <div className="space-y-1">
                  {Object.entries(torqueData).map(([key, data]) => {
                    const label = key.replace(/([A-Z])/g, " $1").toLowerCase();
                    const torqueType = key.includes("Close")
                      ? "spring"
                      : "pneumatic";
                    const torqueLabel =
                      torqueType === "spring"
                        ? key === "breakToClose"
                          ? "Spring Start:"
                          : key === "runToClose"
                          ? "Spring Min:"
                          : "Spring End:"
                        : key === "breakToOpen"
                        ? "Pneumatic Start:"
                        : key === "runToOpen"
                        ? "Pneumatic Min:"
                        : "Pneumatic End:";

                    return (
                      <div
                        key={key}
                        className="grid grid-cols-7 items-center text-xs"
                      >
                        <div className="capitalize text-gray-700">{label}</div>
                        <div className="text-center text-blue-600">
                          {data.valve}
                        </div>
                        <div className="text-center text-gray-600">Nm</div>
                        <div className="text-center">{torqueLabel}</div>
                        <div className="text-center">{data[torqueType]}</div>
                        <div className="text-center text-gray-600">Nm</div>
                        <div key={key} className="text-center">
                          {data.actualSF}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValveConfigInterface;
