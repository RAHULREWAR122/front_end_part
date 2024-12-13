import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function SearchUser({ showData, viewData, list }) {
  const [query, setQuery] = useState("");
  const [filtered, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (viewData) {
      setQuery("");
    }
  }, [query, filtered, viewData]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    if (searchTerm === "") {
      setFilteredData([]);
      setShowList(false);
    } else {
      const filteredResults = list.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResults);
      setShowList(filteredResults.length > 0);
    }
  };

  return (
    <div className="w-full mt-6 relative flex justify-center px-3 items-center flex-col font-[inter]">
      <div className="w-full relative text-center flex justify-center max-w-3xl items-center">
        <div className="w-full relative">
          <input
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Name or Email"
            className="w-[100%] bg-gray-200 text-black px-3 py-3 outline-none rounded-md"
          />
          {showList && query.length > 0 && (
            <ul className="shadow-lg z-[100] top-11 overflow-hidden left-0 absolute w-[100%] rounded-bl-md rounded-br-md">
              {filtered.slice(0, 6).map((item, i) => (
                <li
                  key={i}
                  onClick={() => showData(item)}
                  className="bg-gray-100 cursor-pointer border-b-2 border-gray-300 p-2 flex justify-between items-center hover:bg-gray-200 transition-all duration-100"
                >
                  <span>{item.name}</span>
                  <span>
                    <IoSearchOutline size={20} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
