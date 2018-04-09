import React from 'react'
import ReactDom from 'react-dom'
import reducers from './reducer'
import { createStore, applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route} from 'react-router-dom'
import Dashboard from './component/dashboard.link/dashboard.link'
import Weixin from './Authentication'
import RouteLink from './route/route'
import { CookiesProvider } from 'react-cookie';
import './common.css'
import './config'
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	//谷歌浏览器redux调试工具的启用
	window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
	(<Provider store={store}>
		<CookiesProvider>
			<BrowserRouter>
				<div>
					<Weixin/>
                    {/*<Route component={KsLink}/>*/}
                    {/*<RouteLink/>*/}
					<Route component={Dashboard} />
					<RouteLink/>
				</div>
			</BrowserRouter>
		</CookiesProvider>
	</Provider>),
	document.getElementById('root')
)