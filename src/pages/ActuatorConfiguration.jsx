import React from "react";

export default function Configuration() {
  return (
    <div className="h-[700px] bg-[#f6f7fa] p-4 flex flex-col items-center">
      <div className="flex flex-row gap-5 w-full max-w-[1350px] justify-end ">
        {/* Left Card */}
        <div className="bg-white rounded-[16px] shadow p-5 flex-1 max-w-[420px] h-[630px] ">
          <div className="grid grid-cols-3 gap-x-2 gap-y-2 text-[12px]">
            {[
              "Series",
              "Actuator Size",
              "Bore Size",
              "Cylinder Size",
              "Spring Size",
              "Base Code",
              "Action",
              "Mounting/Yoke",
              "Ports",
              "Standard Options",
              "Design Code",
              "Material",
              "Temp Trim",
              "Coatings",
              "Orientation",
            ].map((label) => (
              <React.Fragment key={label}>
                <label className="col-span-1 text-[#08549c] whitespace-nowrap">
                  {label}
                </label>
                <input
                  className="col-span-2 bg-gray-100 rounded px-1 py-[2px] h-6 min-w-0"
                  style={{ fontSize: "12px" }}
                  readOnly
                />
              </React.Fragment>
            ))}
            <div className="col-span-3 flex gap-2 mt-1 flex-wrap items-center">
              <button className="px-2 py-1 rounded text-white bg-[#08549c] whitespace-nowrap text-[12px] h-7">
                Orientation
              </button>
              <div className="flex items-center gap-2 ml-3 flex-wrap">
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input type="checkbox" />
                  <span className="text-[#08549c]">Kit</span>
                </label>
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="kit" />
                  <span className="text-[#08549c]">Seal</span>
                </label>
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="kit" />
                  <span className="text-[#08549c]">Repair</span>
                </label>
              </div>
            </div>
          </div>
          {/* Part Number */}
          <div className="mt-4">
  <span className="font-bold text-[#08549c] text-[12px]">
    Part Number
  </span>
  <input
    type="text"
    className="block mt-1 bg-gray-100 rounded px-1 py-[2px] w-[160px] h-6 text-[#08549c] font-bold"
    style={{ fontSize: "12px" }}
    readOnly
  />
</div>
        </div>
        {/* Right Card */}
        <div className="bg-white rounded-[16px] shadow p-5 flex-1 max-w-[800px] h-[630px] mr-[50px] ">
          {/* Valve Info */}
          <div className=" rounded-xl p-4 max-w-5xl mx-auto mt-[-15px]">
            {/* Valve Information */}
            <div className="font-bold text-[#08549c] mb-3 text-[12px]">
              Valve Information
            </div>
            <div className="grid grid-cols-6 gap-x-3 gap-y-2 text-[12px] items-center">
              {/* Valve Type */}
              <label className="text-[#08549c] col-span-1 whitespace-nowrap">
                Valve Type
              </label>
              <input
                className="bg-gray-100 rounded px-1 py-[2px] col-span-2 h-6 min-w-0"
                style={{ fontSize: "12px" }}
                readOnly
              />
              <div className="col-span-1"></div>
              {/* Additional Information */}
              <label className="col-span-1 whitespace-nowrap text-[#08549c] ml-[-15px]">
                Additional Information
              </label>
              <input
                className="bg-gray-100 rounded px-1 py-[2px] col-span-1 h-6 min-w-0"
                style={{ fontSize: "12px" }}
                readOnly
              />

              {/* Mast Value */}
              <label className="text-[#08549c] col-span-1 whitespace-nowrap">
                Mast Value
              </label>
              <div className="flex items-center col-span-2">
                <input
                  className="bg-gray-100 rounded px-1 py-[2px] h-6 min-w-0 mr-2"
                  style={{ fontSize: "12px", width: "100%" }}
                  readOnly
                />
                <span className="ml-1 text-gray-700 text-[12px]">Nm</span>
              </div>
              <div className="col-span-1"></div>
              {/* Required SF */}
              <label className="col-span-1 whitespace-nowrap text-[#08549c] ml-[-15px]">
                Required SF
              </label>
              <input
                className="bg-gray-100 rounded px-1 py-[2px] col-span-1 h-6 min-w-0"
                style={{ fontSize: "12px" }}
                readOnly
              />

              {/* Stem Diameter */}
              <label className="text-[#08549c] col-span-1 whitespace-nowrap">
                Stem Diameter
              </label>
              <div className="flex gap-2 col-span-2 items-center">
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="unit" />
                  <span className="text-[#08549c] text-[12px]">Inch</span>
                </label>
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="unit" defaultChecked />
                  <span className="text-[#08549c] text-[12px]">Metric</span>
                </label>
                <input
                  className="bg-gray-100 rounded px-1 py-[2px] h-6 min-w-0 ml-2"
                  style={{ fontSize: "12px", width: "80px" }}
                  readOnly
                />
              </div>
              <div className="col-span-1"></div>
              {/* Mounting Flange */}
              <label className="whitespace-nowrap text-[#08549c] ml-[-15px]">
                Mounting Flange
              </label>
              <input
                className="bg-gray-100 rounded px-1 py-[2px] col-span-1 h-6 min-w-0"
                style={{ fontSize: "12px" }}
                readOnly
              />

              {/* Mounting Kit */}
              <label className="col-span-1 whitespace-nowrap">
                Mounting Kit:
              </label>
              <div className="col-span-2"></div>
              {/* VMC */}
              <label className="col-span-1 whitespace-nowrap ml-[110px]">
                VMC:
              </label>
              <div className="col-span-2"></div>
            </div>
            {/* Important Note */}
            <div className="mt-6 flex flex-row items-center flex-wrap">
              <span className="font-bold text-[#08549c] mr-2 text-[12px]">
                Important Note
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#08549c] text-[12px]">
                Supply Pressure
              </span>
              <input
                readOnly
                className="bg-gray-100 px-1 py-[2px] rounded w-[80px] h-6 min-w-0 mx-2"
                style={{ fontSize: "12px" }}
              />
              <span className="text-[#08549c] text-[12px]">bar</span>
            </div>
          </div>
          {/* Torques Section */}
          <div className="grid grid-cols-3 gap-x-5 mt-3">
            {/* Valve Torques */}
            <div className="ml-[20px]">
              <div className="flex items-center mb-1">
                <div className="font-bold text-[#08549c] whitespace-nowrap text-[12px]">
                  Valve Torques
                </div>
                <button className="bg-gray-200 text-[#08549c] px-2 py-1 rounded text-xs whitespace-nowrap text-[12px] h-6 ml-[20px]">
                  6 Values
                </button>
              </div>
              <div className="flex flex-col gap-1 mt-[13px] ">
                {[
                  "Break to Open",
                  "Run to Open",
                  "End to Open",
                  "Break to Close",
                  "Run to Close",
                  "End to Close",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="w-[80px] text-[#08549c] text-[12px]">
                      {label}
                    </span>
                    <input
                      className="bg-gray-100 px-1 py-[2px] rounded w-[60px] h-6 min-w-0 ml-[16px]"
                      style={{ fontSize: "12px" }}
                      readOnly
                    />
                    <span className="ml-1 text-[#08549c] text-xs text-[12px]">
                      Nm
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Actuator Torques */}
            <div className="ml-[30px]">
              <div className="font-bold text-[#08549c] mb-1 whitespace-nowrap text-[12px]">
                Actuator Torques
              </div>
              <div className="flex flex-col gap-1 mt-[13px]">
                {[
                  "Pneumatic Start",
                  "Pneumatic Min",
                  "Pneumatic End",
                  "Spring Start",
                  "Spring Min",
                  "Spring End",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="w-[90px] text-[#08549c] text-[12px]">
                      {label}:
                    </span>
                    <input
                      className="bg-gray-100 px-1 py-[2px] rounded w-[60px] h-6 min-w-0"
                      style={{ fontSize: "12px" }}
                      readOnly
                    />
                    <span className="ml-1 text-[#08549c] text-xs text-[12px]">
                      Nm
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Actual S.F. */}
            <div className="ml-[30px]">
              <div className="font-bold text-[#08549c] mb-1 whitespace-nowrap text-[12px]">
                Actual S.F.
              </div>
              <div className="flex flex-col gap-1 mt-[13px]">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 whitespace-nowrap "
                  >
                    <input
                      className="bg-gray-100 px-1 py-[2px] rounded w-[40px] h-6 min-w-0 "
                      style={{ fontSize: "12px" }}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
