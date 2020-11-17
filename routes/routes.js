/* eslint-disable no-console */
const { request } = require('express');
const CallModel = require('../models/call');
const UserModel = require('../models/user');

module.exports = (app) => {
  // render main page (optional)
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  // CREATE call
  app.post('/create_call', async (req, res) => {
    // always validate request body/parameters
    const allowedParameters = ['transcription', 'phone_number', 'callback', 'country'];
    const sanitizedBody = {};

    // sanitize request body
    allowedParameters.forEach((allowedProp) => {
      if (req.body.hasOwnProperty(allowedProp)) {
        sanitizedBody[allowedProp] = req.body[allowedProp];
      }
    });

    //validate parameters (validate all important ones)
    if (typeof sanitizedBody.transcription === 'string') {
      const newCall = new CallModel(sanitizedBody);
      const { _id } = newCall;

      // always catch potential promise errors
      try {
        await newCall.save();
        const call = await CallModel.findById(_id);
        console.log(`Created a call: ${JSON.stringify(call)}`);
        return res.status(200).json(JSON.stringify(call));
      } catch (error) {
        return res.status(500).send('Failed to create new call.');
      }
    }
    return res.status(400).send('Bad request parameter.');
  });

  // READ calls
  app.get('/get_calls', async (req, res) => {
    let calls;

    // always catch potential promise errors
    try {
      calls = await CallModel.find();
      console.log('Read all calls.');
      return res.status(200).json(JSON.stringify(calls));
    } catch (error) {
      return res.status(500).send('Failed to get calls.');
    }

  });

  // UPDATE single call by id
  app.post('/update_call', async (req, res) => {
    const allowedParameters = ['transcription', 'phone_number', 'callback', 'country'];
    const sanitizedBody = {};
    const { id } = req.query;

    // sanitize request body
    allowedParameters.forEach((allowedProp) => {
      if (req.body.hasOwnProperty(allowedProp)) {
        sanitizedBody[allowedProp] = req.body[allowedProp];
      }
    });

    // always validate request body/parameters
    if (typeof id === 'string') {
      const query = { _id: id };
      const updatedValue = { $set: { transcription: sanitizedBody.transcription } };

      // always catch potential promise errors
      try {
        await CallModel.updateOne(query, updatedValue);
        const call = await CallModel.findById(id);
        console.log(`Updated call: ${JSON.stringify(call)}`);
        return res.status(200).json(JSON.stringify(call));
      } catch (error) {
        return res.status(500).send('Failed to create new call.');
      }
    }
    return res.status(400).send('Bad request parameter.');
  });

  // DELETE all calls
  app.get('/delete_calls', async (req, res) => {
    let calls;

    // always catch potential promise errors
    try {
      await CallModel.deleteMany();
      calls = await CallModel.find();
      console.log('Deleted all calls.');
      return res.status(200).json(JSON.stringify(calls));
    } catch (error) {
      return res.status(500).send('Failed to create new call.');
    }
  });

  // CREATE user
  app.post('/create_user', async (req, res) => {
      const newUser = new UserModel(req.body);

      // always catch potential promise errors
      try {
        await newUser.save();
        return res.status(200).json(JSON.stringify(newUser));
      } catch (error) {
        return res.status(500).send('Failed to create new call.');
      }
  });
};
