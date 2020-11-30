import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message'
import Card from './Card';
import QuickReplies from './QuickReplies';
import { TROUBLE_REACH_BOT } from '../constants'

const cookies = new Cookies();


function Chatbot() {

  const [messages, setMessages] = useState([])
  const [isOpen, setIsOpen] = useState(true)
  const [clientToken, setClientToken] = useState(false)
  const [regenerateToken, setregenerateToken] = useState(0)

  useEffect(() => {
    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path: '/' });
    }
  }, [])

  const df_text_query = async (text) => {
    let says = {
      speaks: 'user',
      msg: {
        text: {
          text: text
        }
      }
    }
    setMessages(messages => [...messages, says])
    const request = {
      queryInput: {
        text: {
          text: text,
          languageCode: 'en-US',
        },
      }
    };
    df_client_call(request);
  };

  const df_event_query = async (eventName) => {
    const request = {
      queryInput: {
        event: {
          name: eventName,
          languageCode: 'en-US',
        },
      }
    };

    df_client_call(request);
  };

  const df_client_call = async (request) => {
    try {

      if (clientToken === false) {
        const res = await axios.get('/dialogflowroutes/get_client_token');
        setClientToken(res?.data?.token);
      }

      var config = {
        headers: {
          'Authorization': "Bearer " + process.env.REACT_APP_DIALOGFLOW_CLIENT_KEY,
          'Content-Type': 'application/json; charset=utf-8'
        }
      };


      const res = await axios.post(
        'https://dialogflow.googleapis.com/v2/projects/' + process.env.REACT_APP_GOOGLE_PROJECT_ID +
        '/agent/sessions/' + process.env.REACT_APP_DF_SESSION_ID + cookies.get('userID') + ':detectIntent',
        request,
        config
      );

      let says = {};

      if (res?.data?.queryResult?.fulfillmentMessages) {
        for (let msg of res?.data?.queryResult?.fulfillmentMessages) {
          says = {
            speaks: 'bot',
            msg: msg
          }
          setMessages(messages => [...messages, says])
        }
      }
    } catch (e) {
      if (e?.response?.status === 401 && regenerateToken < 1) {
        setClientToken(false);
        setregenerateToken(1)
        // df_client_call(request);
      }
      else {
        let says = TROUBLE_REACH_BOT
        setMessages(messages => [...messages, says])
        setTimeout(function () {
          setIsOpen(false)
        }, 3000);
      }
    }

  }

  useEffect(() => {
    df_event_query('WELCOME_SHOP')
  }, [])

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      df_text_query(e?.target?.value);
      e.target.value = '';
    }
  }

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} payload={card} />);
  }

  const renderOneMessage = (message, i) => {

    if (message?.msg?.text?.text) {
      return <Message key={i} speaks={message?.speaks} text={message?.msg?.text?.text} />;
    } else if (message?.msg?.payload?.cards) { //message.msg.payload.fields.cards.listValue.values
      return <div key={i} style={{ margin: '30px' }}>
        <div>
          <div className="course-list-row">
            {renderCards(message?.msg?.payload?.cards)}
          </div>
        </div>
      </div>
    } else if (message?.msg?.payload?.quick_replies) {
      return <QuickReplies
        text={(message?.msg?.payload?.text) ? (message?.msg?.payload?.text) : null}
        key={i}
        replyClick={handleQuickReplyPayload}
        speaks={message?.speaks}
        payload={message?.msg?.payload?.quick_replies} />;
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
    useEffect(() => elementRef?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }));
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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      {isOpen && <div style={{ height: 400, width: 400, marginTop: '50px' }}>
        <div className="header">
          <h3 style={{ margin: '5px' }}>Chatbot</h3>
          <p style={{ margin: '5px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>x</p>
        </div>
        <div id="chatbot" className="chatbot">
          {renderMessages(messages)}
          <AlwaysScrollToBottom />
        </div>
        <input type="text" placeholder="Type a message..." onKeyPress={handleInputKeyPress} style={{ color: 'white' }} autoFocus />
      </div>}
      { !isOpen ? <button className="waves-effect waves-light btn-large black" style={{ fontSize: '34px', cursor: 'pointer', textTransform: 'capitalize',fontFamily:'monospace' }} onClick={() => setIsOpen(!isOpen)}>chat <i className='far fa-comment-dots'></i></button> : null}
    </div>
  )
}

export default Chatbot;