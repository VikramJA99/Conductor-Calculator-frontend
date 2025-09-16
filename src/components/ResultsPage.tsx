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
        <tbody>
          <tr><td>R1</td><td>{result.r1}</td></tr>
          <tr><td>X1</td><td>{result.x1}</td></tr>
          <tr><td>R0</td><td>{result.r0}</td></tr>
          <tr><td>X0</td><td>{result.x0}</td></tr>
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
          .result-table td { padding: 10px; border: 1px solid #ddd; }
          .diagram-box { margin-top: 20px; }
        `}
      </style>
    </div>
  );
};

export default ResultsPage;