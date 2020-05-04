<p align="center">
  <img alt="WebMongo" src="https://github.com/jozsefsallai/webmongo/blob/master/static/assets/images/logo.svg" width="128" />
</p>

<h1 align="center">WebMongo (beta)</h1>

<p align="center">
  A fast and secure web UI for managing MongoDB servers.
  <strong>See this app in action:</strong> https://webmongo.now.sh
</p>

<p align="center">
  <a href="https://github.com/jozsefsallai/webmongo/actions"><img src="https://img.shields.io/github/workflow/status/jozsefsallai/webmongo/Continuous%20Integration?style=flat-square" alt="CI status" /></a>
  <a href="https://david-dm.org/jozsefsallai/webmongo"><img src="https://img.shields.io/david/jozsefsallai/webmongo?style=flat-square" alt="Dependency Status" /></a>
  <a href="https://github.com/jozsefsallai/webmongo/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/jozsefsallai/webmongo?style=flat-square" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="https://vercel.com/new/project?template=jozsefsallai/webmongo"><img width="128" src="https://vercel.com/button" alt="One-click Deployment" /></a>

---

## Motivation and Project Description

Currently, there are no easy ways of managing MongoDB servers from multiple devices. You have to download
a client made specifically for the platform you're using. This isn't convenient, as it doesn't only require
having to find a good client, but also waiting for it to install and having to re-add your servers on every
device.

It would be great if managing MongoDB servers was doable through a web interface, using nothing but your
web browser alone. But then comes the question: is it really a good idea to store all your connection
strings on a remote server? What if someone maliciously gains access to the database and manages to decrypt
your connection strings? Having a centralized user database also means they are prone to getting their
accounts compromised if they don't secure their account well enough.

This is where WebMongo comes into play. WebMongo is a web application that allows you to have your own,
decentralized database of MongoDB servers without having to deploy anything to your server at all. Instead
of storing your connection strings in a remote database, it stores them on your device using
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). You can then export
your data to an encrypted file using a passphrase and import this file on a different device. You can use
WebMongo to list, edit, or delete your documents from an infinite number of servers, or create new ones.

## Tech

WebMongo is a [Sapper](https://sapper.svelte.dev/) application that uses [Express](https://expressjs.com/)
and the [official MongoDB Node.js driver](https://github.com/mongodb/node-mongodb-native) to process your
queries and requests. It deploys to [now.sh](https://zeit.co/) automatically. For storing your
servers/connection strings, WebMongo uses your browser's `localStorage`.

## Deploying to your own server

Thanks to WebMongo's open-source nature, deploying your very own instance yourself should take no more than
a few minutes. The production app (https://webmongo.now.sh) doesn't keep any logs of your connection strings,
requests, and their results, but if you're not comfortable using the official app, you can deploy it yourself.

> **WARNING!** If you deploy WebMongo to a server with MongoDB installed, you can access that server using
> the `mongodb://127.0.0.1` connection string. Please keep in mind that doing this will make your MongoDB
> server vulnerable to attacks, even if you have all outbound connections disabled. To mitigate this, you
> should either password-protect your WebMongo instance (still not 100% secure, but better than nothing)
> or deploy it to [Vercel](https://vercel.com) or a different server and give network access to that server.

This guide assumes you have Node.js installed on your machine.

**1. Clone the repository:**

```sh
git clone git@github.com:jozsefsallai/webmongo.git
cd webmongo
```

**2. Install the dependencies:**

```
npm i
```

**3. Build the app:**

```
npm run build
```

**4. Start the application:**

```
npm run start
```

By default, the server will listen on port `3000`. If you want to start it on a different port, use the
following command instead:

```sh
PORT=8000 npm run start
```

...or if you're on Windows:

```
set PORT=8000
npm run start
```

If you want the app to run forever, you can use a tool such as [pm2](https://www.npmjs.com/package/pm2).
You can add `path/to/webmongo/__sapper__/build/index.js` as your startup script.

## Planned Features and TODOs
- [x] feat: Add, change, and remove collections
- [x] feat: Lock list of servers/connection strings with a password (similarly to how exporting works)
- [ ] todo: Write better user guide

## License

MIT. This project is in no way affiliated or endorsed by MongoDB, Inc. MongoDB and the leaf logo are a
trademark of MongoDB, Inc.
