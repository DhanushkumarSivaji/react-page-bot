'use strict';

const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structJson = require('./structJson');

const projectID = config.googleProjectID

const credentials = {
    client_email : config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectID,credentials});

module.exports = {

    textQuery: async function(text,userID,parameters={}){
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID+userID)
        const request = {
            session: sessionPath,
            queryInput:{
                text:{
                    text:text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams:{
                payload:{
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        return responses;
    },
    eventQuery: async function(event,userID,parameters={}){
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID+userID)
        const request = {
            session: sessionPath,
            queryInput:{
                event:{
                    name:event,
                    parameters:structJson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        return responses;
    },
    handleAction: function(responses){
        return responses;
    }

}