import React, { Component } from 'react'
import { render } from 'react-dom'
import Router from 'components/router'
import FastClick from 'fastclick'

import 'app.less'

//*************补丁**************

FastClick.attach(document.body)

//*************页面引入**************

render(<Router />, document.getElementById('appWrapper'))

import panel from 'eruda';
panel.init();
