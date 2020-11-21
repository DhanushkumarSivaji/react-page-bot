import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message'

const cookies = new Cookies();

function Chatbot() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path: '/' });
    }
  }, [])

  const df_text_query = async (queryText) => {
    let says = {
      speaks: 'user',
      msg: {
        text: {
          text: queryText
        }
      }
    }


    setMessages(messages => [...messages, says])

    const res = await axios.post('/api/df_text_query', { text: queryText,userID: cookies.get('userID') });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'bot',
        msg: msg
      }
      setMessages(messages => [...messages, says])
    }
  };

  const df_event_query = async (eventName) => {

    const res = await axios.post('/api/df_event_query', { event: eventName,userID: cookies.get('userID') });

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
    <div className="container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{ height: 400, width: 400 }}>
        <h3 style={{textAlign:'center',display:'block',background:'black',fontSize:'50px'}}>Chatbot</h3>
        <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
          {renderMessages(messages)}
          <AlwaysScrollToBottom />
        </div>
        <input type="text" placeholder="Type a message..." onKeyPress={handleInputKeyPress} style={{ color: 'white' }} autoFocus />
      </div>
    </div>
  )
}

export default Chatbot;