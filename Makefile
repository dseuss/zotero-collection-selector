zotero-collection-selector.xpi: FORCE
	rm -rf $@
	zip -r $@ install.rdf chrome.manifest chrome -x \*.DS_STORE

FORCE:
