import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const { state } = useLocation();
  const { result, diagram, formData } = state || {};

  if (!result || !diagram) {
    return <div>No results available. Please go back and submit the form.</div>;
  }

  return (
    <div className="result-wrapper">
      <h1>Calculation Results</h1>
      <table className="result-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Full Line R1 (Ω)</td><td>{result.fullLineR1}</td></tr>
          <tr><td>Full Line X1 (Ω)</td><td>{result.fullLineX1}</td></tr>
          <tr><td>Full Line R0 (Ω)</td><td>{result.fullLineR0}</td></tr>
          <tr><td>Full Line X0 (Ω)</td><td>{result.fullLineX0}</td></tr>
          <tr><td>Full Line Length (km)</td><td>{result.fullLine}</td></tr>
          <tr><td>Zone 1 Primary Z1 Magnitude (Ω)</td><td>{result.zone1PyZ1Mag}</td></tr>
          <tr><td>Zone 1 Primary Z1 Angle (°)</td><td>{result.zone1PyZ1Ang}</td></tr>
          <tr><td>Zone 1 Primary R1 (Ω)</td><td>{result.zone1PyR1Real}</td></tr>
          <tr><td>Zone 1 Primary X1 (Ω)</td><td>{result.zone1PyX1Imag}</td></tr>
          <tr><td>Zone 1 Primary Z0 Magnitude (Ω)</td><td>{result.zone1PyZ0Mag}</td></tr>
          <tr><td>Zone 1 Primary Z0 Angle (°)</td><td>{result.zone1PyZ0Ang}</td></tr>
          <tr><td>Zone 1 Primary R0 (Ω)</td><td>{result.zone1PyR0Real}</td></tr>
          <tr><td>Zone 1 Primary X0 (Ω)</td><td>{result.zone1PyX0Imag}</td></tr>
          <tr><td>Zone 1 Secondary R1 (Ω)</td><td>{result.zone1SecR1}</td></tr>
          <tr><td>Zone 1 Secondary X1 (Ω)</td><td>{result.zone1SecX1}</td></tr>
          <tr><td>Zone 1 Secondary R0 (Ω)</td><td>{result.zone1SecR0}</td></tr>
          <tr><td>Zone 1 Secondary X0 (Ω)</td><td>{result.zone1SecX0}</td></tr>
          <tr><td>Zone 1 Secondary Z1 Magnitude (Ω)</td><td>{result.zone1SecZ1Mag}</td></tr>
          <tr><td>Zone 1 Secondary Z1 Angle (°)</td><td>{result.zone1SecZ1Ang}</td></tr>
          <tr><td>Zone 1 Secondary Z0 Magnitude (Ω)</td><td>{result.zone1SecZ0Mag}</td></tr>
          <tr><td>Zone 1 Secondary Z0 Angle (°)</td><td>{result.zone1SecZ0Ang}</td></tr>
          <tr><td>Kr</td><td>{result.kr}</td></tr>
          <tr><td>Kx</td><td>{result.kx}</td></tr>
          <tr><td>Kn</td><td>{result.kn}</td></tr>
        </tbody>
      </table>

      <h2>Transmission Diagram</h2>
      <div className="diagram-box" dangerouslySetInnerHTML={{ __html: diagram }} />

      <style>
        {`
          .result-wrapper { text-align: center; margin-top: 20px; }
          .result-table { margin: 0 auto; border-collapse: collapse; }
          .result-table th, .result-table td { padding: 10px; border: 1px solid #ddd; }
          .diagram-box { margin-top: 20px; }
        `}
      </style>
    </div>
  );
};

export default ResultsPage;