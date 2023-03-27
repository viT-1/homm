<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
	encoding="utf-8"
	omit-xml-declaration="yes"
	indent="no"
	method="html"
	doctype-system="about:legacy-compat"
	media-type="application/xhtml+xml"/>

<xsl:include href="head/head.xsl"/>
<xsl:include href="body/body.xsl"/>

<xsl:variable name="html.lang" select="//html/@lang"/>

<xsl:template match="html">
	<xsl:variable name="defIsOff" select="'js touch'"/>
	<xsl:variable name="defIsOn">
		<xsl:if test="config.is-css-naked-day">css-naked-day</xsl:if>
	</xsl:variable>

	<html is-off="{$defIsOff}" is-on="{$defIsOn}" lang="{$html.lang}">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		<xsl:apply-templates />
	</html>
</xsl:template>

<xsl:template match="@* | node()">
	<xsl:copy>
		<xsl:apply-templates select="@* | node()"/>
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>