import React from 'react';
import Avatar from "./img/img_avatar_1.png"

const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3">
        {props.speaks==='bot' && <div class="message-group-received">
        <div>
          <img src={Avatar} />
        </div>
        <div>
          <div class="message-received">
            <div class="message-received-text">
              {props.text}
            </div>
          </div>
        </div>
      </div>}
      {props.speaks==='user' && <div class="message-group-sent">
        <div>
          <div class="message-sent">
            <div class="message-sent-text">
            {props.text}
            </div>
          </div>
         
        </div>
      </div>}
        </div>

    );
};

export default Message;

