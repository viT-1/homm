<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="vue-templates.xsl" />

<xsl:template match="body/main">
	<main>
		<xsl:call-template name="html-config.data-xsl"/>
		<xsl:apply-templates />
	</main>
	<xsl:call-template name="vue-templates"/>
</xsl:template>

</xsl:stylesheet>