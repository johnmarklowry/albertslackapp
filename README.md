Albert Award Slack App
=================

The Albert Award Slack app is a Slack app developed to make it easy to submit a Google Form from Slack. In this case, it's dedicated to a specific form for submitting an Albert Award, where team members can recognize each other for remarkable effort.

It's built on [Bolt](https://slack.dev/bolt)  – the Javascript-based framework for Slack apps.

Project files
------------

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server.
- `.env` is where the Slack app's authorization token and signing secret reside, as well as the Google form HTTP POST URL and entry keys.
- The `modals/` folder contains the modal views that are used throughout the app.
- `appHome.js` contains the app's home screen, where you can find info about the app and usage instructions.
- `store.js` is a future datastore, if any future functionality needs it (and an easy way to get user info in a usable state).


\ ゜o゜)ノ
