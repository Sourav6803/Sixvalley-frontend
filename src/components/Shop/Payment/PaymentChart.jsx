import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { date: "01/03", payments: 4500, outstanding: 2000 },
  { date: "05/03", payments: 6750, outstanding: 3000 },
  { date: "10/03", payments: 9000, outstanding: 5000 },
  { date: "15/03", payments: 2500, outstanding: 1500 },
  { date: "20/03", payments: 7000, outstanding: 3500 },
  { date: "25/03", payments: 4200, outstanding: 2200 },
  { date: "30/03", payments: 8100, outstanding: 4500 },
];

const PaymentChart = () => {
  return (
    <div className="p-2 w-full bg-gray-50   items-center">
      
        {/* Payments Summary */}
        

        {/* Payments Chart */}
        <div className="bg-white w-full border rounded-2xl p-4  shadow-sm">
          <h3 className="text-gray-700 font-medium text-lg mb-4">Payments over time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="payments" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="outstanding" stroke="#ff5555" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">The graph shows the daily view of your 30 days' payments</p>
        </div>
    
    </div>
  );
};

export default PaymentChart;
