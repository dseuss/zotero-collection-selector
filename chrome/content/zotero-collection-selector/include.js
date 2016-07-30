// Only create main object once
if (!Zotero.CollectionSelector) {
	var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
					.getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("chrome://zotero-collection-selector/content/main.js");
}

window.addEventListener('load', function(e) {
	Zotero.CollectionSelector.init();
}, false);
