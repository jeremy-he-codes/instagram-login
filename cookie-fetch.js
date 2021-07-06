const express = require('express');
const router = express.Router();
const { IgApiClient } = require('./dist');
const { sample } = require('lodash');

router.post('/', getCookie);

async function getCookie(req, res, next) {
  const { username, password } = req.body;

  const ig = new IgApiClient();
  // You must generate device id's before login.
  // Id's generated based on seed
  // So if you pass the same value as first argument - the same id's are generated every time
  ig.state.generateDevice(username);

  try {
    // await ig.simulate.preLoginFlow();
    const loggedIn = await ig.account.loginEnhanced(username, password);
    // console.log('Logged in', loggedIn);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    // process.nextTick(async () => await ig.simulate.postLoginFlow());

    // await ig.account.logout();
    res.status(200).json(loggedIn);
  } catch (err) {
    console.log('Error', err);
    res.status(500).json(JSON.stringify(err));
  }
}

module.exports = router;
