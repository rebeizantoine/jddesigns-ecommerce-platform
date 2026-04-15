import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/furniture.css";
import SearchComponent from "../Components/SearchComponent";

const Furniture = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/singleitem")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = items.filter(
    (item) =>
      item.item_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.item_mainTag.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.item_additionalTag1
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.item_additionalTag2
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.item_additionalTag3
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
  );

  const totalItems = filteredItems.length;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemClick = (item) => {
    const formattedName = item.item_name.toLowerCase().replace(/\s+/g, "-");
    localStorage.setItem("currentItemId", item._id);
    navigate(`/single/${formattedName}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search input changes
  };

  return (
    <div>
      <div className="bigofbigof">
        <h2 className="priceand-h21">Here are all our items</h2>
        <p className="smallinstig">Search by category, collection, tag</p>
        <SearchComponent onInputChange={handleSearchInputChange} />
        <p className="priceand-p21">{totalItems} products</p>
        <div className="item-grid-container1">
          {currentItems.map((item) => (
            <div
              className="item-grid-11"
              key={item._id}
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.item_image1}
                alt={item.item_name}
                className="image-priceand1"
              />
              <div className="priceand1">
                <h1>{item.item_name}</h1>
                <p>From ${item.item_price} USD</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredItems.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Furniture;
