import React from 'react';
import {withAppContext} from './AppContext';

// word=1 words>1
const WordCount = ({words}) =>
  <div className="wordcount">{ words || 0 } { words === 1 ? "word" : "words" }</div>

export default withAppContext(WordCount);
