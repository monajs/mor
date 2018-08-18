import React, { Component } from 'react'
import { render } from 'react-dom'
import Router from 'components/router'
import FastClick from 'fastclick'
import { Tool } from 'mona'

import 'app.less'

FastClick.attach(document.body)

render(<Router />, document.getElementById('appWrapper'))

// import panel from 'eruda';
// panel.init();
