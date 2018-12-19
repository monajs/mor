export default class Url {
	constructor (path) {
		let _def = {
			hash: '',
			host: '',
			hostname: '',
			href: '',
			username: '',
			password: '',
			origin: '',
			pathname: '',
			port: '',
			protocol: '',
			search: '',
		}
		let _a = null
		//if(window.hasOwnProperty("URL")){
		//_a = new URL(path,location.href);
		//}else{
		_a = document.createElement('a')
		_a.href = path
		//}
		for (let i in _def) {
			this[i] = _a[i] ? _a[i] : _def[i]
		}
	}
	
	toString () {
		return (
			(this.protocol && (this.protocol + '://')) +
			(this.username && (this.useranme + (this.password && (':' + this.password)) + '@')) +
			(this.host) +
			(this.port && (':' + this.port)) +
			(this.path) +
			(this.search) +
			(this.hash)
		)
	}
	
	static param (data) {
		let _t = []
		Object.keys(data).forEach(function (vi) {
			if (data[vi] !== undefined) {
				_t.push(vi + '=' + data[vi])
			}
		})
		return _t.join('&')
	}
	
	static parseParam (search) {
		if (search.indexOf('?') === 0) {
			search = search.substring(1)
		}
		let _t = search.split('&')
		let params = {}
		_t.forEach(function (vi) {
			let _p = vi.split('=')
			if (_p.length !== 2) {
				return
			}
			params[_p[0]] = _p[1]
		})
		return params
	}
}

