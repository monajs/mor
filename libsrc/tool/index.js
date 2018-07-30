class Tool {
	//数字填充,返回字符串，如将9填充为09
	pad (num, n) {
		let l = ('' + num).length
		return Array(n > l ? (n - l + 1) : 0).join(0) + num
	}
	
	prefixList () {
		return [
			'transform',
			'transition'
		]
	}
	
	css (dom, data) {
		if (!dom) {
			return
		}
		//换个方式实现，性能应该会有比较大的提升
		let _data = this.parseStyleObj(data)
		Object.keys(_data).forEach((v) => {
			dom.style.setProperty(v, _data[v])
		})
	}
	
	removeCss (dom, props) {
		if (!dom) {
			return
		}
		dom.style.removeProperty(props)
		if (this.prefixList().indexOf(props) >= 0) {
			dom.style.removeProperty('-webkit-' + props)
		}
	}
	
	//将样式对象转化为可使用的样式对象
	parseStyleObj (data) {
		let cssNumber = [
			'columnCount',
			'fillOpacity',
			'fontWeight',
			'lineHeight',
			'opacity',
			'order',
			'orphans',
			'widows',
			'z-index',
			'zoom'
		]
		
		let _data = Object.assign({}, data)
		Object.keys(_data).forEach((v) => {
			if (this.prefixList().indexOf(v) >= 0) {
				_data['-webkit-' + v] = _data[v]
			}
			if (typeof(_data[v]) === 'number' && cssNumber.indexOf(v) < 0) {
				_data[v] = _data[v] + 'px'
			}
		})
		return _data
	}
	
	addClass (dom, cls) {
		let className = dom.className
		let cArr = className.split(' ')
		let addArr = cls.split(' ')
		addArr.forEach((v) => {
			if (cArr.indexOf(v) < 0) {
				cArr.push(v)
			}
		})
		dom.className = cArr.join(' ')
	}
	
	removeClass (dom, cls) {
		let className = dom.className
		let cArr = className.split(' ')
		let removeArr = cls.split(' ')
		cArr = cArr.filter((v) => {
			return removeArr.indexOf(v) < 0
		})
		dom.className = cArr.join(' ')
	}
	
	preventScroll () {
		this.addClass(document.body, 'o-h')
	}
	
	cancelPreventScroll () {
		this.removeClass(document.body, 'o-h')
	}
	
	preLoadImages (arr) {
		let newImages = []
		for (let i = 0; i < arr.length; i++) {
			newImages[i] = new Image()
			newImages[i].src = arr[i]
		}
	}
}

export default new Tool
