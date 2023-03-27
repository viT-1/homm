(function (_ns) {
	_ns.components['vue-ids-pager'] = {
		emits: ['input', 'page-changed'],
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
			// outer pageIndex (for @input or v-model)
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
			},
			currentIds: function () {
				return this.getIdsOnPage(this.config, this.pageIndex);
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
				var totalPages = 1;
				if (config.ids.length > config.limit) {
					totalPages = Math.ceil(config.ids.length / config.limit);
				}

				return totalPages - 1;
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
					this.$emit('page-changed', { index: this.pageIndex, ids: this.currentIds });
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
					// very simple logic now: if any changes then go to first page
					this.setPageIndex(val, 0);
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
				currentIds: this.currentIds,
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
})(globalThis.homm_ns);
