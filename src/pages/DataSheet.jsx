import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import DatasheetPDFGenerator from "../hooks/PdfConvert";

function DataSheet() {
  const pdfExportRef = useRef();

  const generatePrecisePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set default font
    doc.setFont("helvetica");
    doc.setFontSize(10);

    // Header Section
    doc.setTextColor(220, 38, 38); // Bray red
    doc.setFontSize(16);
    doc.text("Bray", 15, 15);

    doc.setFontSize(12);
    doc.text("Actuator Sizing Data", 30, 15);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Version 4.8.3`, 15, 22);
    doc.text("Doc.Gen. Date: 16/6/2025", 140, 22);

    // Customer Info Table
    const startY = 30;
    const col1 = 15;
    const col2 = 50;
    const col3 = 85;
    const col4 = 120;

    // Table borders
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.rect(col1, startY, 180, 40);

    // Horizontal lines
    for (let y = startY + 10; y <= startY + 30; y += 10) {
      doc.line(col1, y, col1 + 180, y);
    }

    // Vertical lines
    doc.line(col2, startY, col2, startY + 40);
    doc.line(col3, startY, col3, startY + 40);
    doc.line(col4, startY, col4, startY + 40);

    // Header cells
    doc.setFillColor(240, 240, 240);
    doc.rect(col1, startY, col2 - col1, 10, "F");
    doc.text("Customer", col1 + 2, startY + 7);

    doc.rect(col2, startY, col3 - col2, 10, "F");
    doc.text("Item # / Tag #", col2 + 2, startY + 7);

    // Fill data
    doc.text("980112-213C2*N08050", col3 + 2, startY + 27);

    // Valve Information Section
    const valveStartY = startY + 50;
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(12);
    doc.text("Valve related Information:", col1, valveStartY);

    // Valve table implementation...
    // Continue building the PDF document section by section
    // matching your exact UI layout

    doc.save("actuator-specification.pdf");
  };

  // Usage example:
  const sampleData = {
    brand: "Bray",
    version: "4.8.3",
    docGenDate: "16/6/2025",
    partNumber: "988112-2132*N88050",
    createdBy: "Public",
    valve: {
      brand: "",
      type: "Ball",
      size: "mm",
      series: "",
      additionalInfo: "-",
      differentialPressure: "bar",
      mountingRange: "F16",
      stemDiameter: "Inch",
      vmc: "",
      stemMaterial: "",
    },
    actuator: {
      series: "S98",
      size: "4SE2",
      model: "4SE2-12-SR2-C",
      boreSize: "1.969 Inch",
      cylinderSize: "12 Inch",
      springSize: "Spring 2",
      supplyCode: "213",
      action: "Spring Return, Fail CW",
      mounting: "ISO / Canted",
      ports: "Single NPT (Standard)",
    },
    supplyPressure: "3.8 bar",
    maxOperatingPressure: "6 bar",
    safetyFactor: "1.25",
  };

  const data = {
    header: {
      version: "4.8.3",
      docRef: "Doc.Gen. Date: 16/6/2025",
      customer: "",
      enquiryRef: "",
      requestedDate: "",
      actuatorPartNumber: "98D1J2-213C2*N00050",
      itemTag: "",
      quotationNumber: "",
      createdBy: "Public",
    },
    valveInfo: {
      "Brand / Make": "",
      "Valve Type": "Ball",
      "Valve Size": "mm",
      "Series / Model": "",
      "Additional Information": "-",
      "Differential Pressure": "bar",
      "Mounting Flange": "F16",
      "Stem Diameter": "Inch",
      VMC: "",
      "Stem Material": "",
      "MAST Value": "Nm",
    },
    actuatorSpec: {
      Series: "S98",
      "Actuator Size": "45E2",
      "Actuator Model": "45E2-12-SR2-C",
      "Bore Size": "1.969 Inch",
      "Cylinder Size": "12 Inch",
      "Spring Size": "Spring 2",
      "Supply Code": "213",
      Action: "Spring Return, Fail CW",
      "Mounting / Yoke": "ISO / Canted",
      Ports: "Single NPT (Standard)",
      "Standard Options": "None",
      "Design Code": "Standard Pneumatic",
      Material: "Standard",
      "Temp Trim": "Standard (-29 degC to 93 degC)",
      Coatings: "Standard",
      Orientation: "1H1",
    },
    valveTorques: [
      { operation: "Break to Open", value: 844, unit: "Nm" },
      { operation: "Run to Open", value: 555, unit: "Nm" },
      { operation: "End to Open", value: 555, unit: "Nm" },
      { operation: "Break to Close", value: 555, unit: "Nm" },
      { operation: "Run to Close", value: 555, unit: "Nm" },
      { operation: "End to Close (Seating)", value: 1205, unit: "Nm" },
    ],
    actuatorTorques: [
      { type: "Pneumatic Start", value: 1931, unit: "Nm", actual: 2.29 },
      { type: "Pneumatic Min", value: 714, unit: "Nm", actual: 1.29 },
      { type: "Pneumatic End", value: 933, unit: "Nm", actual: 1.68 },
      { type: "Spring Start", value: 1654, unit: "Nm", actual: 2.98 },
      { type: "Spring Min", value: 949, unit: "Nm", actual: 1.71 },
      { type: "Spring End", value: 1763, unit: "Nm", actual: 1.46 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <DatasheetPDFGenerator data={data} />
      
    </div>
  );
}

export default DataSheet;
