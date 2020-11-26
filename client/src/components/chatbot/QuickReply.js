import React from 'react';


const QuickReply = (props) => {
    if (props?.reply?.structValue?.fields?.payload) {
        return (
            <a style={{ margin: 3}} href="/" className="new badge blue" style={{color:'white',padding:'6px',borderRadius:'20px',margin:'5px'}}
               onClick={(event) =>
                   props.click(
                       event,
                       props?.reply?.structValue?.fields?.payload?.stringValue,
                       props?.reply?.structValue?.fields?.text?.stringValue
                   )
               }>
                {props?.reply?.structValue?.fields?.text?.stringValue}
            </a>
        );
    } else {
        return (
            <a style={{ margin: 3}} target="_blank" href={props.reply.structValue.fields.link.stringValue}
               className="new badge blue" style={{color:'white',padding:'6px',borderRadius:'20px',margin:'5px'}}>
                {props?.reply?.structValue?.fields?.text?.stringValue}
            </a>
        );
    }

};

export default QuickReply;