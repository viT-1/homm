<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="magic-book/magic-book.xsl" />

<xsl:template match="body/main">
	<main iam-app="vueMain" v-cloak="">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		<span>{{some}}</span>
		<xsl:apply-templates />
	</main>
	<!--vue components templates-->
	<xsl:apply-templates select="document('magic-book/magic-book.xml')/script"/>
	<xsl:apply-templates select="document('magic-spell/magic-spell.xml')/script"/>
</xsl:template>

</xsl:stylesheet>