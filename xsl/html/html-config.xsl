<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="html-config.is-debug-mode"
	select="document('html-config.xml')/config//*[@name = 'debug-mode' and not(@disabled)]" />

<xsl:variable name="html-config.is-css-naked-day"
	select="document('html-config.xml')/config//*[@name = 'css-naked-day' and not(@disabled)]" />

<xsl:template match="@data-xml">
	<xsl:if test="$html-config.is-debug-mode">
		<xsl:attribute name="data-xml"><xsl:value-of select="." /></xsl:attribute>
	</xsl:if>
</xsl:template>

<xsl:template name="html-config.data-xsl">
	<xsl:if test="$html-config.is-debug-mode">
		<xsl:attribute name="data-xsl">xsl<xsl:call-template name="html.gen-path"/></xsl:attribute>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>