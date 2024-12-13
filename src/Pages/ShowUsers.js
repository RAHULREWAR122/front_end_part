import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SearchUser from "./SearchUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  userList,
  calculateAnalytics,
} from "../Redux/usersListShow";

function ShowUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewData, setViewData] = useState(false);
  const [showDataPopUp, setShowDataPopUp] = useState(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      dispatch(calculateAnalytics());
    }
  }, [data, dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    dispatch(calculateAnalytics());
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const showData = (userData) => {
    setViewData(true);
    setShowDataPopUp(userData);
  };

  const handleClosePopup = () => {
    setViewData(false);
    setShowDataPopUp(null);
  };

  if (data.length < 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <SearchUser list={data} showData={showData} viewData={viewData} />
      <div className="p-4 relative min-h-[70vh] font-[inter]">
        {viewData && showDataPopUp && (
          <div className="fixed top-0 left-0 z-[1000] h-full w-full backdrop-blur-sm flex justify-center items-center px-4">
            <div className="relative bg-white shadow-lg rounded-lg w-full max-w-lg p-6 md:max-w-2xl">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                X
              </button>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">
                  Name:{" "}
                  <span className="font-normal">{showDataPopUp.name}</span>
                </h2>
                <h2 className="text-xl font-bold">
                  Email:{" "}
                  <span className="font-normal">{showDataPopUp.email}</span>
                </h2>
                <h2 className="text-xl font-bold">
                  DOB: <span className="font-normal">{showDataPopUp.dob}</span>
                </h2>
                <h2 className="text-xl font-bold">
                  Address:{" "}
                  <span className="font-normal">{showDataPopUp.address}</span>
                </h2>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-lg text-center font-bold mb-4 mt-6">User Table</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, i) => (
                <tr key={i} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => showData(item)}
                      className="text-blue-500 px-2 py-1 rounded mr-2 hover:text-blue-700 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-center items-center mt-4 px-4 md:px-10 gap-10">
            <button
              className={`px-4 py-2 rounded bg-gray-300 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-400"
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <button
              className={`px-4 py-2 rounded bg-gray-300 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-400"
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUsers;
