module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit a Rally Award'
        },
        //View identifier
        callback_id: 'rally_award_modal_view_1',
        submit: {
            type: 'plain_text',
            text: 'Submit'
        },
        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://i.imgur.com/Q8H87rY.jpg',
                alt_text: 'Rally award header image.'
            },
              
                 
            {
                block_id: 'rally_nominee',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'To'
                },
                element: {
                    action_id: 'rally_nominee_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you sending a Rally Award to? First & last name!'
                }
            },
            {
                block_id: 'rally_nominator',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'From'
                },
                element: {
                    action_id: 'rally_nominator_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you? First & last name!'
                }
            },
            {
                block_id: 'rally_message',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'Send them a nice message.',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'rally_message_action',
                    multiline: true,
                    max_length: 700
                }
            }
        ]
    };
};