import React from 'react';


const Card = (props) => {
    return (
          <div className="card" style={{ margin: '5px' }}>
            <div className="card-image" style={{ width: 240 }}>
              <img alt={props?.payload?.fields?.header?.stringValue} src={props?.payload?.fields?.image?.stringValue} />
              <span className="card-title" style={{fontSize:'16px',padding:'10px'}}>{props?.payload?.fields?.header?.stringValue}</span>
            </div>
            <div className="card-content" style={{color:'black'}}>
              <p>{props?.payload?.fields?.description?.stringValue}</p>
              <i><a  href="/">{props?.payload?.fields?.price?.stringValue}</a></i>
            </div>
            <div className="card-action">
            <a target="_blank" rel="noopener noreferrer" href={props?.payload?.fields?.link?.stringValue}>GET NOW</a>
            </div>
          </div>
    );
};

export default Card;
