<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="head.xml" select="document('head.xml')/head" />

<xsl:template match="html/head">
	<!-- Не можем аннигилировать в отдельную ловушку template, так как ноды вне index.xml -->
	<xsl:variable name="head.xml.links" select="$head.xml//link[not(@disabled)]" />
	<xsl:variable name="head.xml.scripts" select="$head.xml//script[not(@disabled)]" />
	<xsl:variable name="head.xml.l-s" select="$head.xml.links | $head.xml.scripts" />
		
	<head>
		<xsl:apply-templates select="@* | $head.xml/@*"/>
		<xsl:call-template name="html-config.data-xsl"/>

		<!-- Всё, кроме ссылок и скриптов head.xml -->
		<xsl:apply-templates select="$head.xml/*[count(. | $head.xml.l-s) != count($head.xml.l-s)]" />

		<!-- Ссылки и скрипты head.xml -->
		<xsl:apply-templates select="$head.xml.links[not(@rel = 'stylesheet')]" />
		<xsl:if test="not($html-config.is-css-naked-day)">
			<!-- Стили head.xml -->
			<xsl:apply-templates select="$head.xml.links[@rel = 'stylesheet']" />
			<!-- Стили index.xml -->
			<xsl:apply-templates select="*[@rel = 'stylesheet']" />
		</xsl:if>
		<xsl:apply-templates select="$head.xml.scripts" />

		<!-- Ресурсы index.xml кроме стилей -->
		<xsl:apply-templates select="*[not(@rel = 'stylesheet')]" />
	</head>
</xsl:template>

</xsl:stylesheet>