<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="body/main">
	<div iam-app="vueMain" v-cloak="">
		<div iam-panel="top">
			<panel-info />
		</div>
		<xsl:apply-templates />
		<router-view />
	</div>
	<!--vue components templates-->
	<xsl:apply-templates select="document('panel-info/panel-info.xml')/script"/>
	<xsl:apply-templates select="document('magic-book/magic-book.xml')/script"/>
	<xsl:apply-templates select="document('magic-book-marks/magic-book-marks.xml')/script"/>
	<xsl:apply-templates select="document('magic-spell/magic-spell.xml')/script"/>
</xsl:template>

</xsl:stylesheet>