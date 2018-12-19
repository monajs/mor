import moment from 'moment'
import Route from 'core/route'
import { Toast } from 'mona'

//基础工具
class Util {
	moment (date) {
		return moment(date)
	}
	
	info (info) {
		Toast.config({ message: info })
	}
	
	success (info) {
		Toast.config({ message: info, type: 'success' })
	}
	
	error (info) {
		Toast.config({ message: info, type: 'error' })
	}
	
}

export default new Util
