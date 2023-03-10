<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet
[
<!ENTITY importmap SYSTEM "xsl/config/importmap.json">
<!ENTITY spells-homm2 SYSTEM "homm2/spells.json">
<!ENTITY spells-homm3 SYSTEM "homm3/spells.json">
]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="xsl/config/config.xsl" />
<xsl:include href="xsl/html/html.xsl" />

<xsl:variable name="index.importmap">&importmap;</xsl:variable>
<xsl:variable name="index.spells-homm2">&spells-homm2;</xsl:variable>
<xsl:variable name="index.spells-homm3">&spells-homm3;</xsl:variable>

<xsl:template match="@vocab"></xsl:template>

</xsl:stylesheet>