const sendgrid = require('sendgrid');
// Using "helper" to be consistent with sendgrid docs
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // initialize with "subject" & "recipients" properties off of "survey"
  // and "content" (i.e. email body) from "surveyTemplate(survey)"
  constructor({ subject, recipients }, content) {
    super();

    // Property that represents the sendgrid library to use to communicate this mailer to the sendgrid API
    this.sgApi = sendgrid(keys.sendGridKey);
    // helper.Email & helper.Content provided by sendgrid library
    // Whenever an instance of Mailer is made, that instance will have a specific "from_email" property
    // with the email address it appears to be sent from
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    // Body in the email will be in HTML and an output of the email template passed to the constructor above
    this.body = new helper.Content('text/html', content);
    // List of the recipients--subdoc collection that's an array of objects with an email address inside them--
    // using our own custom helper function to extract just the email address value from them
    this.recipients = this.formatAddresses(recipients);

    // Register "addContent" from Mail base class to make sure this.body gets added as the actual content to the mailer
    this.addContent(this.body);
    // Enable click tracking inside of email with our own cutom helper function.
    // Sendgrid scans the email, replaces every link with their own special one
    this.addClickTracking();
    // Our own custom helper function to take formatted list of recipients and process list of recipients
    // to register it with the actual email
    this.addRecipients();
  }

  // CUSTOM HELPER FUNCTIONS
  formatAddresses(recipients) {
    // Use destructuring to take just the email property off of each object in recipients
    // NOTE: you can't have destructuring with an arrow function without extra parens
    return recipients.map(({ email }) => {
      // Do a little initial formatting on the email as an array of helper objects before returning it
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    // Two helper variables to do some setup
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    // Pass click tracking settings above to tracking settings
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    // Iterate over list of recipients and make use of "personalize" object declared above for each recipient
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // "addPersonalization" is defined by the Mail base class and is passed the entire "personalize" object
    this.addPersonalization(personalize);
  }

  // Make async API request to send out the mailer
  async send() {
    // Pass configuration options & convert properties set above to JSON using Mail base class function
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    // and send to sendgrid
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
