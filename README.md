Zotero Collection Selector
==========================

Tired of having to manually switch to the Zotero window to change the collection when scraping documents of the web? Yes? Me too! Would this be the right job for an Alfred workflow? Yes? Exactly! Unfortunately Zotero does not provide API to change the currently active collection in the extension/standalone app. This is what this extension is for!

## Installation

Just download the current xpi under [releases](https://github.com/dseuss/zotero-collection-selector/releases) and install in Firefox/Zotero standalone app.

By default, the connector server is disabled in the Firefox Zotero extension. To enable it set `extensions.zotero.httpServer.enabled` to `true` in about:config. This is not necessary for the standalone Zotero app. For more details see the [connector server article](https://www.zotero.org/support/dev/client_coding/connector_http_server).

## Functionality

The Zotero connector server is an HTTP server listening to `127.0.0.1:23119` and is used for the non-Firefox browser extensions to communicate with Zotero. This extension provides two additional endpoints:

* `collection-selector/list` returns a json containing all current collections
* `collection-selector/set` accepts a POST with a json of the form `{'id': x}` where `x` is the id of the collection to be selected


