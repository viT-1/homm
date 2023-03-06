<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="*[@id = 'magic-book']//*[@iam-magic-book-mark-title]">
	<xsl:copy>
		<xsl:apply-templates select="@*" />
		<xsl:if test="$html.lang = 'ru'">
			<xsl:choose>
				<xsl:when test="@iam-magic-book-mark-title = 'combat'">
					<xsl:attribute name="title">Боевые заклинания</xsl:attribute>
					<xsl:text>Боевые</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'map'">
					<xsl:attribute name="title">Заклинания карты приключений</xsl:attribute>
					<xsl:text>Для карты</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'air'">
					<xsl:text>Школа воздуха</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'earth'">
					<xsl:text>Школа земли</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'fire'">
					<xsl:text>Школа огня</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'water'">
					<xsl:text>Школа воды</xsl:text>		
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'all'">
					<xsl:text>Все школы</xsl:text>		
				</xsl:when>
			</xsl:choose>
		</xsl:if>
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>