import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message'


function Chatbot() {

  const [messages, setMessages] = useState([])

  const df_text_query = async (queryText) => {
    let says = {
      speaks: 'user',
      msg: {
        text: {
          text: [queryText]
        }
      }
    }


    setMessages(messages => [...messages, says])

    const res = await axios.post('/api/df_text_query', { text: [queryText] });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'bot',
        msg: msg
      }


      setMessages(messages => [...messages, says])
    }
  };

  const df_event_query = async (eventName) => {

    const res = await axios.post('/api/df_event_query', { event: eventName });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'bot',
        msg: msg
      }

      setMessages(messages => [...messages, says])
    }
  };

  useEffect(() => {
    df_text_query('Hello How are u')
  }, [])

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      df_text_query(e.target.value);
      e.target.value = '';
    }
  }

  const renderMessages = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
      }
      )
    } else {
      return null;
    }
  }

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <div className="container">
      <div style={{ height: 400, width: 400, float: 'right' }}>
        <h2>Chatbot</h2>
        <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
          {renderMessages(messages)}
          <AlwaysScrollToBottom />

        </div>
        <input type="text" onKeyPress={handleInputKeyPress} style={{ color: 'white' }} autoFocus />
      </div>
    </div>
  )
}

export default Chatbot;