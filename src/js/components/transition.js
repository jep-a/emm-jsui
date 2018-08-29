import {CSSTransition} from 'react-transition-group'
import React from 'react'

import {transitions} from '../animators/sub-animator'

const FadeTransition = ({classNames = 'fade', ...props}) => <CSSTransition classNames={classNames} timeout={transitions.fast.timeout} {...props}/>

export default FadeTransition