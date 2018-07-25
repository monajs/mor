//消息机制（监听者模式）
export default class MonaEvents {
	_monaEvents = {}
	
	emit (name, ...data) {
		if (!this._monaEvents[name]) {
			return
		}
		this._monaEvents[name].forEach((v) => {
			v.fun(...data)
			if (v.count > 0) {
				v.count -= 1
			}
		})
		this._monaEvents[name] = this._monaEvents[name].filter((v) => {
			return v.count !== 0
		})
	}
	
	on (eName, fun, count = -1) {
		if (!eName) {
			throw new Error('事件名不允许为空')
		}
		if (typeof a === 'number') {
			throw new Error('事件名不允许为数字')
		}
		let nameInfo = eName.split('.')
		let name = nameInfo[0]
		if (!this._monaEvents[name]) {
			this._monaEvents[name] = []
		}
		this._monaEvents[name].push({
			fun: fun,
			count: count,
			key: nameInfo[1]
		})
	}
	
	once (name, fun) {
		this.on(name, fun, 1)
	}
	
	off (eName, fun) {
		if (!eName) {
			return
		}
		let nameInfo = eName.split('.')
		let name = nameInfo[0]
		let key = nameInfo[1]
		if (!this._monaEvents[name]) {
			return
		}
		if (!key) {
			if (!fun) {
				this._monaEvents[name] = undefined
				return
			}
			this._monaEvents[name] = this._monaEvents[name].filter((v) => {
				return v.fun !== fun
			})
			return
		}
		
		if (key) {
			if (fun) {
				this._monaEvents[name] = this._monaEvents[name].filter((v) => {
					return v.key !== key && v.fun === fun
				})
				return
			}
			this._monaEvents[name] = this._monaEvents[name].filter((v) => {
				return v.key !== key
			})
		}
	}
}
