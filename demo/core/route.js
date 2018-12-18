import Url from './url'
import Events from 'events'
import routeConf from 'routeConf'

class Route extends Events.EventEmitter {
	constructor (props) {
		super(props)
		window.addEventListener('hashchange', this.format.bind(this), false)
		this.format()
	}
	
	format () {
		const url = new Url('/' + location.hash.substring(1))
		let routePath = url.pathname.length > 1 ? url.pathname.substring(1) : routeConf.index
		//routePath = routePath.substr(-1) === "/"?routePath.substr(0,routePath.length-1):routePath;
		
		let routeInfo = this.matchRoute(routePath)
		
		if (!routeInfo) {
			this.go('404')
			return
		}
		
		const params = Url.parseParam(url.search)
		this.current = {
			page: routeInfo.page,
			routePath: routePath,
			params: Object.assign({}, params, routeInfo.params),
			url: url,
		}
		this.emit('change', this.current)
	}
	
	parseStrToRegExp (str) {
		let params = []
		let reg = str.replace(/\/\:([^\/]+)/g, function (t, k) {
			params.push(k)
			return '/([^\/]*)'
		})
		return {
			regExp: new RegExp('^' + reg + '$'),
			params: params,
		}
	}
	
	matchRoute (path) {
		if (!this.routeInfo) {
			let keys = Object.keys(routeConf.routes)
			this.routeInfo = keys.map((v) => {
				let info = {
					path: path,
					page: routeConf.routes[v],
				}
				return Object.assign(info, this.parseStrToRegExp(v))
			})
		}
		let l = this.routeInfo.length
		for (let i = 0; i < l; i++) {
			let regInfo = this.routeInfo[i].regExp.exec(path)
			if (regInfo) {
				let paramData = regInfo.slice(1)
				let params = {}
				this.routeInfo[i].params.forEach((v, j) => {
					params[v] = paramData[j]
				})
				return {
					params: params,
					page: this.routeInfo[i].page,
				}
			}
		}
		return false
	}
	
	//不修改hash，跳页面
	switchPage (path, data) {
		window.location.replace('#' + path + (data ? '?' + Url.param(data) : ''))
	}
	
	getPage (routePath) {
		return routeConf.routes[routePath] || ''
	}
	
	href (path, data) {
		return '#' + path + (data ? '?' + Url.param(data) : '')
	}
	
	go (path, data) {
		location.hash = '#' + path + (data ? '?' + Url.param(data) : '')
	}
}

export default new Route
