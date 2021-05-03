module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit an Albert Award'
        },
        //View identifier
        callback_id: 'albert_award_modal_view_2',

        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://lh6.googleusercontent.com/wlTBu06wn2B1ro-u9fWxk-zUNu4aIVNrzyJLsTHrF7uoyuLn0yevyGK2jGKpnOYHQjS3CqeTZ2Q87kTtaMssiWfBIE6xgUs4RDragSlIYtXbypKVL3p74BQAluZNlAL1wA=w3612',
                alt_text: 'Albert award header image.'
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "Thanks for submitting an Albert Award! If you're feeling extra thankful, you can always submit another one."
                }
            },
            //Button to open a new modal with a new Albert Award submission form
            {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Submit another Albert Award"
                    },
                    value: "submit_another",
                    action_id: "submit_another_action"
                }]
            }
        ]
    };
};