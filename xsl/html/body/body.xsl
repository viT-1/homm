<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="main/main.xsl" />

<xsl:template match="html/body">
	<body iam-body="">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		<xsl:apply-templates />
		<h3 iam-h="3"><xsl:value-of select="$html.lang" /><xsl:value-of select="$head.title-data-xml" /></h3>

		<xsl:variable name="spells">
			<xsl:choose>
				<xsl:when test="starts-with($head.title-data-xml, '3')"><xsl:value-of select="$index.spells-homm2"/></xsl:when>
				<xsl:otherwise><xsl:value-of select="$index.spells-homm3"/></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<script id="spells" type="application/json"><xsl:value-of select="$spells"/></script>
	</body>
</xsl:template>

</xsl:stylesheet>