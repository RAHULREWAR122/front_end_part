import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userList,
  calculateAnalytics,
} from "../Redux/usersListShow";
import AnalyticsDashboard from "./AnalyticDashboard";

function Analytics() {
  const dispatch = useDispatch();
  const { data, totalUsers, activeUsers, deletedUsers, loading, error } =
    useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      dispatch(calculateAnalytics());
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-[85vh] mt-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Total Users</th>
              <th className="border border-gray-300 px-4 py-2">Deleted User</th>
              <th className="border border-gray-300 px-4 py-2">Active Users</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 px-4 py-2">{totalUsers}</td>
              <td className="border border-gray-300 px-4 py-2">
                {deletedUsers}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {activeUsers}
              </td>
              <td className="flex justify-around items-center"></td>
            </tr>
          </tbody>
        </table>

        <AnalyticsDashboard />
      </div>
    </>
  );
}

export default Analytics;
