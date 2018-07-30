/**
 *    created by yangxi on 2018-07-27
 */
class Generate {
	// 生成年份数组
	years (years = 15) {
		let res = []
		let startYear = (new Date).getFullYear() - years
		for (let i = 0; i < years * 2; i++) {
			res.push({
				name: startYear + i + '年',
				value: startYear + i + ''
			})
		}
		return res
	}
	
	months () {
		let res = []
		for (let i = 1; i <= 12; i++) {
			let v = this.pad(i, 2)
			res.push({
				name: v + '月',
				value: v
			})
		}
		return res
	}
	
	days (year, month) {
		let res = []
		let l = this.getDaysInOneMonth(year, month)
		for (let i = 1; i <= l; i++) {
			let v = this.pad(i, 2)
			res.push({
				name: v + '日',
				value: v
			})
		}
		return res
	}
	
	getDaysInOneMonth (year, month) {
		month = parseInt(month, 10)
		let d = new Date(year, month, 0)
		return d.getDate()
	}
	
	hours () {
		let res = []
		for (let i = 0; i < 24; i++) {
			let v = this.pad(i, 2)
			res.push({
				name: v + '时',
				value: v
			})
		}
		return res
	}
	
	minutes () {
		let res = []
		for (let i = 0; i < 60; i++) {
			let v = this.pad(i, 2)
			res.push({
				name: v + '分',
				value: v
			})
		}
		return res
	}
	
	seconds () {
		let res = []
		for (let i = 0; i < 60; i++) {
			let v = this.pad(i, 2)
			res.push({
				name: v + '秒',
				value: v
			})
		}
		return res
	}
	
	// 日期对象控制器
	generateCtrl (format = 'second') {
		let res = {
			yearVisible: false,
			monthVisible: false,
			dayVisible: false,
			hourVisible: false,
			minuteVisible: false,
			secondVisible: false
		}
		for (let i in res) {
			res[i] = true
			if (i.indexOf(format) > -1) {
				return res
			}
		}
	}
	
	// 数字填充,返回字符串，如将9填充为09
	pad (num, n) {
		let l = ('' + num).length
		return Array(n > l ? (n - l + 1) : 0).join(0) + num
	}
}

export default new Generate
