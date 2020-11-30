'use strict';

const dialogflow = require('dialogflow');
const mongoose = require('mongoose');
const googleAuth = require('google-oauth-jwt');
const config = require('../config/keys');
const structJson = require('./structJson');

const Registration = mongoose.model('registration');

const projectID = config.googleProjectID

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

module.exports = {
    
    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: config.googleClientEmail,
                    key: config.googlePrivateKey,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },

    textQuery: async function (text, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        return responses;
    },
    eventQuery: async function (event, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID)
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structJson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        return responses;
    },
    handleAction: function (responses) {
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendcourses.recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        }
        return responses;
    },
    saveRegistration: async function (fields) {
        const registration = new Registration({
            name: fields.name.structValue.fields.name.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try {
            let reg = await registration.save();
        } catch (err) {
            console.log(err);
        }
    }

}