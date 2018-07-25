import Index from 'views/index'
import Hammer from 'views/hammer'
import MountRoot from 'views/mount-root'
import Toast from 'views/toast'
import Modal from 'views/modal'
import PickerView from 'views/picker-view'
import Popup from 'views/popup'
import Layout from 'views/layout'

export default {
	index: 'index',
	routes: {
		'404': Index,
		'index': Index,
		'hammer': Hammer,
		'mount-root': MountRoot,
		'toast': Toast,
		'modal': Modal,
		'picker-view': PickerView,
		'popup': Popup,
		'layout': Layout
	}
}
