/* eslint-disable no-console */
const CallModel = require('../models/call');

module.exports = (app) => {
  // render mian page
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  // create call
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

  // get calls
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

  // update call
  app.post('/update_call', async (req, res) => {
    const { id, message } = req.body;

    // always validate request body/parameters
    if (typeof message === 'string' && typeof id === 'string') {
      const query = { _id: id };
      const updatedValue = { $set: { transcription: message } };

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

  // get calls
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
};
