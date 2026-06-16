import React from "react";
import { Line } from "react-chartjs-2";
const dummy = [0, 1, 2, 1, 3, 2];
const labels = ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25"];
const data = {
  labels,
  datasets: [
    {
      label: "Level Emosi",
      data: dummy,
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      tension: 0.3,
    },
  ],
};
function EmotionHistory() {
  return (
    <div>
      <h3>Riwayat Emosi</h3>
      <Line data={data} />
    </div>
  );
}
export default EmotionHistory;
