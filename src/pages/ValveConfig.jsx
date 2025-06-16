import React, { useState } from 'react';

const ValveConfigInterface = () => {
  const [selectedOrientation, setSelectedOrientation] = useState('1H1');
  const [selectedOption, setSelectedOption] = useState('Kit');
  const [formData, setFormData] = useState({
    series: '98',
    actuatorSize: '10F4',
    boreSize: '7.0',
    cylinderSize: '32"',
    springSize: 'Spring 1',
    baseCode: '213',
    action: 'Spring Return, Fail CW',
    mountingYoke: 'ISO / Canted',
    ports: '',
    standardOptions: 'None',
    designCode: 'Standard Pneumatic',
    material: 'Standard',
    tempTrim: 'Standard (-29 degC to 93 degC)',
    coatings: 'Standard'
  });

  const [valveInfo, setValveInfo] = useState({
    valveType: 'Butterfly',
    brandMake: '',
    valveSize: '',
    additionalInfo: '-',
    differentialPressure: '',
    stemMaterial: '',
    requiredSafetyFactor: '1.25',
    stemDiameter: '',
    mountingFlange: '',
    mountingKit: 'VMC',
    supplyPressure: '3.5'
  });

  const [torqueData] = useState({
    breakToOpen: { value: '10000', unit: 'Nm', pneumaticStart: '40215', actualSF: '4.02' },
    runToOpen: { value: '9000', unit: 'Nm', pneumaticMin: '15168', actualSF: '1.69' },
    endToOpen: { value: '9000', unit: 'Nm', pneumaticEnd: '19647', actualSF: '3.39' },
    breakToClose: { value: '4000', unit: 'Nm', springStart: '29925', actualSF: '7.48' },
    runToClose: { value: '2999', unit: 'Nm', springMin: '17054', actualSF: '5.69' },
    endToClose: { value: '4000', unit: 'Nm', springEnd: '30627', actualSF: '7.66' }
  });

  const handleInputChange = (section, field, value) => {
    if (section === 'form') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'valve') {
      setValveInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Left Panel - Configuration Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-2">
              {/* Series */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Series</label>
                <input
                  type="text"
                  value={formData.series}
                  onChange={(e) => handleInputChange('form', 'series', e.target.value)}
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center font-medium"
                />
              </div>

              {/* Actuator Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Actuator Size</label>
                <input
                  type="text"
                  value={formData.actuatorSize}
                  onChange={(e) => handleInputChange('form', 'actuatorSize', e.target.value)}
                  className="w-20 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center"
                />
                <span className="text-sm text-gray-600">J</span>
              </div>

              {/* Bore Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Bore Size</label>
                <input
                  type="text"
                  value={formData.boreSize}
                  onChange={(e) => handleInputChange('form', 'boreSize', e.target.value)}
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center"
                />
                <span className="text-sm text-gray-600">1</span>
              </div>

              {/* Cylinder Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Cylinder Size</label>
                <select
                  value={formData.cylinderSize}
                  onChange={(e) => handleInputChange('form', 'cylinderSize', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded"
                >
                  <option>32"</option>
                  <option>24"</option>
                  <option>16"</option>
                </select>
                <span className="text-sm text-gray-600">S</span>
                <span className="text-sm text-gray-600">MOP</span>
                <input
                  type="text"
                  value="6"
                  className="w-12 px-2 py-1 bg-gray-200 border border-gray-300 rounded text-center"
                  readOnly
                />
                <span className="text-sm text-gray-600">bar</span>
              </div>

              {/* Spring Size */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Spring Size</label>
                <select
                  value={formData.springSize}
                  onChange={(e) => handleInputChange('form', 'springSize', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Spring 1</option>
                  <option>Spring 2</option>
                  <option>Spring 3</option>
                </select>
                <span className="text-sm text-gray-600">1</span>
              </div>

              {/* Base Code */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Base Code</label>
                <input
                  type="text"
                  value={formData.baseCode}
                  onChange={(e) => handleInputChange('form', 'baseCode', e.target.value)}
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center"
                />
              </div>

              {/* Action */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Action</label>
                <select
                  value={formData.action}
                  onChange={(e) => handleInputChange('form', 'action', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Spring Return, Fail CW</option>
                  <option>Spring Return, Fail CCW</option>
                  <option>Double Acting</option>
                </select>
                <span className="text-sm text-gray-600">C</span>
              </div>

              {/* Mounting/Yoke */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Mounting/Yoke</label>
                <select
                  value={formData.mountingYoke}
                  onChange={(e) => handleInputChange('form', 'mountingYoke', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>ISO / Canted</option>
                  <option>NAMUR</option>
                  <option>Direct Mount</option>
                </select>
                <span className="text-sm text-gray-600">2</span>
              </div>

              {/* Ports */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Ports</label>
                <select
                  value={formData.ports}
                  onChange={(e) => handleInputChange('form', 'ports', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option value="">Select...</option>
                  <option>1/4 NPT</option>
                  <option>1/2 NPT</option>
                </select>
                <span className="text-sm text-gray-600">*</span>
              </div>

              {/* Standard Options */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Standard Options</label>
                <select
                  value={formData.standardOptions}
                  onChange={(e) => handleInputChange('form', 'standardOptions', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>None</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <span className="text-sm text-gray-600">N</span>
              </div>

              {/* Design Code */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Design Code</label>
                <select
                  value={formData.designCode}
                  onChange={(e) => handleInputChange('form', 'designCode', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Standard Pneumatic</option>
                  <option>ASME</option>
                  <option>API</option>
                </select>
                <span className="text-sm text-gray-600">00</span>
              </div>

              {/* Material */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Material</label>
                <select
                  value={formData.material}
                  onChange={(e) => handleInputChange('form', 'material', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Standard</option>
                  <option>Stainless Steel</option>
                  <option>Carbon Steel</option>
                </select>
                <span className="text-sm text-gray-600">0</span>
              </div>

              {/* Temp Trim */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Temp Trim</label>
                <select
                  value={formData.tempTrim}
                  onChange={(e) => handleInputChange('form', 'tempTrim', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Standard (-29 degC to 93 degC)</option>
                  <option>High Temp</option>
                  <option>Low Temp</option>
                </select>
                <span className="text-sm text-gray-600">S</span>
              </div>

              {/* Coatings */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Coatings</label>
                <select
                  value={formData.coatings}
                  onChange={(e) => handleInputChange('form', 'coatings', e.target.value)}
                  className="px-2 py-1 bg-blue-100 border border-gray-300 rounded flex-1"
                >
                  <option>Standard</option>
                  <option>Epoxy</option>
                  <option>Zinc</option>
                </select>
                <span className="text-sm text-gray-600">0</span>
              </div>

              {/* Orientation */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Orientation</label>
                <input
                  type="text"
                  value={selectedOrientation}
                  onChange={(e) => setSelectedOrientation(e.target.value)}
                  className="w-16 px-2 py-1 bg-blue-100 border border-gray-300 rounded text-center"
                />
                <button className="px-4 py-1 bg-red-600 text-white rounded font-medium">
                  Orientation
                </button>
              </div>

              {/* Options */}
              <div className="flex items-center gap-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Kit"
                      checked={selectedOption === 'Kit'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Kit</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Seal"
                      checked={selectedOption === 'Seal'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Seal</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value="Repair"
                      checked={selectedOption === 'Repair'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Repair</span>
                  </label>
                </div>
              </div>

              {/* Part Number */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-red-600 mb-2">Part Number</h3>
                <div className="text-2xl font-bold text-gray-800">
                  98J1S1-213C2*N000S0
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Valve Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Valve Information</h2>
            
            <div className="space-y-2">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand /Make</label>
                  <input
                    type="text"
                    value={valveInfo.brandMake}
                    onChange={(e) => handleInputChange('valve', 'brandMake', e.target.value)}
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valve Type</label>
                  <input
                    type="text"
                    value={valveInfo.valveType}
                    onChange={(e) => handleInputChange('valve', 'valveType', e.target.value)}
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valve Size</label>
                  <input
                    type="text"
                    value={valveInfo.valveSize}
                    onChange={(e) => handleInputChange('valve', 'valveSize', e.target.value)}
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Series/Model</label>
                  <input
                    type="text"
                    className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <input
                  type="text"
                  value={valveInfo.additionalInfo}
                  onChange={(e) => handleInputChange('valve', 'additionalInfo', e.target.value)}
                  className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Differential Pressure</label>
                  <input
                    type="text"
                    value={valveInfo.differentialPressure}
                    onChange={(e) => handleInputChange('valve', 'differentialPressure', e.target.value)}
                    className="w-full px-2 py-1 bg-yellow-100 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MAST Value</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 px-2 py-1 bg-gray-200 border border-gray-300 rounded-l"
                      readOnly
                    />
                    <span className="px-2 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-sm">Nm</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stem Material</label>
                <input
                  type="text"
                  value={valveInfo.stemMaterial}
                  onChange={(e) => handleInputChange('valve', 'stemMaterial', e.target.value)}
                  className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">Required Safety Factor</label>
                  <input
                    type="text"
                    value={valveInfo.requiredSafetyFactor}
                    onChange={(e) => handleInputChange('valve', 'requiredSafetyFactor', e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mounting flange</label>
                  <input
                    type="text"
                    value={valveInfo.mountingFlange}
                    onChange={(e) => handleInputChange('valve', 'mountingFlange', e.target.value)}
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">Stem Diameter</label>
                  <div className="flex gap-2">
                    <label className="flex items-center">
                      <input type="radio" name="unit" className="mr-1" />
                      <span className="text-sm">Inch</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="unit" defaultChecked className="mr-1" />
                      <span className="text-sm">Metric</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VMC:</label>
                  <input
                    type="text"
                    value={valveInfo.mountingKit}
                    onChange={(e) => handleInputChange('valve', 'mountingKit', e.target.value)}
                    className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mounting Kit</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded"
                  readOnly
                />
              </div>

              <div className="text-red-600 font-medium">Important Note</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supply Pressure</label>
                <div className="flex">
                  <input
                    type="text"
                    value={valveInfo.supplyPressure}
                    onChange={(e) => handleInputChange('valve', 'supplyPressure', e.target.value)}
                    className="w-20 px-2 py-1 bg-gray-200 border border-gray-300 rounded-l text-center"
                  />
                  <span className="px-2 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-sm">bar</span>
                </div>
              </div>

              {/* Torque Tables */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-red-600 font-medium">Valve Torques</h3>
                  <h3 className="text-red-600 font-medium">Actuator Torques</h3>
                  <h3 className="text-red-600 font-medium">Actual S.F</h3>
                </div>

                <div className="space-y-2">
                  {Object.entries(torqueData).map(([key, data]) => (
                    <div key={key} className="grid grid-cols-6 gap-2 items-center text-sm">
                      <div className="capitalize text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                      <div className="text-center">
                        <span className="text-blue-600">{data.value}</span>
                      </div>
                      <div className="text-center text-gray-600">{data.unit}</div>
                      <div className="text-center">{data.pneumaticStart || data.springStart}</div>
                      <div className="text-center text-gray-600">{data.unit}</div>
                      <div className="text-center font-medium">{data.actualSF}</div>
                    </div>
                  ))}
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