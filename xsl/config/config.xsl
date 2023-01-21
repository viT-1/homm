<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="config.is-debug-mode"
	select="boolean(document('config.xml')/config/*[@name = 'debug-mode' and not(@disabled)])" />

<xsl:variable name="config.is-css-naked-day"
	select="boolean(document('config.xml')/config/*[@name = 'css-naked-day' and not(@disabled)])" />

<xsl:template match="@data-xml">
	<xsl:if test="$config.is-debug-mode">
		<xsl:attribute name="data-xml"><xsl:value-of select="."/></xsl:attribute>
	</xsl:if>
</xsl:template>

<xsl:template name="config.data-xsl">
	<xsl:if test="$config.is-debug-mode">
		<xsl:attribute name="data-xsl">xsl<xsl:call-template name="config.gen-path"/></xsl:attribute>
	</xsl:if>
</xsl:template>

<xsl:template name="config.gen-path">
	<xsl:param name="prevPath"/>
	<xsl:variable name="currPath" select="concat('/', name(), $prevPath)"/>
	<xsl:for-each select="parent::*">
		<xsl:call-template name="config.gen-path">
			<xsl:with-param name="prevPath" select="$currPath"/>
		</xsl:call-template>
	</xsl:for-each>
	<xsl:if test="not(parent::*)">
		<xsl:value-of select="$currPath"/>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>