import React from "react";
// Dummy heatmap, replace with real data from backend
const colorMap = {
  senang: "#4caf50",
  sedih: "#2196f3",
  marah: "#f44336",
  netral: "#9e9e9e",
};
const dummy = ["senang", "sedih", "marah", "netral", "senang", "marah"];
function EmotionalHeatMap() {
  return (
    <div>
      <h3>Heatmap Emosi</h3>
      <div style={{ display: "flex", gap: 4 }}>
        {dummy.map((e, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 30,
              background: colorMap[e],
              borderRadius: 4,
            }}
            title={e}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default EmotionalHeatMap;
