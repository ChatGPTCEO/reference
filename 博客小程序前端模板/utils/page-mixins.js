export const pageMix = {
	onReachBottom() {
		let nextPage = this.pageNum + 1;
		if (nextPage > this.totalPage) {
			this.pageNum = this.totalPage
			this.hasNext = false
		} else {
			this.pageNum = nextPage
			this.hasNext = true
		}
		if (this.hasNext) {
			this.getDataList()
		}
	},
	data() {
		return {
			pageSize: 5,
			pageNum: 1,
			totalPage: 0,
			hasNext: true,
		}
	},
	methods: {

	}
}
