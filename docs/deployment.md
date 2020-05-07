# Deployment

Thanks to WebMongo's open-source nature, deploying your very own instance
yourself should take no more than a few minutes. The [production app][webmongo]
doesn't keep any logs of your connection strings, requests, and their results,
but if you're not comfortable using the official app, you can deploy it
yourself.

## Deploying to Vercel

Deploying **WebMongo** to [Vercel][vercel] (formerly known as ZEIT Now) is as
simple as a few clicks. All you have to do is click on the following button and
follow the on-screen instructions:

<center>
  <a href="https://vercel.com/new/project?template=jozsefsallai/webmongo">
    <img width="128" src="https://vercel.com/button" alt="Vercel" />
  </a>
</center>

## Deploying to Your Own Server

::: warning
If you deploy WebMongo to a server with MongoDB installed, you can access that
server using the `mongodb://127.0.0.1` connection string. Please keep in mind
that doing this will make your MongoDB server vulnerable to attacks, even if you
have all outbound connections disabled. To mitigate this, you should either
password-protect your WebMongo instance (still not 100% secure, but better than
nothing) or [deploy it to Vercel](#deploying-to-vercel) or a different server
and give network access to that server.
:::

This guide assumes you have [Node.js][node] installed on your machine.

**1. Clone the repository:**

```sh
git clone git@github.com:jozsefsallai/webmongo.git
cd webmongo
```

**2. Install the dependencies:**

```sh
npm i
```

**3. Build the app:**

```sh
npm run build
```

**4. Start the application:**

```sh
npm run start
```

By default, the server will listen on port `3000`. If you want to start it on a
different port, use the following command instead:

```sh
PORT=8000 npm run start
```

...or if you're on Windows:

```bat
set PORT=8000
npm run start
```

### Continuous Running (with PM2)

I personally recommend using [pm2][pm2] to keep your **WebMongo** instance up
24/7.

```sh
npm i -g pm2
```

A minimal pm2 configuration file would look like this:

```json
// webmongo.config.json

{
  "name": "webmongo",
  "script": "/path/to/your/webmongo/__sapper__/build/index.js"
}
```

You can then start the process with the following command:

```sh
pm2 start webmongo.config.json
```

[webmongo]: https://webmongo.now.sh "Open WebMongo"
[vercel]: https://vercel.com "Visit Vercel's website"
[node]: https://nodejs.org "Visit the Node.js website"
[pm2]: https://npmjs.com/package/pm2 "PM2 npm page"
