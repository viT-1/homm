<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:v-slot="https://v2.vuejs.org/v2/api/#v-slot"
	exclude-result-prefixes="v-slot">
<xsl:template match="main/magic-book" xmlns:v-slot="https://v2.vuejs.org/v2/api/#v-slot">
	<magic-book v-bind="{{spells: computedSpells}}">
		<xsl:apply-templates select="@*"/>
		<xsl:call-template name="config.data-xsl"/>
		
		<!--"index" xml is free from vue instructions-->
		<template v-slot:nav="">
			<xsl:apply-templates select="nav" />
		</template>
	</magic-book>
</xsl:template>
</xsl:stylesheet>