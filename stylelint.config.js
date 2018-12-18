module.exports = {
	'extends': 'stylelint-config-standard',
	'plugins': ['stylelint-order'], // stylelint-order是CSS属性排序插件
	'rules': {
		'indentation': null,
		'comment-empty-line-before': null,
		'selector-pseudo-element-colon-notation': null,
		'selector-list-comma-newline-after': null,
		'rule-empty-line-before': null,
		'at-rule-no-unknown': null,
		'order/properties-order': []
	}
}
