import { useGetBaseQuery } from "@/service/baseApi";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts";
const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 400, pv: 5000, amt: 2300 },
  { name: "Sep", uv: 300, pv: 3000, amt: 2000 },
  { name: "Oct", uv: 278, pv: 2000, amt: 1500 },
  { name: "Nov", uv: 189, pv: 4800, amt: 2100 },
  { name: "Dec", uv: 239, pv: 3800, amt: 2500 },
];

const MyChart = () => {

  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="purple"
        strokeWidth={2}
        name="My data series name"
      />
      <XAxis dataKey="name" />
      <YAxis width="auto" label={{ value: "UV", position: "insideLeft", angle: -90 }} />
      <Legend align="right" />
      <Tooltip />
    </LineChart>
  );
};

export default MyChart;
