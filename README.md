Albert Award Slack App
=================

The Albert Award Slack app is a Slack app dedicated to making it easier to recognize your peers for the remarkable effort they put in.

It's built on [Bolt](https://slack.dev/bolt)  – the Javascript-based framework for Slack apps.

Built by John Mark Lowry

For questions:
johnmark.lowry@gmail.com
225-810-7672

Project files
------------

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server.
- `.env` is where the Slack app's authorization token and signing secret reside, as well as the Google form HTTP POST URL and entry keys.
- The `modals/` folder contains the modal views that are used throughout the app.
- `appHome.js` contains the app's home screen, where you can find info about the app and usage instructions.
- `store.js` is a future datastore, if any future functionality needs it (and an easy way to get user info in a usable state).


\ ゜o゜)ノ
