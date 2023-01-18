<?xml version="1.0" encoding="UTF-8"?> 
<!DOCTYPE xsl:stylesheet
  [
  	<!ENTITY amp "&#x0026;">
  	<!ENTITY copy "&#x00A9;">
 	<!ENTITY sol "&#x002F;">
  ]
>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="main/main.xsl" />

<xsl:template match="html/body">
	<body iam-body="">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		<xsl:apply-templates />
		<h3 iam-h="3"><xsl:value-of select="$html.lang" /></h3>
	</body>
</xsl:template>

</xsl:stylesheet>