<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="nav.xml" select="document('nav.xml')/nav"/>

<xsl:template match="body/nav">
	<nav>
		<xsl:apply-templates select="@* | $nav.xml/@*"/>
		<xsl:call-template name="html-config.data-xsl"/>
		<xsl:apply-templates select="$nav.xml/*[@lang = $html.lang]"/>
		<xsl:apply-templates />
	</nav>
</xsl:template>

<!-- Clear text from index.xml nav -->
<xsl:template match="body/nav/node()"></xsl:template>

</xsl:stylesheet>