import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  
  let options = props.options;
    let priceOptions = Object.keys(options);

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [priceRef]);
  const finalPrice = size ? qty * parseInt(options[size]) : 0;

  let handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return;
      }
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "450px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="Food" style={{ height: "150px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.desc}</p>
          <div className="w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="d-inline h-100 fs-6">₹{finalPrice}/-</div>
            <hr />
            <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
              Add To Cart
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
