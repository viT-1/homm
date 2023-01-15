<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
	encoding="utf-8"
	omit-xml-declaration="yes"
	indent="no"
	method="html"
	doctype-system="about:legacy-compat"
	media-type="application/xhtml+xml" />

<xsl:include href="head/head.xsl" />
<xsl:include href="body/body.xsl" />
<xsl:include href="html-config.xsl" />

<xsl:template match="html">
	<xsl:variable name="defIsOff" select="'js touch'" />
	<xsl:variable name="defIsOn" select="''" />

	<html is-off="{$defIsOff}" is-on="{$defIsOn}" lang="{$html.lang}">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="html-config.data-xsl"/>
		<xsl:apply-templates />
	</html>
</xsl:template>

<xsl:variable name="html.lang" select="//html/@lang" />

<xsl:template match="@* | node()">
	<xsl:copy>
		<xsl:apply-templates select="@* | node()" />
	</xsl:copy>
</xsl:template>

<xsl:template name="html.gen-path">
	<xsl:param name="prevPath" />
	<xsl:variable name="currPath" select="concat('/', name(), $prevPath)" />
	<xsl:for-each select="parent::*">
		<xsl:call-template name="html.gen-path">
			<xsl:with-param name="prevPath" select="$currPath" />
		</xsl:call-template>
	</xsl:for-each>
	<xsl:if test="not(parent::*)">
		<xsl:value-of select="$currPath" />
	</xsl:if>
</xsl:template>

</xsl:stylesheet>