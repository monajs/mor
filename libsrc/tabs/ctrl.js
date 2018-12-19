import Events from 'mona-events'

export default class TabsCtrl extends Events {
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
