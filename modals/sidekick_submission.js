module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Submit a Sidekick'
        },
        //View identifier
        callback_id: 'sidekick_modal_view_1',
        submit: {
            type: 'plain_text',
            text: 'Submit'
        },
        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://i.imgur.com/m3sdhI2.jpeg',
                alt_text: 'Sidekick award header image.'
            },
            {
                block_id: 'sidekick_nominee',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'To'
                },
                element: {
                    action_id: 'sidekick_nominee_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you sending the Sidekick Award to? First & last name!'
                }
            },
            {
                block_id: 'sidekick_nominator',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'From'
                },
                element: {
                    action_id: 'sidekick_nominator_action',
                    type: 'plain_text_input'
                },
                hint: {
                    type: 'plain_text',
                    text: 'Who are you? First & last name!'
                }
            },
            {
                block_id: 'sidekick_message',
                type: 'input',
                label: {
                    type: 'plain_text',
                    text: 'Tell us the awesome thing they did to deserve a Sidekick.',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'sidekick_message_action',
                    multiline: true,
                    max_length: 700
                }
            },
            {
                block_id: 'sidekick_albert_checkbox',
                type: 'input',
                optional: true,
                  element: {
                    type: 'checkboxes',
                    options: [
                      {
                        text: {
                          type: 'mrkdwn',
                          text: '*Yes, also submit this as an Albert Award.*'
                        },
                        value: 'true'
                      }
                    ],
                    action_id: 'sidekick_albert_checkbox_action'
                  },
                  label: {
                    type: 'plain_text',
                    text: 'Submit this as an Albert Award as well?',
                    emoji: true
                  }
              }
        ]
    };
};