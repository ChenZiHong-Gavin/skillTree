// 开始按钮 Startwriting
import React from 'react';
// < Link >组件用来在你的应用中创建超链接。< Link >会在页面的任何地方被渲染成< a >标签。
import { Link } from "react-router-dom";
// 引入react className库, 可以动态添加多个className
var classNames = require('classnames');

// REACT的组件可以定义为class或者函数的形式
// 如需定义 class 组件，需要继承 React.Component
export default class WriteButton extends React.Component {
  // 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
  constructor(props) {
    // 应在其他语句之前调用 super(props)
    super(props);
    // 通常，在 React 中，构造函数仅用于以下两种情况：
    //  1. 通过给 this.state 赋值对象来初始化内部 state。
    //  2. 为事件处理函数绑定实例
    this.state = {
      // 时间限制
      limit: this.props.limit || 1,
      // 时间类型
      type: this.props.type || "minutes",
      // 时间展示模板（有点多余
      compact: true,
      // 隐藏
      hidePanel: this.props.hidePanel
    };


    this.onExpand = this.onExpand.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.setType = this.setType.bind(this);
    // this.toggleHardcore = this.toggleHardcore.bind(this);
    this.showPanel = this.showPanel.bind(this);
  }

  // 把模板设为false
  onExpand() {
    this.setState({compact: false});
  }

  // 渲染选择模板
  renderCompactChooser() {
    const {limit, type} = this.state;
    return (
      <div className="session-chooser">
        {/* 点击的时候关闭时间展示模板 */}
        <div className="compact"  onClick={ this.onExpand }>
          Session length:
          <span className="choice">{limit} {type} <i className="edit icon-pencil"></i></span>

        </div>
      </div>
    )
  }

  showPanel() 
  { 
    this.setState({hidePanel: false}); 
  }

  // 设置时间
  setLimit(limit) { this.setState({limit}); }
  // 设置时间类型
  setType(type) {
    this.setState({
      type: type,
      limit: this.props.limits[type][1]
    });
  }

  // toggleHardcore(hardcore)
  // {
  //    this.setState((prevState, props) => ({ hardcore: !prevState.hardcore })); 
  // }

  renderOptions() { 
    const options = this.props.limits[this.state.type];
    if (this.state.type === this.props.type && !options.includes(this.props.limit)) {
      options.push(this.props.limit);
      options.sort((a, b) => a - b);
    }
    return options.map((limit) => {
      // 点击设置时间限制
      const classes = classNames('radio', {active: limit === this.state.limit});
      return <span key={limit} className={classes} onClick={() => this.setLimit(limit)}>{limit}</span>
    }
    );
  }

  renderFullChooser() {
    const classes = classNames('full', this.state.type)
    return (
      <div className="session-chooser">
        <div className={classes}>
          <div className="tabs">
              <span className="minutes" onClick={() => this.setType("minutes")}>Minutes</span>

          </div>
          <div className="radios">
            { this.renderOptions() }
          </div>
        </div>
      </div>
    )
  }

 // render() 方法是 class 组件中唯一必须实现的方法。
  render() {
    const wrapperWlasses = classNames("writeButton", {small: this.props.small})
    const buttonClasses = classNames(this.props.color, {
      small: this.props.small,
      ghost: this.props.ghost
    })
    const {limit, type, hardcore} = this.state;
    return (
      <div className={wrapperWlasses}>
        { !this.props.noPanel && !this.state.hidePanel && (this.state.compact ? this.renderCompactChooser() : this.renderFullChooser()) }
        <Link
          to={{
            pathname: "/write",
            search: `?limit=${limit}&type=${type}` + (hardcore ? '&hardcore=true' : '')
          }}
          className={buttonClasses}
          onMouseOver={this.showPanel}
        >
          { this.props.label }
        </Link>
      </div>
    )
  }
}

WriteButton.defaultProps = {
  label: "开始写诗",
  small: false,
  // 开始的时候不显示
  hidePanel: true,
  limits: {
    minutes: [1, 3, 5, 10]
  }
}
