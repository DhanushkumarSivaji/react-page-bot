const express = require('express');
const router = express.Router();
const chatbot = require('../chatbot/chatbot');

router.post('/df_text_query', async (req, res) => {
    try {
        let responses = await chatbot.textQuery(req.body.text,req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/df_event_query', async (req, res) => {
    try {
        let responses = await chatbot.eventQuery(req.body.event,req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router;


// export GOOGLE_APPLICATION_CREDENTIALS=/Users/macbookpro/Desktop/Dhanush/Study/dialogflow/reactpagebot-ywtn-abdfaf9e0fdd.json