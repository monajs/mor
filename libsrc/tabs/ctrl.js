import Events from '../events'

class TabsCtrl extends Events {
	itemKeyList = [] // 控制tabsItem的加载
	
	setTabItemKey (key) {
		if (this.itemKeyList.indexOf(key) !== -1) {
			return
		}
		this.itemKeyList.push(key)
	}
	
	getTabsItemKey () {
		return this.itemKeyList
	}
}

export default new TabsCtrl
