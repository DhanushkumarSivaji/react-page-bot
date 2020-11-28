import React from 'react';
import Avatar from "./img/dk.jpg"

const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3" style={{marginTop:'15px'}}>
        {props?.speaks==='bot' && <div className="message-group-received">
        <div>
          <img alt="Bot" src={Avatar} />
        </div>
        <div>
          <div className="message-received">
            <div className="message-received-text">
              {props?.text}
            </div>
          </div>
        </div>
      </div>}
      {props.speaks==='user' && <div className="message-group-sent">
        <div>
          <div className="message-sent">
            <div className="message-sent-text">
            {props?.text}
            </div>
            {/* <div class="message-sent-status">
              <img src={Avatar} />
            </div> */}
          </div>
        </div>
      </div>}
        </div>

    );
};

export default Message;

