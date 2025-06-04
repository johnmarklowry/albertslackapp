module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit a Sidekick'
        },
        //View identifier
        callback_id: 'sidekick_modal_view_2',

        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://i.imgur.com/m3sdhI2.jpeg',
                alt_text: 'Sidekick award header image.'
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "Thanks for submitting a Sidekick Award! If you're feeling extra thankful, you can always submit another one."
                }
            },
            //Button to open a new modal with a new Albert Award submission form
            {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Submit another Sidekick Award"
                    },
                    value: "submit_another_sidekick",
                    action_id: "submit_another_sidekick_action"
                }]
            }
        ]
    };
};