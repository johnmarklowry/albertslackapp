// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const axios = require("axios");
const FormData = require("form-data");

const appHome = require("./appHome");
const store = require("./store");

const confirmationModal = require("./modals/albert_confirmation");
const submissionModal = require("./modals/albert_submission");

const sidekickModal = require("./modals/sidekick_submission");
const sidekickconfirmationModal = require("./modals/sidekick_confirmation");

const introModal = require("./modals/FTE_modal");
const arenaOneModal = require("./modals/arenaone_modal");

const rallySubmitModal = require("./modals/rally_submission");
const rallyConfirmModal = require("./modals/rally_confirmation");

const sunsetModal = require("./modals/albert_sunset");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event(
  "app_home_opened",
  async ({ event, context, payload, body, message }) => {
    // Display App Home
    const homeView = await appHome.createHome(event.user);

    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: body.event.user,
      include_locale: true,
    });

    const userInfo_realname = userInfo.user.real_name;

    try {
      const result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: homeView,
      });
      //Console log the successful delivery of the app home screen. Update to console.log(result) to view actual payload delivery.
      console.log(userInfo_realname, "opened the home screen.");
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);


app.command(
  "/albertaward",
  async ({ ack, payload, context, body, event, command }) => {
    // Acknowledge the command request
    await ack();

    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: command.user_id,
    });

    const userInfo_realname = userInfo.user.real_name;

    //Open the modal for the Albert Award submission
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: payload.trigger_id,
        // View payload
        view: introModal(),
      });

      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(userInfo_realname, "used the Rally Award slash command!");
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);


app.command(
  "/rally",
  async ({ ack, payload, context, body, event, command }) => {
    // Acknowledge the command request
    await ack();

    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: command.user_id,
    });

    const userInfo_realname = userInfo.user.real_name;

    //Open the modal for the Albert Award submission
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: payload.trigger_id,
        // View payload
        view: introModal(),
      });

      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(userInfo_realname, "used the Rally Award slash command!");
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);


app.command(
  "/rallyaward",
  async ({ ack, payload, context, body, event, command }) => {
    // Acknowledge the command request
    await ack();

    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: command.user_id,
    });

    const userInfo_realname = userInfo.user.real_name;

    //Open the modal for the Albert Award submission
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: payload.trigger_id,
        // View payload
        view: introModal(),
      });

      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(userInfo_realname, "used the Rally Award slash command!");
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);


app.view('intro_modal_callback', async ({ ack, body, view, context }) => {
  await ack();
  
  const q1Response = view.state.values.question_1.question_1_action.selected_option.value;
  const q2Response = view.state.values.question_2.question_2_action.selected_option.value;
  
  if (q1Response === 'yes' && q2Response === 'yes') {
    // Open the Arena One link modal
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: arenaOneModal()
    });
  } else {
    // Open the existing rally modal
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: rallySubmitModal()
    });
  }
});


app.view(
  "albert_award_modal_view_1",
  async ({ ack, say, body, view, context, formdata, payload }) => {
    // Acknowledge the view_submission event and open the confirmation modal
    await ack({
      response_action: "update",
      view: confirmationModal(),
    });

    // Assign reference values to the Albert Award submission data
    const albert_to =
      view.state.values.albert_nominee.albert_nominee_action.value;
    const albert_from =
      view.state.values.albert_nominator.albert_nominator_action.value;
    const albert_msg =
      view.state.values.albert_message.albert_message_action.value;
    const user = body["user"]["id"];

    // For testing only - Console log the Albert submission values
    //console.log("To:",albert_to);
    //console.log("From:",albert_from);
    //console.log("Message:",albert_msg);
    //console.log("User:",user);

    //Console log a successful submission
    console.log(albert_from, "submitted an Albert Award!");

    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_CONFIRMATION_CHANNEL,
      text: `${view.state.values.albert_nominator.albert_nominator_action.value} submitted an Albert Award for ${view.state.values.albert_nominee.albert_nominee_action.value}!`,
    });

    //Send the Albert Award submission data to Google Forms
    const form_data = new FormData();
    form_data.append(process.env.GOOGLE_FORMS_TO, albert_to);
    form_data.append(process.env.GOOGLE_FORMS_FROM, albert_from);
    form_data.append(process.env.GOOGLE_FORMS_MSG, albert_msg);
    
    const backup_form_data = new FormData();
    backup_form_data.append(process.env.BACKUP_FORM_TO, albert_to);
    backup_form_data.append(process.env.BACKUP_FORM_FROM, albert_from);
    backup_form_data.append(process.env.BACKUP_FORM_MSG, albert_msg);

    let res = await axios.post(process.env.GOOGLE_FORMS_POST_ADR, form_data, {
      headers: form_data.getHeaders(),
    });
    
    let resbackup = await axios.post(process.env.BACKUP_FORM_POST_ADR, backup_form_data, {
      headers: backup_form_data.getHeaders(),
    });

    // Console log data for the Google Form submission
    //let data = res.data;
    //console.log(data);
    
    //let backup_data = resbackup.data;
    //console.log(backup_data);
  }
);



app.view(
  "rally_award_modal_view_1",
  async ({ ack, say, body, view, context, formdata, payload }) => {
    // Acknowledge the view_submission event and open the confirmation modal
    await ack({
      response_action: "update",
      view: rallyConfirmModal(),
    });

    // Assign reference values to the Rally Award submission data
    const rally_to =
      view.state.values.rally_nominee.rally_nominee_action.value;
    const rally_from =
      view.state.values.rally_nominator.rally_nominator_action.value;
    const rally_msg =
      view.state.values.rally_message.rally_message_action.value;
    const user = body["user"]["id"];

    // For testing only - Console log the Rally submission values
    //console.log("To:",rally_to);
    //console.log("From:",rally_from);
    //console.log("Message:",rally_msg);
    //console.log("User:",user);

    //Console log a successful submission
    console.log(rally_from, "submitted a Rally Award!");

    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_CONFIRMATION_CHANNEL,
      text: `${view.state.values.rally_nominator.rally_nominator_action.value} submitted a Rally Award for ${view.state.values.rally_nominee.rally_nominee_action.value}!`,
    });

    //Send the Albert Award submission data to Google Forms
    const form_data = new FormData();
    form_data.append(process.env.RALLY_FORM_TO, rally_to);
    form_data.append(process.env.RALLY_FORM_FROM, rally_from);
    form_data.append(process.env.RALLY_FORM_MSG, rally_msg);
    
    const backup_form_data = new FormData();
    backup_form_data.append(process.env.RALLY_TO_BACKUP, rally_to);
    backup_form_data.append(process.env.RALLY_FROM_BACKUP, rally_from);
    backup_form_data.append(process.env.RALLY_MSG_BACKUP, rally_msg);

    let res = await axios.post(process.env.RALLY_FORM_POST_ADDRESS, form_data, {
      headers: form_data.getHeaders(),
    });
    
    let resbackup = await axios.post(process.env.RALLY_POST_BACKUP, backup_form_data, {
      headers: backup_form_data.getHeaders(),
    });

    // Console log data for the Google Form submission
    //let data = res.data;
    //console.log(data);
    
    //let backup_data = resbackup.data;
    //console.log(backup_data);
  }
);



//Listen for the "Submit another Albert Award" button action
app.action(
  "submit_another_action",
  async ({ ack, body, client, context, payload }) => {
    // Acknowledge the command request
    await ack();

    //Update the modal back to the initial Albert Award submission form
    try {
      const result = await client.views.update({
        view_id: body.view.id,
        // Pass a valid trigger_id within 3 seconds of receiving it
        hash: body.view.hash,
        // View payload
        view: submissionModal(),
      });
      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(
        "Submission modal delivered successfully. (From submit another award button)"
      );
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);


//Listen for the "Submit another Rally Award" button action
app.action(
  "submit_another_rally_act",
  async ({ ack, body, client, context, payload }) => {
    // Acknowledge the command request
    await ack();

    //Update the modal back to the initial Albert Award submission form
    try {
      const result = await client.views.update({
        view_id: body.view.id,
        // Pass a valid trigger_id within 3 seconds of receiving it
        hash: body.view.hash,
        // View payload
        view: rallySubmitModal(),
      });
      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(
        "Submission modal delivered successfully. (From submit another award button)"
      );
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);

//Listen for the "Arena One" button action to close modal
app.action(
  "arena-one-out-action",
  async ({ ack, body, client, context, payload }) => {
    // Acknowledge the command request
    await ack({
      response_action: "clear"
    });

      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(
        "Someone clicked out to Arena One."
      );
    } 
);



app.action("albert_award_apphome", async ({ body, context, ack }) => {
  await ack();

  // Open the Albert submission modal from the app home screen
  const view = appHome.openModal();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: view,
    });
    //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
    console.log(
      "Submission modal delivered successfully. (From app home screen)"
    );
  } catch (e) {
    console.log(e);
    app.error(e);
  }
});

/* Listening for Reaction Emojis to deliver an ephemeral response from the Albert Award bot*/
// Albert Award app *must* be in the channel of the message
// Event subscription: reaction_added
// Required scope(s): reactions:read
app.event(
  "reaction_added",
  async ({ event, client, payload, ack, context, say }) => {
    const {
      reaction,
      user,
      item: { channel, ts },
    } = event;

    if (event.reaction === "albertaward" || event.reaction === "arena-one") {
      try {
        await client.conversations.join({
          channel,
          //types: public_channel,private_channel
        });
      } catch (e) {
        console.log(e);
        app.error(e);
      }
      //Open the modal for the Albert Award submission
      await client.chat.postEphemeral({
        user,
        channel,
        message_ts: ts,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "You used the :albertaward: Albert Award or :arena-one: Arena One emojis, so it looks like you might want to send someone a Rally Award. If so, just hit the 'Open' button below!",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Open Rally Award form",
                },
                value: "submit_another",
                action_id: "albert_award_emoji_ephemeral",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: ":x: Close",
                },
                value: "submit_another",
                action_id: "albert_award_emoji_ephemeral_close",
              },
            ],
          },
        ],
      });
      console.log("Ephemeral delivered successfully. (From emoji response)");
    }
  }
);

app.action(
  "albert_award_emoji_ephemeral",
  async ({ body, context, ack, respond }) => {
    await ack();

    await respond({
      delete_original: true,
    });

    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: rallySubmitModal(),
      });
      //Console log the successful delivery of the modal. Update to console.log(result) to view actual modal payload delivery.
      console.log(
        "Submission modal delivered successfully. (From emoji response)"
      );
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);

app.action("albert_award_emoji_ephemeral_close", async ({ ack, respond }) => {
  await ack();

  await respond({
    delete_original: true,
  });

  console.log("Ephemeral closed without opening form.");
});

//Global error handler
app.error(async (e) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(e);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
