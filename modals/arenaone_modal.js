module.exports = () => {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Arena One'
    },
    blocks: [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Submit your award via Arena One by clicking the button to the right, or use the `/recognize` slash command to submit via Slack.'
      },
      accessory: {
        type: 'button',
        style: 'primary',
        text: {
          type: 'plain_text',
          text: 'Visit Arena One',
          emoji: true
        },
        url: 'https://cloud.workhuman.com/microsites/t/home?client=6316'
      }
    }]
  };
}