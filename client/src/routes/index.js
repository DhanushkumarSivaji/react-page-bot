import React from 'react';
import {BrowserRouter ,Route} from 'react-router-dom';
import Landing from "../components/pages/Landing";
import About from "../components/pages/About";
import Shop from "../components/shop/Shop";
import Header from "../components/header";
import Chatbot from "../components/chatbot/Chatbot";

function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/shop" component={Shop}/>
                <Route exact path="/about" component={About}/>
                <Chatbot/>
            </BrowserRouter>
        </div>
    )
}

export default Routes;