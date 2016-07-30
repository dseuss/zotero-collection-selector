zotero-collection-selector.xpi: FORCE
	rm -rf $@
	zip -r $@ README.md LICENSE install.rdf chrome.manifest chrome -x \*.DS_STORE

FORCE:
