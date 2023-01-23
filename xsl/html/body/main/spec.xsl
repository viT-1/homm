<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
	encoding="utf-8"
	omit-xml-declaration="yes"
	indent="no"
	method="html"
	doctype-system="about:legacy-compat"
	media-type="application/xhtml+xml" />

<xsl:variable name="spec.root" select="head/@data-relpath-root"/>

<xsl:template match="head">
	<xsl:variable name="externals" select="concat($spec.root, 'externals')"/>
	<html>
		<head>
			<title>Jasmine Spec Runner v3.99.0</title>
			<link rel="shortcut icon" type="image/png" href="{$externals}/jasmine/jasmine_favicon.png"/>
			<link rel="stylesheet" href="{$externals}/jasmine/jasmine.css"/>

			<script src="{$externals}/jasmine/jasmine.js"></script>
			<script src="{$externals}/jasmine/jasmine-html.js"></script>
			<script src="{$externals}/jasmine/boot0.js"></script>
			<script src="{$externals}/jasmine/boot1.js"></script>
			<script>window.homm_ns = { components: {} };</script>
			<xsl:apply-templates select="script[@src]" />
		</head>
		<body>
			<!--vue components templates-->
			<xsl:apply-templates select="script[@data-component-tmpl]"/>
		</body>
	</html>
</xsl:template>

<xsl:template match="head/script[@data-component-tmpl]">
	<xsl:apply-templates select="document(@data-component-tmpl)/script"/>
</xsl:template>

<xsl:template match="@* | node()">
	<xsl:copy>
		<xsl:apply-templates select="@* | node()" />
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>