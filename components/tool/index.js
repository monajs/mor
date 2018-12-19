/**
 * @fileOverview utils tools
 * @author yangxi | 599321378@qq.com
 */

export const isFunction = (func) => {
	return typeof func === 'function'
}

/**
 * 获取是否处于 PC 环境
 * @returns {boolean}
 */
export const isPC = () => {
	return !(/Android|iPhone|SymbianOS|Windows\sPhone|iPod/i.test(navigator.userAgent))
}

export const removeClass = (dom, cls) => {
	const className = dom.className
	let cArr = className.split(' ')
	const removeArr = cls.split(' ')
	cArr = cArr.filter((v) => {
		return removeArr.indexOf(v) < 0
	})
	dom.className = cArr.join(' ')
}

export const addClass = (dom, cls) => {
	const className = dom.className
	const cArr = className.split(' ')
	const addArr = cls.split(' ')
	addArr.forEach((v) => {
		if (cArr.indexOf(v) < 0) {
			cArr.push(v)
		}
	})
	dom.className = cArr.join(' ')
}

function prefixList () {
	return [
		'transform',
		'transition'
	]
}

// 将样式对象转化为可使用的样式对象
function parseStyleObj (data) {
	const cssNumber = [
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

	const _data = Object.assign({}, data)
	Object.keys(_data).forEach((v) => {
		if (prefixList().indexOf(v) >= 0) {
			_data['-webkit-' + v] = _data[v]
		}
		if (typeof _data[v] === 'number' && cssNumber.indexOf(v) < 0) {
			_data[v] = _data[v] + 'px'
		}
	})
	return _data
}

export const css = (dom, data) => {
	if (!dom) {
		return
	}
	// 换个方式实现，性能应该会有比较大的提升
	const _data = parseStyleObj(data)
	Object.keys(_data).forEach((v) => {
		dom.style.setProperty(v, _data[v])
	})
}

export const removeCss = (dom, props) => {
	if (!dom) {
		return
	}
	dom.style.removeProperty(props)
	if (prefixList().indexOf(props) >= 0) {
		dom.style.removeProperty('-webkit-' + props)
	}
}
