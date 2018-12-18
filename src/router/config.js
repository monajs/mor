import DefaultLayout from 'views/layout/default'
import Home from 'pages/home'

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
		}
	]
	
}
