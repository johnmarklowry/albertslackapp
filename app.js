// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const axios = require('axios');
const FormData = require('form-data');

const appHome = require('./appHome');
const store = require('./store');

const confirmationModal = require("./modals/albert_confirmation");
const submissionModal = require("./modals/albert_submission");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});


app.event('app_home_opened', async ({ event, context, payload }) => {
  // Display App Home
  const homeView = await appHome.createHome(event.user);
  
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: homeView
    });
    
  } catch(e) {
    console.log(e);
    app.error(e);
  }
  
});


// Listen for a slash command invocation
app.command('/albertaward', async ({ack, payload, context}) => {
    // Acknowledge the command request
    await ack();

  //Open the modal for the Albert Award submission
    try {
        const result = await app.client.views.open({
            token: context.botToken,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: payload.trigger_id,
            // View payload
            view: submissionModal()
        });
        console.log(result);
    } catch(e) {
      console.log(e);
      app.error(e);
    }
});

app.view('albert_award_modal_view_1', async ({ack, say, body, view, context, formdata, payload}) => {
    // Acknowledge the view_submission event and open the confirmation modal
    await ack({
        response_action: "update",
        view: confirmationModal()
    });


    // Assign reference values to the Albert Award submission data
    const albert_to = view.state.values.albert_nominee.albert_nominee_action.value;
    const albert_from = view.state.values.albert_nominator.albert_nominator_action.value;
    const albert_msg = view.state.values.albert_message.albert_message_action.value;
    const user = body['user']['id'];

    // Console log the values
    console.log(albert_to);
    console.log(albert_from);
    console.log(albert_msg);
    console.log(user);

    //Send the Albert Award submission data to Google Forms
    const form_data = new FormData();
    form_data.append(process.env.GOOGLE_FORMS_TO, albert_to);
    form_data.append(process.env.GOOGLE_FORMS_FROM, albert_from);
    form_data.append(process.env.GOOGLE_FORMS_MSG, albert_msg);


    let res = await axios.post(process.env.GOOGLE_FORMS_POST_ADR, form_data, {
        headers: form_data.getHeaders()
    });

    let data = res.data;
    console.log(data);
  

});

//Listen for the "Submit another Albert Award" button action
app.action("submit_another_action", async ({ ack, body, client, context, payload }) => {
  // Acknowledge the command request
  await ack();

  //Update the modal back to the initial Albert Award submission form
      try {
       const result = await client.views.update({
            view_id: body.view.id,
            // Pass a valid trigger_id within 3 seconds of receiving it
            hash: body.view.hash,
            // View payload
            view: submissionModal()
        });
        console.log(result);
    } catch(e) {
      console.log(e);
      app.error(e);
    }
  
});

app.action('albert_award_apphome', async ({ body, context, ack }) => {
  await ack();
  
  // Open the Albert submission modal from the app home screen
  const view = appHome.openModal();
  
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: view
    });
    
  } catch(e) {
    console.log(e);
    app.error(e);
  }
});


//Global error handler
app.error(async (e) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(e);
});



(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();