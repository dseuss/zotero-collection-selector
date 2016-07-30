"use strict";


Zotero.CollectionSelector = {
    // ZoteroPane = Components.classes["@mozilla.org/appshell/window-mediator;1"]
    //     .getService(Components.interfaces.nsIWindowMediator)
    //     .getMostRecentWindow("navigator:browser").ZoteroPane,

    // var Zotero = Components.classes["@zotero.org/Zotero;1"]
    //     .getService(Components.interfaces.nsISupports)
    //     .wrappedJSObject;

    parseCollections: function(collectionID) {
        if (!collectionID) { collectionID = null };

        var collection = Zotero.getCollections(collectionID);

        return collection.map(function(entry) {
            return {
                "id": entry._id,
                "key": entry._key,
                "name": entry._name,
                "subcollections": Zotero.CollectionSelector.parseCollections(entry._id)
            };
        })
    },

    // FIXME There should be a better way!
    getPositionByID: function(id) {
        var items = ZoteroPane.collectionsView._dataItems;
        for (var i = 0; i < items.length; i++) {
            if (items[i][0].ref._id == id) {
                return i;
            }
        }
        return null;
    },

    init: function () {
        console.log("Registering zotero-collection-selector");

        var collectionListEndpoint = Zotero.Server.Endpoints["/collection-selector/list"] = function() {};
        collectionListEndpoint.prototype = {
            "supportedMethods":["GET"],
            "init": function(postData, sendResponseCallback) {
                var collections = Zotero.CollectionSelector.parseCollections();
                var answer = JSON.stringify(collections);
                sendResponseCallback(200, "application/json", answer);
            }
        };

        var setCollectionEndpoint = Zotero.Server.Endpoints["/collection-selector/set"] = function() {};
        setCollectionEndpoint.prototype = {
            "supportedMethods":["POST"],
            "init": function(postData, sendResponseCallback) {
                var settings = JSON.parse(postData);
                var position = Zotero.CollectionSelector.getPositionByID(settings.id);
                console.log("Setting to collection " + settings.id + "@" + position);
                ZoteroPane.collectionsView.selection.select(position);
                sendResponseCallback(200, "text/text", "OK");
            }
        }
    }
};
