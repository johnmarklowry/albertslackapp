module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit an Albert Award'
        },
        //View identifier
        callback_id: 'albert_award_modal_view_1',
        submit: {
            type: 'plain_text',
            text: 'Submit'
        },
        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://lh6.googleusercontent.com/wlTBu06wn2B1ro-u9fWxk-zUNu4aIVNrzyJLsTHrF7uoyuLn0yevyGK2jGKpnOYHQjS3CqeTZ2Q87kTtaMssiWfBIE6xgUs4RDragSlIYtXbypKVL3p74BQAluZNlAL1wA=w3612',
                alt_text: 'Albert award header image.'
            },
            {
                block_id: 'albert_nominee',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'To'
                },
                element: {
                    action_id: 'albert_nominee_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you sending the Albert Award to?'
                }
            },
            {
                block_id: 'albert_nominator',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'From'
                },
                element: {
                    action_id: 'albert_nominator_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you?'
                }
            },
            {
                block_id: 'albert_message',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'Send them a nice message.',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'albert_message_action',
                    multiline: true
                }
            }
        ]
    };
};