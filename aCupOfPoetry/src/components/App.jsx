import React from 'react';
import classNames from 'classnames';
// react实现全屏的组件
import Fullscreen from "react-full-screen";
// 进度条
import Progress from './Progress';
// 字数统计
import WordCount from './WordCount';
// 开始按钮
import WriteButton from './WriteButton';
// 失败情况
import Failure from './Failure';

// // 下载
// import Download from './Download';
// 编辑器
import Editor from './Editor';
// 文本状态
import {AppContext} from './AppContext';

export default class WritingApp extends React.Component {
  constructor(props) {
    super(props);
    let {limit, type} = this.props;
    this.handleStroke = this.handleStroke.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleNightMode = this.toggleNightMode.bind(this);
    this.now = this.now.bind(this);
    this.editor = React.createRef();

    this.state = {
      run: false,
      startTime: null,
      fullscreen: false,
      nightMode: localStorage.getItem("mdwa.night-mode") === "true",
      progress: 0,
      timeSinceStroke: 0,
      danger: false,
      won: false,
      lost: false,
      overload:false,
      fade: 2,
      kill: 5,
      limit: limit,
      type: type,
      textTitle:"",
      textFirstLine:"",
      textSecondLine:"",
      textThirdLine:"",
    };


  }

  componentDidMount() {
    if (window.plausible) window.plausible('Editor')
  }

  startWriting() {
    // 准备书写
    if (window.plausible) 
      window.plausible('Start Writing')
    this.setState({
      // 开始运行
      run: true,
      // 开始时间
      startTime: this.now(),
      timerID: setInterval(() => this.tick(), 100),
    })
  }

  toggleNightMode() {
    localStorage.setItem("mdwa.night-mode", !this.state.nightMode);
    this.setState((prevState, props) => ({ nightMode: !prevState.nightMode }));
  }

  toggleFullscreen() {
    this.setState((prevState, props) => ({ fullscreen: !prevState.fullscreen }));
  }

  handleStroke(char, textTitle,textFirstLine,textSecondLine,textThirdLine) {
    // 没有运行并且没有完成
    // 即在一开始还没写的状态
    if (!this.state.run && !this.state.won) 
      this.startWriting();
    // 运行之后开始处理danger
    this.toggleDanger(false);


    this.setState({
      textTitle,
      textFirstLine,
      textSecondLine,
      textThirdLine,
      timeSinceStroke: 0
    });
  }

  stopWriting() {
    clearInterval(this.state.timerID);
  }

  toggleDanger(on) {
    // 如果state的danger=on,直接返回
    if (this.state.danger === on) 
      return;
    // 否则把state的danger设置为on
    this.setState({danger: on});
  }

  now() 
  {
    // 返回一个整数值，是一个毫秒数
    // 除以1000之后变成了秒数
    return new Date().getTime() / 1000;
  }

  win() 
  {
    this.stopWriting();
    this.setState({
      won: true,
      run: false
  })
    
    if (window.plausible) window.plausible('Win')
  }

  fail() {
    this.stopWriting();
    this.setState(
      {
        lost: true
      }
      )
    if (window.plausible) window.plausible('Fail')
  }

  overload() {
    this.stopWriting();
    this.setState(
      {
        overload: true
      }
      )
    if (window.plausible) 
    {
      console.log("sm")
      window.plausible('Overload')
    }
  }

  reset(type, limit) {
    this.setState({
      type,
      limit,
      won: false,
      lost: false,
      run: false,
      startTime: null,
      progress: 0,
      timeSinceStroke: 0,
      danger: false,
    });
    this.editor.current && this.editor.current.reset();
  }

  // 计时
  tick() {
    const {
      run,
      timeSinceStroke,
      startTime,
      type,
      limit,
      kill,
      textTitle,
      textFirstLine,
      textSecondLine,
      textThirdLine,
    } = this.state;

    // this.setState({
    //   textTitle,
    //   textFirstLine,
    //   textSecondLine,
    //   textThirdLine,
    //   words,
    //   timeSinceStroke: 0
    // });


    if (!run) 
      return;
    // 如果停止之后的时间比fade时间长，那就是危险
    //const danger = timeSinceStroke >= fade;


    if (timeSinceStroke >= kill) 
      //return this.fail();
      console.log();


    const duration = this.now() - startTime;
    const progress = (duration / 60.0 ) / limit;
    
    // 如果进度到了95%,还没有到要求
    const danger = progress >= 0.95;

    // 如果完成了并且文字达到要求
    if (progress >= 1) 
    {
      const title = (textTitle.replace(/[",.!-::']/g , "")).split("\n");
      const firstLine= (textFirstLine.replace(/[",.!-::']/g , "")).split("\n");
      const secondLine = (textSecondLine.replace(/[",.!-::']/g , "")).split("\n");
      const thirdLine=(textThirdLine.replace(/[",.!-::']/g , "")).split("\n");
      var titleLength=title.length;
      var firstLineLength=firstLine.length;
      var secondLineLength=secondLine.length;
      var thirdLineLength=thirdLine.length;
      console.log(firstLine)
      if( titleLength>1 || firstLineLength>1 || secondLineLength>1 || thirdLineLength>1 )
      {
        console.log("多写了几行")
        this.fail()
      }
      if( title[0]==="" || secondLine[0]==="" || firstLine[0]==="" || thirdLine[0]==="" )
{
  this.fail()
}
this.win()
    }

    this.setState((prevState, props) => ({
      progress,
      danger,
      timeSinceStroke: prevState.timeSinceStroke + 0.1
    }));
  }

  render() {
    const {
      fullscreen,
      danger,
      won,
      lost,
      nightMode,
      limit,
      type
    } = this.state;

    const appClass = classNames('app', {
      'night-mode': nightMode,
      danger: danger
    });
    return (
      <Fullscreen enabled={fullscreen} >
        {/* 用于生产共享数据的地方 */}
        <AppContext.Provider value={this.state}>
          <div className={appClass} >
            <Failure />

            <Progress />
            <div className="buttons">
              {/* 夜间模式 */}
              <i className="icon-night-mode" onClick={this.toggleNightMode}></i>
              {/* 全屏 */}
              <i className="icon-fullscreen" onClick={this.toggleFullscreen}></i>
            </div>
            {!lost && (
              <div className="content">
                <Editor
                  ref={this.editor}
                  won={won}
                  onStroke={this.handleStroke}
                  onNightMode={this.toggleNightMode}
                  onFullScreen={this.toggleFullscreen}
                />
                {
                  
                  won && <WriteButton small ghost hidePanel label="Start Again" {...{limit, type}} />

                }
              </div>
            )}
          </div>
        </AppContext.Provider>
      </Fullscreen>
    );
  }
}
