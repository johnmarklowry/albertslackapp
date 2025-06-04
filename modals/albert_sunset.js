module.exports = () => {
    return {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Albert Awards'
        },

        blocks: [{
                type: 'image',
                block_id: 'image4',
                image_url: 'https://lh6.googleusercontent.com/wlTBu06wn2B1ro-u9fWxk-zUNu4aIVNrzyJLsTHrF7uoyuLn0yevyGK2jGKpnOYHQjS3CqeTZ2Q87kTtaMssiWfBIE6xgUs4RDragSlIYtXbypKVL3p74BQAluZNlAL1wA=w3612',
                alt_text: 'Albert award header image.'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: "Thanks for being an Albert Award user! As of 10/10, Albert Awards are being sunset and Team One is launching a new employee recognition program. Please click the button below to go there."
                }
            },
            {
                type: 'actions',
                elements: [{
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Go to Arena One'
                    },
                    url: 'https://cloud.workhuman.com/microsites/t/home?client=6316' // Remember to replace with your URL
                }]
            }
        ]
    };
};