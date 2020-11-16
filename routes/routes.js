const CallModel = require('../models/call');

module.exports = (app) => {
  // render mian page
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  // create call
  app.post('/create_call', async (req, res) => {
    const newCall = new CallModel(req.body);
    const { _id } = newCall;
    try {
      await newCall.save();
    } catch (error) {
      return res.status(500).send('Failed to create new call.');
    }
    const call = await CallModel.findById(_id);
    console.log(`Created a call: ${JSON.stringify(call)}`);
    return res.status(200).json(JSON.stringify(call));
  });

  // get calls
  app.get('/calls', async (req, res) => {
    // https://mongoosejs.com/docs/promises.html
    const calls = await CallModel.find();
    console.log('Read all calls.');
    res.status(200).json(JSON.stringify(calls));
  });

  // update
  // todo

  // get calls
  app.get('/delete_calls', async (req, res) => {
    await CallModel.deleteMany();
    const calls = await CallModel.find();
    console.log('Deleted all calls.');
    res.status(200).json(JSON.stringify(calls));
  });
};
