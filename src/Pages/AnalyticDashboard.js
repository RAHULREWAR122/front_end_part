import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";
import { fetchAnalyticsData } from "../Redux/userAnalytics";

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");

  const { userRegistrations, loading, error } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredRegistrations =
    filter === "All"
      ? userRegistrations
      : userRegistrations.filter((item) => item.month === filter);

  const totalActive = filteredRegistrations.reduce(
    (a, b) => a + b.active,
    0
  );
  const totalInactive = filteredRegistrations.reduce(
    (a, b) => a + b.inactive,
    0
  );

  const usersByRegion = filteredRegistrations.reduce((a, b) => {
    const existingRegion = a.find((region) => region.region === b.region);
    if (existingRegion) {
      existingRegion.count += b.count;
    } else {
      a.push({ region: b.region, count: b.count });
    }
    return a;
  }, []);

  if (error) {
    return <div>Loading please wait...</div>;
  }


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="w-full py-2">
        <select
          name="months"
          className="bg-gray-300 cursor-pointer text-blue-600 py-2 px-3 rounded-md ml-4"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="All">All</option>
          {userRegistrations.map((item) => (
            <option key={item.month} value={item.month}>
              {item.month}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            User Registration Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredRegistrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Active vs Inactive Users
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Active", value: totalActive },
                  { name: "Inactive", value: totalInactive },
                ]}
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FF8042" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersByRegion}>
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
