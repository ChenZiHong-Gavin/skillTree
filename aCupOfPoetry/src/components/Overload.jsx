import React from 'react';
// react的一个css动画组件
import { CSSTransitionGroup } from 'react-transition-group';

import WriteButton from './WriteButton';
import {withAppContext} from './AppContext';

// const TweetButton = ({words}) => {
//   const href = `https://twitter.com/intent/tweet?text=I+wrote+${words}+words+using+The+Most+Dangerous+Writing+App+-+until+it+deleted+everything+.+%23MDWA&url=http%3A%2F%2Fwww.themostdangerouswritingapp.com`;
//   const label = `I wrote ${words} words using The Most Dangerous Writing App - until it deleted everything.`;
//   return <a className="tweet" href={href}>{label}</a>;
// }

// QQ空间分享按钮
const QzoneButton = () => {
  const href = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=chenzihong-gavin.github.io&sharesource=qzone&title=一杯酒写一首三行诗&summary=我在写三行诗, 一起来玩吧`;
  const label = `我在写三行诗, 一起来玩吧`;
  return <a className="Qzone" href={href}>{label}</a>;
}


const Overload = ({onReset, toggleHelp, limit, type, lost, words }) => {
  return (
    <CSSTransitionGroup
      transitionName="overload"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={100}
    >
    { lost && (
      <div className='overload' key="overload">
        <a className="navButton helpButton white" onClick={toggleHelp}>Help</a>
        <div className="inner">
          <h3>说好的三行呢?</h3>
          <QzoneButton />
          <WriteButton
            ghost
            noPanel
            color="white"
            label="Try
            Again."
            type={type}
            limit={limit}
          />
        </div>
      </div>
      )}
    </CSSTransitionGroup>
  )
}

export default withAppContext(Overload);
