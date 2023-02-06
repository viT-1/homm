(function () {
	const _ns = globalThis.homm_ns;
	
	_ns.components['vue-ids-pager'] = {
		emits: ['input'],
		props: {
			ids: {
				type: Array,
				default: function () { return [] },
			},
			/** Items per page */
			limit: {
				type: Number,
				default: 12,
				validator: function (value) {
					return value > 0;
				}
			},
			value: {
				type: Number,
				default: 0,
				validator: function (val) {
					return val > -1;
				}
			}
		},
		data: function () {
			return {
				pageIndex: 0,
			};
		},
		computed: {
			config: function () {
				return { ids: this.ids, limit: this.limit }
			},
			canPrevPg: function () {
				return  !(this.pageIndex == 0);
			},
			canNextPg: function () {
				return  !(this.isLastPageIndex(this.config, this.pageIndex));
			}
		},
		methods: {
			/**
			 * @param {Object} config - Initial config (computed.config)
			 * @param {Number} pageIndex - page index (minimum 0)
			 * @returns {Array} retIds - subarray ids from config.ids on given page number (n)
			 */
			getIdsOnPage: function (config, pageIndex) {
				if (typeof config == 'undefined' || Object.keys(config).length == 0) {
					throw ReferenceError('Invalid config parameter');
				}

				if (typeof pageIndex == 'undefined') {
					throw ReferenceError('Invalid pageIndex parameter');
				}

				const indexStart = pageIndex * config.limit;
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
			getLastPageIndex: function (config) {
				return Math.ceil(config.ids.length / config.limit) - 1;
			},
			isLastPageIndex: function (config, pageIndex) {
				return pageIndex == this.getLastPageIndex(config);
			},
			isValidPageIndex: function (config, pageIndex) {
				const isPositive = pageIndex > -1;
				const isNotGreaterThanLast = pageIndex < this.getLastPageIndex(config) + 1;

				return Number.isInteger(pageIndex) && isPositive && isNotGreaterThanLast;
			},
			setPageIndex: function (config, pageIndex) {
				if (this.isValidPageIndex(config, pageIndex)) {
					this.pageIndex = Number(pageIndex);
					this.$emit('input', this.pageIndex);
				} else {
					throw Error('Invalid page index value: ' + pageIndex);
				}
			},
			setPrevIndex: function () {
				this.setPageIndex(this.config, this.pageIndex - 1);
			},
			setNextIndex: function () {
				this.setPageIndex(this.config, this.pageIndex + 1);
			}
		},
		watch: {
			config: {
				deep: true,
				handler: function (val) {
					const maxPageIndex = this.getLastPageIndex(val);
					if (this.pageIndex > maxPageIndex) {
						this.setPageIndex(val, maxPageIndex);
					}
				}
			},
			value: {
				immediate: true,
				handler: function (val) {
					this.setPageIndex(this.config, val);
				}
			}
		},
		render: function () {
			const self = this;
			const maxPageIndex = this.getLastPageIndex(this.config);

			return this.$scopedSlots.default({
				currentIds: this.getIdsOnPage(this.config, this.pageIndex),
				lastPgIndex: maxPageIndex,
				currPgIndex: this.pageIndex,
				canFirstPg: this.canPrevPg,
				canPrevPg: this.canPrevPg,
				canNextPg: this.canNextPg,
				canLastPg: this.canNextPg,
				firstEvents: {
					click: function () {
						self.setPageIndex(self.config, 0);
					}
				},
				prevEvents: {
					click: function () {
						self.setPageIndex(self.config, self.pageIndex - 1);
					}
				},
				nextEvents: {
					click: function () {
						self.setPageIndex(self.config, self.pageIndex + 1);
					}
				},
				lastEvents: {
					click: function () {
						self.setPageIndex(self.config, maxPageIndex);
					}
				}
			});
		},
	};
})();
