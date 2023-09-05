import React from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {
  //   const navigate = useNavigate();

  const onViewClick = () => {
    console.log("click");
    // navigate(`/details/${props.id}`);
  };
  const shortenDescription = (description) => {
    return description.slice(0, 25) + "...";
  };
  return (
    <div className="card">
      <img className="cardImg" src={props.img} alt="" />
      <h2>
        {props.title.split(" ").length > 3
          ? props.title.split(" ").slice(0, 3).join(" ")
          : props.title}
      </h2>
      <p>
        {props.description.length <= 35 ? (
          props.description
        ) : (
          <>
            {shortenDescription(props.description)}
            <br />
            <span className="readMore" onClick={onViewClick}>
              Read More
            </span>
          </>
        )}
      </p>
      <span>Price: ${parseFloat(props.price).toFixed(2)}</span>
      <div className="cardFunctions">
        <button className="viewBtn" onClick={onViewClick}>
          View
        </button>
      </div>
    </div>
  );
}

export default Card;
