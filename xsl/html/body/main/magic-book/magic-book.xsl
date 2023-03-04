<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--"index" xml is free from vue instructions-->
<xsl:template match="main/magic-book">
	<magic-book v-bind="{{spells: computedSpells}}">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
	</magic-book>
</xsl:template>
</xsl:stylesheet>