module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit a Rally Award'
        },
        //View identifier
        callback_id: 'rally_award_modal_view_2',

        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://i.imgur.com/Q8H87rY.jpg',
                alt_text: 'Rally award header image.'
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "Thanks for submitting a Rally Award! If you're feeling extra thankful, you can always submit another one."
                }
            },
            //Button to open a new modal with a new Albert Award submission form
            {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Submit another Rally Award"
                    },
                    value: "submit_another_rally",
                    action_id: "submit_another_rally_act"
                }]
            }
        ]
    };
};