module.exports = () => {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Rally Award'
    },
    callback_id: 'intro_modal_callback',
    submit: {
      type: 'plain_text',
      text: 'Next'
    },
    blocks: [{
      block_id: 'question_1',
      type: 'input',
      label: {
        type: 'plain_text',
        text: 'Do you have an Arena One account?'
      },
      element: {
        action_id: 'question_1_action',
        type: 'radio_buttons',
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Yes'
            },
            value: 'yes'
          },
          {
            text: {
              type: 'plain_text',
              text: 'No'
            },
            value: 'no'
          }
        ]
      }
    },
    {
      block_id: 'question_2',
      type: 'input',
      label: {
        type: 'plain_text',
        text: 'Are you submitting an award for someone with an Arena One account?'
      },
      element: {
        action_id: 'question_2_action',
        type: 'radio_buttons',
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Yes'
            },
            value: 'yes'
          },
          {
            text: {
              type: 'plain_text',
              text: 'No'
            },
            value: 'no'
          }
        ]
      }
    }]
  };
}