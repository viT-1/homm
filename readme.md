Pet project to make Vue SPA without bundlers.
Vue app markup & init code in components/body/main folder
Local XML-translation preview in Opera v12 or IE11,
Google Chrome also but with command line with:
`--allow-file-access-from-files --process-per-site`
Modern Opera can run local files with:
`--disable-web-security --user-data-dir="d:\my-root-dev-folder"`

[Using](http://www.sagehill.net/docbookxsl/SpecialChars.html) special [characteres](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references) in XML
On client side we have support only [XSLT 1.0](https://www.w3.org/TR/1999/REC-xslt-19991116) (browsers)
but we have [3.0 specification](https://www.w3.org/TR/xslt-30/) already but server side
or as [js library](https://stackoverflow.com/questions/6282340/what-browsers-support-xslt-2-0) with SaxonJS.

fetch [can't load local files](https://stackoverflow.com/questions/49971575)
and `request.open` can't access local files, but can with [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) or [ActiveX object](https://stackoverflow.com/questions/2142156/#6888068) (ActiveX with jQuery 1.12.4).
Therefore this project can't use module loader like SystemJS and ie1-custom-properties polyfill =(
- css-vars-ponyfill and ie11-custom-properties polyfill [are not support local files](https://github.com/nuxodin/ie11CustomProperties/issues/90).
- css-vars-ponyfill is support [only root variables](https://github.com/jhildenbiddle/css-vars-ponyfill/issues/127).

[headjs](https://headjs.github.io/) > [scriptjs](https://github.com/ded/script.js) > [loadjs](https://github.com/muicss/loadjs) > [johnnydepp](https://github.com/muicss/johnnydepp) used for loading script dependencies without using NodeJS.
- HeadJS has css overhead.
- ScriptJS can load only scripts (can't css links)
- LoadJS can load js and css files. It is more popular than JohnnyDepp.
- JohnnyDepp is almost the same as LoadJS but with new API and support
Browserify needs to transpile modules, that's why I don't use it.