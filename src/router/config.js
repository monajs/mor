import DefaultLayout from 'views/layout/default'
import Home from 'pages/home'
import ListView from 'pages/list-view'

export default {
	index: 'home',
	emptyPage: 'home',
	type: 'hash',
	routeList: [
		{
			layout: DefaultLayout,
			routes: {
				'home': Home
			}
		},
		{
			layout: DefaultLayout,
			routes: {
				'list-view': ListView
			}
		}
	]

}
