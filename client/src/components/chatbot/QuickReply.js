import React from 'react';


const QuickReply = (props) => {
    if (props?.reply?.payload) {
        return (
            <a style={{ margin: 3 }} href="/" className="new badge blue" style={{ color: 'white', padding: '6px', borderRadius: '20px', margin: '5px' }}
                onClick={(event) =>
                    props.click(
                        event,
                        props?.reply?.payload,
                        props?.reply?.text
                    )
                }>
                {props?.reply?.text}
            </a>
        );
    } else {
        return (
            <a style={{ margin: 3 }} target="_blank" href={props?.reply?.link}
                className="new badge blue" style={{ color: 'white', padding: '6px', borderRadius: '20px', margin: '5px' }}>
                {props?.reply?.text}
            </a>
        );
    }

};

export default QuickReply;