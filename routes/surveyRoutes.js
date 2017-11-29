const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// Workaround for testing framework, so mongoose doesn't complain about requiring in the same model file multiple times
const Survey = mongoose.model('Survey');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  // Must be logged in and have credits to send a survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // Create an instance of a new survey
    const { title, subject, body, recipients } = req.body;
    // Create an instance of Survey with properties from body
    const survey = new Survey({
      title,
      subject,
      body,
      // Array of objects containing email addresses to convert into array of strings
      // for every email address return an object with property of email and user's email address.
      // Emails separated by commas and spaces, trailing/leading spaces removed.
      // NOTE: return keyword and curlies not needed for 1 expression in arrow-function,
      // but additional parens added around object to clarify it's a shortened object and curlies aren't a function body
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // Use mongoose generated id
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email with a template that is passed the survey model
    // 1st arg is object with "subject" & "recipients", 2nd arg is the HTML body to use inside the email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      // Once user has been saved, user is "stale", so we use it from here on as a saved variable
      const user = await req.user.save();
      // Send back the new value of credits
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
