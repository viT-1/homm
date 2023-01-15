<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="vue-templates">
	<xsl:variable name="magicBook" select="document('magic-book/magic-book.xml')/script"/>
	<xsl:apply-templates select="$magicBook"/>
</xsl:template>

</xsl:stylesheet>