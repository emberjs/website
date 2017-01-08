To deploy an Ember application simply transfer the output from `ember build` to a web server.
This can be done with standard Unix file transfer tools such as `rsync` or `scp`.
There are also services that will let you deploy easily.

## Deploying with scp

You can deploy your application to any web server by copying the output from `ember build` to any web server:

```shell
ember build
scp -r dist/* myserver.com:/var/www/public/
```

## Deploying to surge.sh

[Surge.sh](http://surge.sh/) allows you to publish any folder to the web for free.
To deploy an Ember application you can simply deploy the folder produced by `ember build`.

You will need to have the surge cli tool installed:

```shell
npm install -g surge
```

Then you can use the `surge` command to deploy your application.
Note you will also need to provide a copy of index.html with the filename 200.html
so that surge can support Ember's client-side routing.

```shell
ember build --environment=development
cd dist
cp index.html 200.html
surge
```

Press return to accept the defaults when deploying the first time.
You will be provided with a URL in the form `funny-name.surge.sh` that you can use for repeated deployments.

So to deploy to the same URL after making changes, perform the same steps, this time providing the URL for your site:

```shell
rm -rf dist
ember build --environment=development
cd dist
cp index.html 200.html
surge funny-name.surge.sh
```

We use `--enviroment=development` here so that Mirage will continue to mock fake data.  However, normally we would use `ember build --environment=production` which does more to make your code ready for production.
