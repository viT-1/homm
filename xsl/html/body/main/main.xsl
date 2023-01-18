<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="body/main">
	<main iam-main="vueApp">
		<xsl:apply-templates select="@*"/>
		<span>{{some}}</span>
		<xsl:call-template name="config.data-xsl"/>
		<xsl:apply-templates />
	</main>
	<!--vue components templates-->
	<xsl:apply-templates select="document('magic-book/magic-book.xml')/script"/>
</xsl:template>

</xsl:stylesheet>