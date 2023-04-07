<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="body/main">
	<!-- TODO: move template to App component/render function-->
	<div iam-app="vueMain" v-cloak="">
		<xsl:apply-templates />
		<router-view v-on="{{ 'spell-click': onSpellClick, 'page-changed': onPageChanged }}" />
		<input iam-popup-window-state="" type="checkbox" v-model="isPopupWindowOpen" />
		<popup-window v-bind="{{ info: activeSpell, skill: spellSchoolLvl }}" v-on="{{ 'close-click': onPopupWindowCloseClick }}" />
		<hero-info v-on="{{ 'wisdom-skill-changed': onWisdomSkillChanged }}" />
	</div>
	<script>globalThis.homm_ns.i18n = { lang: '<xsl:value-of select="$html.lang" />' };</script>
	<!--vue components templates-->
	<xsl:apply-templates select="document('hero-info/hero-info.xml')/script"/>
	<xsl:apply-templates select="document('magic-book/magic-book.xml')/script"/>
	<xsl:apply-templates select="document('magic-book-marks/magic-book-marks.xml')/script"/>
	<xsl:apply-templates select="document('magic-spell/magic-spell.xml')/script"/>
	<xsl:apply-templates select="document('popup-window/popup-window.xml')/script"/>
	<xsl:apply-templates select="document('vue-toggler/vue-toggler.xml')/script"/>
</xsl:template>

</xsl:stylesheet>