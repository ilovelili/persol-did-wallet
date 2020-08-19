# Persol DID wallet

Persol DID wallet is a reference implementation for [Daf](https://github.com/uport-project/daf) framework.

## Setup

### Longer - Contributors (iOS)

If you will be contributing to this project you will need to install [bundler](https://bundler.io/) to manage ruby gems so the versions installed in the project stay consistent with our CI

Install Bundler (You do not need to be in the project directory for this command)

```bash
gem install bundler
```

From the root of the project directory run:

```bash
bundle install
```

This installs cocopods and fastlane into your project. From here we will always use the local version. The Gems are shared accross both iOS and Android so no need to install twice.

To install pods use:

```bash
yarn
cd ios && bundle exec pod install
```

### Quick - Non Contributors (iOS)

You can safely install pods directly without bundler. You will need to have cocopods installed globally on your machine.

```bash
yarn
cd ios && pod install
```

## Running locally

```bash
yarn start
```

in another terminal

```bash
yarn android OR
yarn ios
```

## Environment variables

[React-native-config](https://github.com/luggit/react-native-config) is being used for environment variables

Add variables to `.env`. You may want to replace your `.env` file during build time.

```bash
TGE_URI=https://custom.my-tgserver.com
TGE_WS_URI=wss://custom.my-tgserver.com
```

In code:

```jsx
import Config from "react-native-config";

console.log(Config.ENV); // dev
```

To use a different env file set `ENVFILE` variable:

```bash
ENVFILE=.env.production react-native run-android
```
