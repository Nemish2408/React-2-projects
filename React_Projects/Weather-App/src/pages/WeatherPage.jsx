import { useState } from "react";
import useWeather from "../hooks/useWeather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function WeatherPage() {
  const [city, setCity] = useState("Surat");
  const { weather, loading, error, fetchWeather } = useWeather(city);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold">Search Weather by City</h2>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded"
        />
        <button onClick={() => fetchWeather(city)} className="bg-blue-500 text-white p-2 rounded">Get Weather</button>
      </div>
      {loading && <h2 className="mt-4 text-xl">Loading Weather...</h2>}
      {error && <h2 className="mt-4 text-red-500">Error: {error}</h2>}
      {weather && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded">
          <h1 className="text-3xl font-bold">Weather in {weather.resolvedAddress}</h1>
          <table className="w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Temperature (°F)</th>
                <th className="border p-2">Humidity (%)</th>
                <th className="border p-2">Wind Speed (mph)</th>
                <th className="border p-2">Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{weather.currentConditions.temp}</td>
                <td className="border p-2">{weather.currentConditions.humidity}</td>
                <td className="border p-2">{weather.currentConditions.windspeed}</td>
                <td className="border p-2">{weather.currentConditions.conditions}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Temperature Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weather.days.slice(0, 7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;