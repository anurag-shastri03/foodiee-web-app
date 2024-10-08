import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { OrderService } from "../components/orders.service";

export default function MyOrder() {
  const [mainData, setOrderData] = useState([]);

  useEffect(() => {
    fetchMyOrder();
  }, []);

  async function fetchMyOrder() {
    try {
      const email = localStorage.getItem("userEmail");
      const payload = { email };
      const response = await OrderService.fetchMyOrder(payload);
      setOrderData(response?.mainData?.sub_order_data || []); // Assuming response is the correct structure
      
      
    } catch (error) {
      console.error("Error fetching order data", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {mainData.length > 0 ? (
            mainData.map((order, index) => (
              <div key={index} className="col-12">
                <OrderItem order={order} />
              </div>
            )).reverse()
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

// Separate component for displaying the order date
function OrderDate({ orderDate }) {
  const formattedDate = new Date(orderDate).toLocaleDateString();
  //console.log(formattedDate)
  return (
    <div className="m-auto mt-5">
      <div>{formattedDate}</div>
      <hr />
    </div>
  );
}

// Separate component for displaying the card
function OrderCard({ item }) {
  return (
    <div className="card-body">
      <h6 className="card-title">{item?.name}</h6>
      <div className="container w-100 p-0" style={{ height: "38px" }}>
        <span className="m-1">{item?.quantity}</span>
        <span className="m-1">{item?.option}</span>
        <div className="d-inline ms-2 h-100 w-20">₹{item?.amount}/-</div>
      </div>
    </div>
  );
}

function OrderItem({ order }) {
  return (
    <>
      <OrderDate orderDate={order.order_date} />
      <div className="row">
        {order.items.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <OrderCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
