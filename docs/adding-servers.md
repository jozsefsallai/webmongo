# Adding Servers

Adding servers to **WebMongo** is a rather easy task, but it does have some
prerequisites. You can access the "[Add New Server][add-new-server]" page from
the home page.

## Prerequisites

In order to successfully connect to a MongoDB server, you will need to:

- allow connection access to `webmongo.now.sh` or the IP address of your
self-hosted instance (or whitelist every connection)
- create a user with admin privileges

## "Add New Server" Page

On this page you can add a new server to WebMongo. You can give it a friendly
name, which will be displayed in the server list on the front page of the app.
After that, all you need to do is to provide a valid MongoDB connection string
and you should be good to go!

::: tip
Remember - **WebMongo** does not store anything to a remote server! It all
happens locally on your device.
:::

Once you've added a server, you can go back to the home page and select your
newly added server to list all of its databases.

[add-new-server]: https://webmongo.now.sh/new "Open in the production app"
