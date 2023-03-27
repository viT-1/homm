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
				<xsl:when test="@iam-magic-book-mark-title = 'move'">
					<xsl:attribute name="title">Заклинания на перемещение</xsl:attribute>	
					<xsl:text>Перемещение</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'close'">
					<xsl:text>Закрыть книгу</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'air'">
					<xsl:attribute name="title">Заклинания школы воздуха</xsl:attribute>
					<xsl:text>Школа воздуха</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'earth'">
					<xsl:attribute name="title">Заклинания школы земли</xsl:attribute>
					<xsl:text>Школа земли</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'fire'">
					<xsl:attribute name="title">Заклинания школы огня</xsl:attribute>
					<xsl:text>Школа огня</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'water'">
					<xsl:attribute name="title">Заклинания школы воды</xsl:attribute>
					<xsl:text>Школа воды</xsl:text>
				</xsl:when>
				<xsl:when test="@iam-magic-book-mark-title = 'all'">
					<xsl:attribute name="title">Заклинания всех школ</xsl:attribute>
					<xsl:text>Все школы</xsl:text>
				</xsl:when>
			</xsl:choose>
		</xsl:if>
	</xsl:copy>
</xsl:template>

<xsl:template match="*[@id = 'magic-spell']/li/p/span[contains(.,'Spell points')]">
	<xsl:choose>
		<xsl:when test="$html.lang = 'ru'">
			<xsl:text>Очки магии</xsl:text>		
		</xsl:when>
		<xsl:otherwise>
			<xsl:copy-of select="." />
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>