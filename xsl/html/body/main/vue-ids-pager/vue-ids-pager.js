(function() {
	window.homm_ns.components['vue-ids-pager'] = {
		props: {
			// @see https://stackoverflow.com/questions/56904327/access-props-value-in-another-props-validator
			config: {
				type: Object,
				default: function () {
					return {
						ids: [], /** List of items which will be divided into parts (pages) */
						limit: 6, /** Number of list items per page */
						n: 0, /** Set page number */
					}
				}

			},
		},
		methods: {
			/**
			 * @param {Object} config - Initial config (this.$props.config)
			 * @param {Number} n - page number
			 * @returns {Array} retIds - subarray ids from config.ids on given page number (n)
			 */
			getIdsOnPage: function(config) {
				const indexStart = config.n * config.limit;
				var indexEnd = indexStart + config.limit - 1;
				const indexMax = config.ids.length - 1;
				if (indexEnd > indexMax)
					indexEnd = indexMax;
				const retIds = [];

				for (var i = indexStart; i < indexEnd + 1; i++) {
					retIds.push(config.ids[i]);
				}

				return retIds;
			},
			getLastPageIndex: function(config) {
				return Math.ceil(config.ids.length / config.limit) - 1;
			},
			isLastPageIndex: function(config) {
				return config.n == this.getLastPageIndex(config);
			},
			validateConf: function(config) {
				if (config.limit < 1) {
					throw Error('Invalid config.limit. Can not set items per page less than 1');
				}

				if (config.n < 0) {
					throw Error('Invalid config.n. Can not set page index less than 0');
				}
				if (config.n > config.ids.length / config.limit) {
					const maxPages = this.getLastPageIndex(config);
					// TODO: emit event for page index decrease to max available index
					throw Error('Invalid config.n. Can not set page index over than max index of pages (' + maxPages + ')');
				}
			}
		},
		watch: {
			config: {
				deep: true,
				immediate: true,
				handler: function() {
					this.validateConf(this.$props.config);
				}
			}
		},
		render: function() {
			return this.$scopedSlots.default({
				isLast: this.isLastPageIndex(this.$props.config),
				max: this.getLastPageIndex(this.$props.config),
				some: 'thing',
				currentIds: this.getIdsOnPage(this.$props.config),
			});
		},
	};
})();
