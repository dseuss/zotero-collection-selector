zotero-collection-selector.xpi: FORCE
	rm -rf $@
	zip -r $@ install.rdf bootstrap.js -x \*.DS_STORE

FORCE:
