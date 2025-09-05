"use client";

import React, { useState } from "react";
import "./ConductorForm.css";

interface ConductorInput {
  subStation: string;
  feeder: string;
  ctRatio: string;
  ptRatio: string;
  conductorName: string;
  currentRating: number;
  length: number;
}

interface ResultDto {
  r1: number;
  x1: number;
  r0: number;
  x0: number;
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
    conductorName: "",
    currentRating: 0,
    length: 0,
  });

  const [result, setResult] = useState<ResultDto | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "currentRating" || name === "length" ? Number(value) : value,
    }));
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
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <>
      <h1 className="form-title">⚡ Conductor Impedance Calculator</h1>

      <div className="form-wrapper">
        {/* Form (left side) */}
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            name="subStation"
            placeholder="Sub Station"
            value={form.subStation}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="feeder"
            placeholder="Feeder"
            value={form.feeder}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="ctRatio"
            placeholder="CT Ratio"
            value={form.ctRatio}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="ptRatio"
            placeholder="PT Ratio"
            value={form.ptRatio}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="conductorName"
            placeholder="Conductor Name"
            value={form.conductorName}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="currentRating"
            placeholder="Current Rating (A)"
            value={form.currentRating}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="length"
            placeholder="Length (km)"
            value={form.length}
            onChange={handleChange}
            required
            className="form-input"
          />

          <button type="submit" className="form-button">
            Calculate
          </button>
        </form>

        {/* Result (right side) */}
        {result && (
          <div className="result-container">
            <h2 className="result-title">📊 Calculation Result</h2>
            <div>
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="result-row">
                  <span className="result-key">{key}</span>
                  <span className="result-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
