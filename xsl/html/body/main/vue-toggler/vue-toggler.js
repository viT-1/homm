(function (_ns) {
	_ns.components['vue-toggler'] = {
		template: '#vue-toggler',
		emits: ['input'],
		props: {
			iamMod: { type: String, default: '' },
			id: { type: String, required: true },
			labels: {
				type: Array,
				default: function () {
					return ['value A', 'value B', 'value C'];
				},
				validator: function (val) {
					// prevent to pass static prop resolved
					// as string with length == characters.length
					return (val.length > 1) && (val[0] != '[');
				}
			},
			start: { type: Number, default: 0, },
			value: { type: Number, default: 0, },
		},
		computed: {
			checkedN: function() {
				return this.value - this.start + 1;
			},
			nextVisibleN: function() {
				const retVal = (this.checkedN < this.labels.length) ?
					this.checkedN + 1 : 1;

				return retVal;
			}
		},
		methods: {
			getOnClickFunc: function(n) {
				const func = function () {
					const inputValue = this.start + n - 1;
					this.$emit('input', inputValue);
				};

				return func.bind(this);
			}
		}
	};
})(globalThis.homm_ns);
