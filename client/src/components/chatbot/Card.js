import React from 'react';


const Card = (props) => {
  return (
    <div className="card" style={{ margin: '5px' }}>
      <div className="card-image" style={{ width: 240 }}>
        <img alt={props?.payload?.header} src={props?.payload?.image} />
        <span className="card-title" style={{ fontSize: '16px', padding: '10px' }}>{props?.payload?.header}</span>
      </div>
      <div className="card-content" style={{ color: 'black' }}>
        <p>{props?.payload?.description}</p>
        <i><a href="/">{props?.payload?.price}</a></i>
      </div>
      <div className="card-action">
        <a target="_blank" rel="noopener noreferrer" href={props?.payload?.link}>GET NOW</a>
      </div>
    </div>
  );
};

export default Card;
