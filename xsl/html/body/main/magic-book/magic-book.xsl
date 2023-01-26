<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="main/magic-book">
	<magic-book v-bind="{{spells: spells}}">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		
		<!--"index" xml is free from vue instructions-->
		<template slot="nav">
			<xsl:apply-templates select="nav" />
		</template>
	</magic-book>
</xsl:template>
</xsl:stylesheet>