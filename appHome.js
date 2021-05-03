const JsonDB = require('node-json-db');
const db = new JsonDB('notes', true, false);

const app = require('./app');

const submissionModal = require("./modals/albert_submission");

const apiUrl = 'https://slack.com/api';



// App home screen message – Albert image header, welcome message, and start a submission button
const updateView = async (user) => {

    let blocks = [
      {
			type: "image",
			image_url: "https://lh6.googleusercontent.com/wlTBu06wn2B1ro-u9fWxk-zUNu4aIVNrzyJLsTHrF7uoyuLn0yevyGK2jGKpnOYHQjS3CqeTZ2Q87kTtaMssiWfBIE6xgUs4RDragSlIYtXbypKVL3p74BQAluZNlAL1wA=w3612",
			alt_text: "Albert award header image.",
			block_id: "albert_home_header_image"
		},
		{
			type: "header",
			text: {
				type: "plain_text",
				text: ":tada:  Welcome to the Albert Award Slack app  :tada:",
				emoji: true
			}
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "This is your destination to submit virtual Albert Awards via Slack. You can use a simple slash command or this app home screen to submit an Albert Award for your coworkers who display remarkable effort. \n \n Your submissions will always stay private, even if you use the slash command in a private message with a coworker or a public channel. So, when something good happens in Slack, go ahead and take a second right then and there to send that person (or people!) an Albert Award.",
				emoji: true
			}
		},
		{
			type: "divider"
		},
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "Getting started",
				emoji: true
			}
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "You can submit a virtual Albert Award on Slack in two ways: \n \n 1. Use the slash command:\n     •   Type /albertaward into your message bar in any direct message, public channel, or private channel\n\n 2. Use this button:",
				emoji: true
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Submit an Albert Award",
						emoji: true
					},
					value: "submit_another",
                	action_id: "albert_award_apphome"
				}
			]
		},
		{
			type: "divider"
		},
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "Submitting an Albert Award",
				emoji: true
			}
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "1. Type /albertaward into your message bar. \n \n (Hint: don't forget to include the slash at the beginning)",
				emoji: true
			}
		},
		{
			type: "image",
			image_url: "https://i.imgur.com/ckG8Nci.jpg",
			alt_text: "Albert Award slash command in the message bar"
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "2. A dialogue gives you the option to select the Albert Award slash command. \n \n Press enter or space to proceed, then press enter again to open the submission modal.",
				emoji: true
			}
		},
		{
			type: "image",
			image_url: "https://i.imgur.com/YoQUIZS.jpg",
			alt_text: "Albert Award slash command selector"
		},
      {
			type: "section",
			text: {
				type: "plain_text",
				text: "3. Fill out the form and press 'Submit'.",
				emoji: true
			}
		},
		{
			type: "image",
			image_url: "https://i.imgur.com/M5Y2ceB.jpg",
			alt_text: "Albert Award submission modal"
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "4. A successful submission will bring up the confirmation modal.",
				emoji: true
			}
		},
		{
			type: "image",
			image_url: "https://i.imgur.com/lvjeuXM.jpg",
			alt_text: "Albert Award confirmation modal."
		},
		{
			type: "section",
			text: {
				type: "plain_text",
				text: "5. You can choose to close the modal, or select 'Submit another Albert Award' to keep the party going.",
				emoji: true
			}
		}
    ];

    

    // The final view

    let view = {
        type: 'home',
        callback_id: 'home_view',
        title: {
            type: 'plain_text',
            text: 'Submit an Albert Award!'
        },
        blocks: blocks
    }

    return JSON.stringify(view);
};



// Display App Home

const createHome = async (user, data) => {
    if (data) {
        // Store in a local DB
        db.push(`/${user}/data[]`, data, true);
    }

    const userView = await updateView(user);

    return userView;
};



// Open a modal 

const openModal = () => {

    const modal = submissionModal();

    return modal;
};


module.exports = { createHome, openModal };