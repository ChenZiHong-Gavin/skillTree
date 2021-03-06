// 进度条

import React from 'react';
import {withAppContext} from './AppContext';

var classNames = require('classnames');

const Progress = ({progress, danger, won}) =>
  <div className={classNames('progress', {danger: danger, won: won})}>
    <div style={{ width: progress * 100 + '%'}}></div>
  </div>

export default withAppContext(Progress);

  // won: false,
  // lost: false,
  // danger: false,
  // limit: 5,
  // progres: 0,
  // type: "minutes",
  // hardcore: false
