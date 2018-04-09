import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route ,Switch } from 'react-router-dom'
import dashboard from './component/dashboard.link/dashboard.link'
import './config'
import reducers from './reducer'
import './common.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	//谷歌浏览器redux调试工具的启用
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<Switch>
				{/*<Route path='/login' exact component={Auth}></Route>*/}
				<Route component={dashboard}></Route>
			</Switch>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
