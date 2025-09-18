"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConductorForm.css";

const conductorOptions = [
  "KUNDHA ACSR",
  "ZEBRA ACSR",
  "1200Sqmm XLPE",
  "490Sqmm",
  "L&T Cable",
];

const relayOptions = ["MiCOM", "ABB", "Siemens", "GE", "ZIV", "Sitang", "NR"];

const yesNoOptions = ["Yes", "No"];

interface ConductorPortion {
  conductorName: string;
  length: number;
}

interface TransformerDetails {
  hvLvKv: string;
  lvkv: string;
  mva: string;
  impedance: string;
}

interface ConductorInput {
  subStation: string;
  feeder: string;
  ctRatio: string;
  ptRatio: string;
  protectedLineName: string;
  main1: string;
  main2: string;
  portions: ConductorPortion[];
  otherEndShortestLineName: string;
  otherEndIsDoubleCircuit: string;
  otherEndLongestLineName: string;
  otherEndLLIsDoubleCircuit: string;
  otherEndLongestPortions: ConductorPortion[];
  considerSingleTrafoZone2: string;
  otherEndAutoTransformerZone3: TransformerDetails[];
  considerSingleTrafoZone3: string;
  localBusShortestLineName: string;
  localPortions: ConductorPortion[];
  localEndAutoTransformerZone4: TransformerDetails[];
  considerSingleTrafoZone4: string;
}

interface ResultDto {
  fullLineR1: number;
  fullLineX1: number;
  fullLineR0: number;
  fullLineX0: number;
  fullLine: number;
  zone1PyZ1Mag: number;
  zone1PyZ1Ang: number;
  zone1PyR1Real: number;
  zone1PyX1Imag: number;
  zone1PyZ0Mag: number;
  zone1PyZ0Ang: number;
  zone1PyR0Real: number;
  zone1PyX0Imag: number;
  zone1SecR1: number;
  zone1SecX1: number;
  zone1SecR0: number;
  zone1SecX0: number;
  zone1SecZ1Mag: number;
  zone1SecZ1Ang: number;
  zone1SecZ0Mag: number;
  zone1SecZ0Ang: number;
  kr: number;
  kx: number;
  kn: number;
}

export default function ConductorForm() {
  const [form, setForm] = useState<ConductorInput>({
    subStation: "",
    feeder: "",
    ctRatio: "",
    ptRatio: "",
    protectedLineName: "",
    main1: "MiCOM",
    main2: "ABB",
    portions: [
      { conductorName: "KUNDHA ACSR", length: 0 },
      { conductorName: "ZEBRA ACSR", length: 0 },
      { conductorName: "1200Sqmm XLPE", length: 0 },
      { conductorName: "490Sqmm", length: 0 },
      { conductorName: "L&T Cable", length: 0 },
    ],
    otherEndShortestLineName: "",
    otherEndIsDoubleCircuit: "No",
    otherEndLongestLineName: "",
    otherEndLLIsDoubleCircuit: "No",
    otherEndLongestPortions: [
      { conductorName: "KUNDHA ACSR", length: 0 },
      { conductorName: "ZEBRA ACSR", length: 0 },
      { conductorName: "1200Sqmm XLPE", length: 0 },
      { conductorName: "490Sqmm", length: 0 },
      { conductorName: "L&T Cable", length: 0 },
    ],
    considerSingleTrafoZone2: "No",
    otherEndAutoTransformerZone3: [
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
    ],
    considerSingleTrafoZone3: "Yes",
    localBusShortestLineName: "",
    localPortions: [
      { conductorName: "KUNDHA ACSR", length: 0 },
      { conductorName: "ZEBRA ACSR", length: 0 },
      { conductorName: "1200Sqmm XLPE", length: 0 },
      { conductorName: "490Sqmm", length: 0 },
      { conductorName: "L&T Cable", length: 0 },
    ],
    localEndAutoTransformerZone4: [
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
      { hvLvKv: "", lvkv: "", mva: "", impedance: "" },
    ],
    considerSingleTrafoZone4: "No",
  });

  const navigate = useNavigate();

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePortionChange = (
    index: number,
    field: "conductorName" | "length",
    value: string,
    portionType: "portions" | "otherEndLongestPortions" | "localPortions"
  ) => {
    const updatedPortions = [...form[portionType]];
    if (field === "length") {
      updatedPortions[index].length = Number(value);
    } else {
      updatedPortions[index].conductorName = value;
    }
    setForm((prev) => ({ ...prev, [portionType]: updatedPortions }));
  };

  const handleTransformerChange = (
    index: number,
    field: "hvLvKv" | "lvkv" | "mva" | "impedance",
    value: string,
    transformerType: "otherEndAutoTransformerZone3" | "localEndAutoTransformerZone4"
  ) => {
    const updatedTransformers = [...form[transformerType]];
    updatedTransformers[index][field] = value;
    setForm((prev) => ({ ...prev, [transformerType]: updatedTransformers }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch calculation");
      }

      const data: ResultDto = await response.json();
      const totalLength = form.portions.reduce((sum, p) => sum + (p.length || 0), 0);
      const svgContent = `
        <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="100" x2="${50 + (totalLength * 20)}" y2="100" stroke="black" stroke-width="2"/>
          <text x="25" y="95" font-size="12">${form.subStation}</text>
          <text x="${50 + (totalLength * 20) + 10}" y="95" font-size="12">${form.otherEndShortestLineName || "Other End"}</text>
          <text x="${300}" y="120" font-size="12">Total Length: ${totalLength} km</text>
        </svg>
      `;

      navigate("/results", { state: { result: data, diagram: svgContent, formData: form } });
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">⚡ Conductor Impedance Calculator</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <table className="form-table">
          <thead>
            <tr>
              <th colSpan={2}>Enter the Values in green shaded cells</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SUBSTATION NAME</td>
              <td>
                <input
                  type="text"
                  name="subStation"
                  value={form.subStation}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>FEEDER NAME</td>
              <td>
                <input
                  type="text"
                  name="feeder"
                  value={form.feeder}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>CT Ratio in Amps</td>
              <td>
                <input
                  type="text"
                  name="ctRatio"
                  value={form.ctRatio}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>PT Ratio in Volts</td>
              <td>
                <input
                  type="text"
                  name="ptRatio"
                  value={form.ptRatio}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>Protected Line Name</td>
              <td>
                <input
                  type="text"
                  name="protectedLineName"
                  value={form.protectedLineName}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>Main 1</td>
              <td>
                <select
                  name="main1"
                  value={form.main1}
                  onChange={handleFieldChange}
                  className="form-select"
                  style={{ backgroundColor: "#90ee90" }}
                >
                  {relayOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Main 2</td>
              <td>
                <select
                  name="main2"
                  value={form.main2}
                  onChange={handleFieldChange}
                  className="form-select"
                  style={{ backgroundColor: "#90ee90" }}
                >
                  {relayOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h2 className="form-subtitle">Protected Line Conductor Portions</h2>
                <table className="inner-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Conductor Name</th>
                      <th>Length in km</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.portions.map((portion, i) => (
                      <tr key={i}>
                        <td>Protected Line Conductor Portion.{i + 1}</td>
                        <td>
                          <select
                            value={portion.conductorName}
                            onChange={(e) =>
                              handlePortionChange(
                                i,
                                "conductorName",
                                e.target.value,
                                "portions"
                              )
                            }
                            className="form-select"
                            style={{ backgroundColor: "#90ee90" }}
                          >
                            {conductorOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={portion.length}
                            onChange={(e) =>
                              handlePortionChange(
                                i,
                                "length",
                                e.target.value,
                                "portions"
                              )
                            }
                            className="form-input"
                            min="0"
                            step="any"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Other End Shortest Line Name</td>
              <td>
                <input
                  type="text"
                  name="otherEndShortestLineName"
                  value={form.otherEndShortestLineName}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </td>
            </tr>
            <tr>
              <td>Other End SL is Double Circuit = Yes/No</td>
              <td>
                <select
                  name="otherEndIsDoubleCircuit"
                  value={form.otherEndIsDoubleCircuit}
                  onChange={handleFieldChange}
                  className="form-select"
                  style={{ backgroundColor: "#90ee90" }}
                >
                  {yesNoOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="form-button">
                  Calculate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}