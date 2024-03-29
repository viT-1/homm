<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
	encoding="utf-8"
	omit-xml-declaration="yes"
	indent="no"
	method="html"
	doctype-system="about:legacy-compat"
	media-type="application/xhtml+xml" />

<xsl:variable name="spec.mainFolderPath" select="concat(html/head/@data-relpath-root, 'xsl/html/body/main')"/>

<xsl:template match="html">
	<xsl:variable name="externals" select="concat(head/@data-relpath-root, 'externals')"/>
	<xsl:variable name="config" select="concat(head/@data-relpath-root, 'xsl/config')"/>
	<html>
		<xsl:apply-templates select="@*"/>
	<head>
		<link rel="shortcut icon" type="image/png" href="{$externals}/jasmine/jasmine_favicon.png"/>
		<link rel="stylesheet" href="{$externals}/jasmine/jasmine.css"/>

		<script src="{$externals}/promise-polyfill.min.js"></script>
		<script src="{$config}/any-fills.js"></script>
		<script src="{$config}/config.js"></script>

		<xsl:if test="contains(@use, 'jasmine')">
			<script src="{$externals}/jasmine/jasmine.js"></script>
			<script src="{$externals}/jasmine/jasmine-html.js"></script>
			<script src="{$externals}/jasmine/boot0.js"></script>
			<script src="{$externals}/jasmine/boot1.js"></script>
			<script>
				jasmine.getEnv().addReporter({
					specStarted: function (result) { jasmine.currentTest = result; },
					specDone: function (result) { jasmine.currentTest = result; },
				});
			</script>
		</xsl:if>
		<xsl:if test="contains(@use, 'vue')"><script src="{$externals}/vue.js"></script></xsl:if>
		<xsl:if test="contains(@use, 'vuex')"><script src="{$externals}/vuex.js"></script></xsl:if>
		
		<script src="{$spec.mainFolderPath}/main.js"></script>
		<xsl:apply-templates select="head/node()"/>

		<style>.jasmine-results{ font-size: 16px; line-height: 20px; }</style>
		<xsl:if test="contains(head/title/text(), 'HoMM: all')">
			<style>[iam-app], [iam-spec]{ display: none }</style>
		</xsl:if>
	</head>
	<xsl:apply-templates select="body"/>
	</html>
</xsl:template>

<xsl:template match="body">
	<body>
		<xsl:apply-templates select="main"/>

		<!--vue components templates-->
		<xsl:apply-templates select="script[@data-component-tmpl]"/>

		<xsl:if test="main">
			<script>
				globalThis.homm_ns.f.appendVueConfig({ el: '[iam-app ~= "vueSpec"]' });
				globalThis.homm_ns.f.registerDeclaredComponents();
			</script>
		</xsl:if>

		<xsl:apply-templates select="script[not(@data-component-tmpl)]"/>
	</body>
</xsl:template>

<xsl:template match="body/main">
	<main iam-app="vueSpec">
		<xsl:apply-templates select="node() | @*"/>
	</main>
</xsl:template>

<xsl:template match="script[@data-component-tmpl]">
	<xsl:apply-templates select="document(@data-component-tmpl)/script"/>
</xsl:template>

<xsl:template match="@data-xml"></xsl:template>

<xsl:template match="@* | node()"><xsl:copy><xsl:apply-templates select="@* | node()"/></xsl:copy></xsl:template>

</xsl:stylesheet>