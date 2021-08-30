// 欢迎界面
// useState()是改变状态的开关
import React from 'react';
import WriteButton from './WriteButton';
// 在Space中介绍JSX
import Space from './Space';
// 引入react className库, 可以动态添加多个className
// import classNames from 'classnames';
// < Link >组件用来在你的应用中创建超链接。< Link >会在页面的任何地方被渲染成< a >标签。
import { Link } from "react-router-dom";



// Banner不需要了给注释了吧
// const Banner = () => {
//   const [visible, setVisible] = useState(false);
//   const [closed, setClosed] = useState(false);

//   const innerClasses = classNames('inner', { closed, visible });

//   useEffect(() => {
//     if (!visible) {
//       setTimeout(() => setVisible(true), 500)
//     }
//   },[])

//   const handleClose = (e) => {
//     e.preventDefault();
//     setClosed(true)
//   }

//   return <div className="Banner">
//     <a className={innerClasses}>
//       <div className="logo" />
//       Want to feel accomplished? Check out&nbsp;<strong>The Least <span className="red">Dangerous</span> To-Do List</strong>.
//       <div className="close" onClick={handleClose}>✚</div>
//       </a>
//   </div>
// }


const Welcome = () =>
  <div className="Welcome">
    {/* <Banner /> */}
    {/* 链接到/help */}
        <Link to="/help" className="navButton helpButton">Help</Link>
        {/* 相当于<div class="space x1"></div> */}
        <Space xl />
        <div>
          <div className="logo">
            <div className="mark">
              {/* 酒桶 */}
            <div class="keg">
              {/* 酒把 */}
        <span class="handle"></span>
        <span class="pipe"></span>
    </div>
    {/* 酒杯 */}
    <div class="glass">
        <span class="beer"></span>
    </div>

            </div>
            <h1>
              <span>喝一杯酒</span>
              <span>写一首</span>
              <span>三行诗</span>
            </h1>
          </div>
          {/* 空行 */}
          <Space m />
          <h2>
            对酒当歌，人生几何<i className="caret icon-cursor"/>
          </h2>
          <Space xl />
          <WriteButton ghost color="red" />
        </div>
        <div className="copyright">
        <p>
          copyright <a href="https://github.com/ChenZiHong-Gavin">chenzihong-gavin</a> 
        </p>
        <p>
          forked from  <a href="https://maebert.github.io/themostdangerouswritingapp">maebert.github.io/themostdangerouswritingapp</a>
        </p>
      </div>
</div>

export default Welcome;
