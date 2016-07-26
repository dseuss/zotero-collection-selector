"use strict";


var startup = function (aData, aReason) {
    console.log("Adding Zotero");

    var Zotero = Components.classes["@zotero.org/Zotero;1"]
        .getService(Components.interfaces.nsISupports)
        .wrappedJSObject;
    var ZoteroPane = Components.classes["@mozilla.org/appshell/window-mediator;1"]
        .getService(Components.interfaces.nsIWindowMediator)
        .getMostRecentWindow("navigator:browser").ZoteroPane;


    var parseCollections = function(collectionID) {
        if (!collectionID) { collectionID = null };

        var collection = Zotero.getCollections(collectionID);

        return collection.map(function(entry) {
            return {
                "id": entry._id,
                "key": entry._key,
                "name": entry._name,
                "subcollections": parseCollections(entry._id)
            };
        })
    };

    // FIXME There should be a better way!
    var getPositionByID = function(id) {
        var items = ZoteroPane.collectionsView._dataItems;
        for (var i = 0; i < items.length; i++) {
            if (items[i][0].ref._id == id) {
                return i;
            }
        }
        return null;
    };

    var collectionListEndpoint = Zotero.Server.Endpoints["/collection-selector/list"] = function() {};
    collectionListEndpoint.prototype = {
        "supportedMethods":["GET"],
        "init": function(postData, sendResponseCallback) {
            var answer = JSON.stringify(parseCollections());
            sendResponseCallback(200, "application/json", answer);
        }
    };

    var setCollectionEndpoint = Zotero.Server.Endpoints["/collection-selector/set"] = function() {};
    setCollectionEndpoint.prototype = {
        "supportedMethods":["POST"],
        "init": function(postData, sendResponseCallback) {
            var settings = JSON.parse(postData);
            var position = getPositionByID(settings.id);
            console.log("Setting to collection " + settings.id + "@" + position);
            ZoteroPane.collectionsView.selection.select(position);
            sendResponseCallback(200, "text/text", "OK");
        }
    }
}

var shutdown = function (aData, aReason) {
    var Zotero = Components.classes["@zotero.org/Zotero;1"]
        .getService(Components.interfaces.nsISupports)
        .wrappedJSObject;

    delete Zotero.Server.Endpoints["/collection-selector/list"];
    delete Zotero.Server.Endpoints["/collection-selector/set"];
}
