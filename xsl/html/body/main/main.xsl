<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="body/main">
	<div iam-app="vueMain" v-cloak="">
		<div iam-panel="top">
			<div iam-panel-info="spell quicksand">
				<p iam-panel-info-descr="">Случайным образом размещает на поле битвы участки зыбучего песка, видимые только тому, кто направил заклинание, а также существам, для которых данный тип местности является «родным». Если отряд попал на зыбучий песок, его ход кончается, и участок с зыбучим песком становится видимым для всех.</p>
			</div>
			<div iam-panel-info="skill">
				<span iam-panel-info-skill-label="">Skill:</span>
				<option iam-panel-info-skill-label="" id="skill-none" type="radio" name="skill" value="0" />
				<label iam-panel-info-skill-label="" for="skill-none">none</label>
				<option iam-panel-info-skill-label="" id="skill-basic" type="radio" name="skill" value="1" />
				<label iam-panel-info-skill-label="" for="skill-basic">basic</label>
				<option iam-panel-info-skill-label="" id="skill-advanced" type="radio" name="skill" value="2" />
				<label iam-panel-info-skill-label="" for="skill-advanced">advanced</label>
				<option iam-panel-info-skill-label="" id="skill-expert" type="radio" name="skill" value="3" />
				<label iam-panel-info-skill-label="" for="skill-expert">expert</label>
			</div>
		</div>
		<xsl:apply-templates select="@*"/>
		<xsl:apply-templates />
	</div>
	<!--vue components templates-->
	<xsl:apply-templates select="document('magic-book/magic-book.xml')/script"/>
	<xsl:apply-templates select="document('magic-book-marks/magic-book-marks.xml')/script"/>
	<xsl:apply-templates select="document('magic-spell/magic-spell.xml')/script"/>
</xsl:template>

</xsl:stylesheet>