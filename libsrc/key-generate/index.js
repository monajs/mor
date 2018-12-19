/**
 *    created by yangxi on 2018-08-05
 *    单页面提供唯一key
 */

class KeyGenerate {
	keyList = []
	nameSpace = 'mona_key'
	
	start = 1000
	
	getMonaKey () {
		this.start += 1
		const key = `${this.nameSpace}_${this.start}`
		this.keyList.push(key)
		return key
	}
	
	isKeyAvailable (key) {
		return this.keyList.indexOf(key) !== -1
	}
}

export default new KeyGenerate
