import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
//import Carousel from "../components/Carousel";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://foodiee-web-app-backend.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        {" "}
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div
            className="carousel-inner"
            style={{ objectFit: "contain !important" }}
          >
            <div
              className="carousel-item active"
              id="crousel"
              style={{ filter: "brightness(30%)" }}
            >
              <img
                src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div
              className="carousel-item active"
              id="crousel"
              style={{ filter: "brightness(30%)" }}
            >
              <img
                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div
              className="carousel-item active"
              id="crousel"
              style={{ filter: "brightness(30%)" }}
            >
              <img
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>{" "}
      </div>
      <div className="container">
        {foodCat.length > 0 &&
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3 m-4"
                    >
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                        desc={filterItems.description}
                      />
                    </div>
                  ))
              ) : (
                <div>Data Not Found</div>
              )}
            </div>
          ))}
      </div>

      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
