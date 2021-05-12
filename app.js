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


app.event('app_home_opened', async ({ event, context, payload, body, message }) => {
  // Display App Home
  const homeView = await appHome.createHome(event.user);
  
  const userInfo = await app.client.users.info({
            token: context.botToken,
            user: body.event.user,
            include_locale: true,
        })
  
  const userInfo_realname = userInfo.user.real_name
  
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: homeView
    });
    //Console log the successful delivery of the app home screen. Update to console.log(result) to view actual payload delivery.
      console.log(userInfo_realname, "opened the home screen.");
    
  } catch(e) {
    console.log(e);
    app.error(e);
  }
  
});


// Listen for a slash command invocation
app.command('/albertaward', async ({ack, payload, context, body, event, command}) => {
    // Acknowledge the command request
    await ack();
  
      const userInfo = await app.client.users.info({
            token: context.botToken,
            user: command.user_id
        })
  
      const userInfo_realname = userInfo.user.real_name
  
  //Open the modal for the Albert Award submission
    try {
        const result = await app.client.views.open({
            token: context.botToken,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: payload.trigger_id,
            // View payload
            view: submissionModal()
        });
      
        //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
        console.log(userInfo_realname, "used the slash command!");
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
  
    // For testing only - Console log the Albert submission values
    //console.log("To:",albert_to);
    //console.log("From:",albert_from);
    //console.log("Message:",albert_msg);
    //console.log("User:",user);
  
    //Console log a successful submission
    console.log(albert_from, "submitted an Albert Award!");
  
    //Send the Albert Award submission data to Google Forms
    const form_data = new FormData();
    form_data.append(process.env.GOOGLE_FORMS_TO, albert_to);
    form_data.append(process.env.GOOGLE_FORMS_FROM, albert_from);
    form_data.append(process.env.GOOGLE_FORMS_MSG, albert_msg);


    let res = await axios.post(process.env.GOOGLE_FORMS_POST_ADR, form_data, {
        headers: form_data.getHeaders()
    });

    //Console log data for the Google Form submission
    //let data = res.data;
    //console.log(data);
  

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
        //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
        console.log("Submission modal delivered successfully. (From submit another award button)");
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
    //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log("Submission modal delivered successfully. (From app home screen)");
    
  } catch(e) {
    console.log(e);
    app.error(e);
  }
});



/* Listening for Reaction Emojis to deliver an ephemeral response from the Albert Award bot*/
// Albert Award app *must* be in the channel of the message
// Event subscription: reaction_added
// Required scope(s): reactions:read
app.event('reaction_added', async ({ event, client, payload, ack, context, say}) => {
  const { reaction, user, item: { channel, ts } } = event;

  if (reaction.includes('albertaward')) {
    
    try {
      await client.conversations.join({
        channel,
        //types: public_channel,private_channel
      });
      
    } catch(e) {
      console.log(e);
      app.error(e);
    }
    //Open the modal for the Albert Award submission
    await client.chat.postEphemeral({
      user,
      channel,
      message_ts: ts,
      blocks: [{
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "You used the :albertaward: Albert Award emoji, so it looks like you might want to send someone an Albert Award. If so, just hit the 'Open' button below!"
                }
            },
            {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Open Albert Award form"
                    },
                    value: "submit_another",
                    action_id: "albert_award_emoji_ephemeral"
                },
                  {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: ":x: Close"
                    },
                    value: "submit_another",
                    action_id: "albert_award_emoji_ephemeral_close"
                }
                          ]
              }
              ]
    });
    console.log("Ephemeral delivered successfully. (From emoji response)");
  }

});


app.action("albert_award_emoji_ephemeral", async ({ body, context, ack, respond }) => {
  await ack();

  await respond({
    delete_original: true
  });
  
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: submissionModal()
    });
    //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
    console.log(
      "Submission modal delivered successfully. (From emoji response)"
    );
  } catch (e) {
    console.log(e);
    app.error(e);
  }
});

app.action("albert_award_emoji_ephemeral_close", async ({ ack, respond }) => {
  await ack();

  await respond({
    delete_original: true
  });
  
  console.log(
      "Ephemeral closed without opening form."
    );
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
