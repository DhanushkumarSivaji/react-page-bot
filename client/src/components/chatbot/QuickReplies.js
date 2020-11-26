import React from 'react';
import QuickReply from './QuickReply';
import Avatar from "./img/dk.jpg"


const QuickReplies = (props) => {
    const handleClick = (event, payload, text) => {
        props.replyClick(event, payload, text);
    }

    const renderQuickReply = (reply, i) => {
        return <QuickReply key={i} click={handleClick} reply={reply} />;
    }

    const renderQuickReplies = (quickReplies) => {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                return renderQuickReply(reply, i);
            }
            )
        } else {
            return null;
        }
    }
    return (
        <div className="message-group-received">
            <div>
                <img alt="Bot" src={Avatar} />
            </div>
            <div>
                <div className="message-received">
                    <div className="message-received-text">
                        {
                            props?.text?.stringValue
                        }
                        <div style={{margin:'5px 0'}}>
                        {renderQuickReplies(props?.payload)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickReplies;
