Pet project to make Vue SPA without NodeJS bundlers, but XSLT "bundling" and JohnnyDepp dependencies library.
Just download ZIP, extract in on your drive and click on [index.html](https://viT-1.github.io/homm/), and it's ready!

Disclaimer: All Heroes of Might & Magic 3 images and audio files used in this project belong to 3DO (now owned by Ubisoft) and New World Computing. No code from the original game was used.

## Browsers support
These browsers can display XML-translation with local files:
- IE11,
- Google Chrome with command line `--allow-file-access-from-files --process-per-site`
- Opera can run local files with `--disable-web-security --user-data-dir="d:\my-root-dev-folder"`

## XSLT version
On client side we have support only [XSLT 1.0](https://www.w3.org/TR/1999/REC-xslt-19991116) (browsers)
but we have [3.0 specification](https://www.w3.org/TR/xslt-30/) already but server side
or as [js library](https://stackoverflow.com/questions/6282340/what-browsers-support-xslt-2-0) with SaxonJS.
## Content includes
HTML ENTITES (may be in dtd-files) for jsons and xsl-variables for including xml data from multiple xml-files (x-templates for components).
Including ENTITIES into XML is [blocked by Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=22942#c116) due to potential recursion vulnerability. [Using](http://www.sagehill.net/docbookxsl/SpecialChars.html) special [characters](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references) in XML.

fetch [can't load local files](https://stackoverflow.com/questions/49971575)
and `request.open` can't access local files, but can with [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) or [ActiveX object](https://stackoverflow.com/questions/2142156/#6888068) (ActiveX with jQuery 1.12.4).
Therefore this project can't use module loader like SystemJS and ie1-custom-properties polyfill =(
- css-vars-ponyfill and ie11-custom-properties polyfill [are not support local files](https://github.com/nuxodin/ie11CustomProperties/issues/90).
- css-vars-ponyfill is support [only root variables](https://github.com/jhildenbiddle/css-vars-ponyfill/issues/127).

### Dynamic js loading
[headjs](https://headjs.github.io/) > [scriptjs](https://github.com/ded/script.js) > [loadjs](https://github.com/muicss/loadjs) > [johnnydepp](https://github.com/muicss/johnnydepp) used for loading script dependencies without using NodeJS.
- HeadJS has css overhead.
- ScriptJS can load only scripts (can't css links)
- LoadJS can load js and css files. It is more popular than JohnnyDepp.
- JohnnyDepp is almost the same as LoadJS but with new API and support
Browserify needs to transpile modules, that's why I don't use it.

## Vue
All Vue components located in `xsl/html/body/main` folder, registered globally to avoid
subcomponent dependencies.

Forced to use ~~deprecated `slot` attribute~~ for named slots, because `v-slot` [isn't supported](https://github.com/vuejs/rfcs/pull/2#issuecomment-521420394)
strict xhtml attribute-value setting as `v-bind = {data: data}` workaround does (need additional curly braces in xslt).
Solved with custom namespace:
```xsl
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:v-slot="https://v2.vuejs.org/v2/api/#v-slot"
	exclude-result-prefixes="v-slot">
```

The code still use deprecated `this.$scopedSlots` for renderless component.
Without Vue3 but with Composition API Vue2, can we get rid of the obsolete?

## Vuex
Vuex store consists of modules:
- [spells](https://github.com/viT-1/homm/blob/main/xsl/html/body/main/store/spells.store.js) (by reading json included into DOM)
- [magic-book state](https://github.com/viT-1/homm/blob/main/xsl/html/body/main/magic-book/magic-book.store.js) of filtering

[Root store](https://github.com/viT-1/homm/blob/main/xsl/html/body/main/store/index.store.js) saved to `homm.store`.

## Vue-router
[Used](https://github.com/viT-1/homm/blob/main/xsl/html/body/main/router/index.router.js) in history mode, without hash, but query.

## i18n
Hard-coded internationalization by html@lang attribute and additional [i18n.xsl](https://github.com/viT-1/homm/blob/main/xsl/config/i18n.xsl). Vue code should be as simple as possible, without additional code about i18n!

## Linting
This project isn't using NodeJS, that's why isn't linted.
You can see my [another project](https://github.com/viT-1/systemjs-babel-es6-vue) with linting (even html) and NodeJS setup.
[ESLint in browser](https://stackoverflow.com/questions/52702512)? Can be [with Browserify](https://www.npmjs.com/package/eslint-linter-browserify), but Browserify uses NodeJS...

## TDD, unit testing
We have only one client-side (supports IE11, can start with local files and without NodeJS) framework: [Jasmine 3.99 standalone](https://github.com/jasmine/jasmine/releases/#hd-65ccb7e7).
All components tests we can run by `xsl/html/body/main/spec.xml`.
Individual components tests we can run by `*.spec.xml` located near component template file.
Specs [expectation API](https://jasmine.github.io/api/4.5/matchers.html) shoud be consistent with [Jest API](https://jestjs.io/docs/expect).

If you interested in Jest on NodeJS setup, you can see another [my project](https://github.com/viT-1/systemjs-babel-es6-vue).

## Modules
This project is supported IE11, that's why it can be only SystemJS option, but this project
is experimental setup without NodeJS scripting.

## Further reading
- [XSLT Entites/dtd](https://www.artlebedev.ru/technogrette/xslt/entity-1/) (rus).
- [xmlns](https://www.artlebedev.ru/technogrette/xslt/xmlns-1/)
- [xmlns:](https://stackoverflow.com/questions/41875921/#63101503) for declaring xml attributes with `:`
not only for `v-bind`, but for [v-slot](https://stackoverflow.com/questions/73065424/#73065732) also.