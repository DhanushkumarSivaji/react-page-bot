import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message'
import Card from './Card';
import QuickReplies from './QuickReplies';

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

    const res = await axios.post('/dialogflowroutes/df_text_query', { text: queryText, userID: cookies.get('userID') });

    for (let msg of res?.data?.fulfillmentMessages) {
      says = {
        speaks: 'bot',
        msg: msg
      }
      setMessages(messages => [...messages, says])
    }
  };

  const df_event_query = async (eventName) => {

    const res = await axios.post('/dialogflowroutes/df_event_query', { event: eventName, userID: cookies.get('userID') });

    for (let msg of res?.data?.fulfillmentMessages) {
      let says = {
        speaks: 'bot',
        msg: msg
      }

      setMessages(messages => [...messages, says])
    }
  };

  useEffect(() => {
    df_event_query('WELCOME_SHOP')
  }, [])

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await resolveAfterXSeconds(1)
      df_text_query(e?.target?.value);
      e.target.value = '';
    }
  }

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} payload={card?.structValue} />);
  }

  const renderOneMessage = (message, i) => {

    if (message?.msg?.text?.text) {
      return <Message key={i} speaks={message?.speaks} text={message?.msg?.text?.text} />;
    } else if (message?.msg?.payload?.fields?.cards) { //message.msg.payload.fields.cards.listValue.values
      return <div key={i} style={{ margin: '30px' }}>
        <div>
          <div className="course-list-row">
            {renderCards(message?.msg?.payload?.fields?.cards?.listValue?.values)}
          </div>
        </div>
      </div>
    } else if (message?.msg?.payload?.fields?.quick_replies) {
      return <QuickReplies
        text={(message?.msg?.payload?.fields?.text) ? (message?.msg?.payload?.fields?.text) : null}
        key={i}
        replyClick={handleQuickReplyPayload}
        speaks={message?.speaks}
        payload={message?.msg?.payload?.fields?.quick_replies?.listValue?.values} />;
    }
  }



  const renderMessages = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      }
      )
    } else {
      return null;
    }
  }

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef?.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const resolveAfterXSeconds = (x) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, x * 1000);
    })
}

  const handleQuickReplyPayload = async (event, payload, text) => {
    event.preventDefault();
    event.stopPropagation();
    switch (payload) {
      case 'recommend_yes':
        await resolveAfterXSeconds(1)
        df_event_query('SHOW_RECOMMENDATIONS');
        break;
      case 'training_masterclass':
        await resolveAfterXSeconds(1)
        df_event_query('MASTERCLASS');
        break;
      default:
        await resolveAfterXSeconds(1)
        df_text_query(text);
        break;
    }

  }



  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: 400, width: 400 }}>
        <h3 style={{ textAlign: 'center', display: 'block', background: 'black', fontSize: '30px', padding: '10px 0' }}>Chatbot</h3>
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