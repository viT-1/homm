<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="head.title" select="/html/head/title"/>
<xsl:variable name="head.homm-version" select="substring-before(/html/head/link[@id = 'css-urls']/@href, '/')"/>

<xsl:template match="html/head">
	<!--К custom ресурсам открываемого в браузере файла xml добавляем обвязку для работы приложения -->
	<head>
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>

		<!-- Ссылки и скрипты head.xml -->
		<link rel="icon" href="https://github.com/favicon.ico"/>

		<xsl:if test="not($config.is-css-naked-day)">
			<!-- Стиль main.css -->
			<link rel="stylesheet" href="{concat('xsl/html/body/main/main.', $head.homm-version, '.css')}"/>
			<!-- Стили index.xml -->
			<xsl:apply-templates select="*[@rel = 'stylesheet']"/>
		</xsl:if>
		<script id="importmap" type="importmap"><xsl:value-of select="$index.importmap" /></script>
		<script src="externals/promise-polyfill.min.js"></script>
		<script src="xsl/config/any-fills.js"></script>
		<script src="xsl/config/config.js"></script>

		<script src="externals/depp.min.js"></script>
		<script src="index.js"></script>

		<!-- Ресурсы index.xml кроме стилей -->
		<xsl:apply-templates select="*[not(@rel = 'stylesheet')]"/>
	</head>
</xsl:template>

</xsl:stylesheet>