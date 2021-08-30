import React, { Component } from 'react';
import classNames from 'classnames';
import {AppContext} from './AppContext';

// Editor写的已经非常完善了
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.titleOnChange = this.titleOnChange.bind(this);
    this.firstLineOnChange = this.firstLineOnChange.bind(this);
    this.secondLineOnChange = this.secondLineOnChange.bind(this);
    this.thirdLineOnChange = this.thirdLineOnChange.bind(this);
    this.onStroke = this.onStroke.bind(this);
    this.clearLetter = this.clearLetter.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.input = React.createRef();
    this.wrapper = React.createRef();
    this.state = {
      cutTop: false,
      cutBottom: false,
      textTitle:"",
      textFirstLine:"",
      textSecondLine:"",
      textThirdLine:"",
      letter: "",
      timerId: null,
    }

    this.invalid_keys = [
      'Backspace', 'Tab', 'Enter', 'Control', 'Alt', 'Meta', 'Escape',
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'CapsLock', 'Shift', 'Delete', 'Home', 'End', ' '
    ];
    this.disabled_keys = ['Tab'];
    this.control_keys = ['a', 'c', 'v', 'x', 'f'];

  }

  onScroll(event) {
    const { scrollTop, scrollHeight } = this.input.current;
    const height = this.wrapper.current.clientHeight;
    this.setState({
      cutTop: scrollTop > 0,
      cutBottom: scrollHeight - 10 > height + scrollTop && scrollHeight > height
    });
  }

  componentDidMount(){
   this.input.current.focus();
  }

  titleOnChange(event) {

    this.setState(
      {
        textTitle: event.target.value,
      }
      );

  }

  firstLineOnChange(event) {
    this.setState(
      {
        textFirstLine: event.target.value,
      
      }
      );
  }

  secondLineOnChange(event) {
    this.setState(
      {
        textSecondLine: event.target.value,
      }
      );
  }

  // 很奇怪的一点是
  // 一直是拼音


  thirdLineOnChange(event) {
    this.setState(
      {
        textThirdLine: event.target.value
      },() =>{
          console.log(this.state.textThirdLine); //此时的this.state.textThirdLine为true
      }
    )



  }


  onStroke(event) {
    // 按下按键时获取键盘按钮
    const key = event.key;
    // 控制按钮
    const ctrl = event.ctrlKey || event.metaKey;
    // alt按钮
    const alt = event.metaKey || event.altKey;

    // 如果按下的是被禁止的按钮
    if (this.disabled_keys.includes(key)) {
      event.preventDefault();
      return;
    };
    // 无效按钮
    if (this.invalid_keys.includes(key) || event.repeat) return;
    if (!this.props.won && ctrl && this.control_keys.includes(key)) {
      event.preventDefault();
      return;
    }


    // 开启夜间模式
    if (ctrl && alt && key === 'n') {
      this.props.onNightMode();
    }
    // 全屏模式
     else if (ctrl && alt && key === 'f') {
      this.props.onFullScreen();
    } 
    else 
    {
      clearInterval(this.state.timerId);
      this.setState({
        letter: key,
        timerId: setInterval(this.clearLetter, 200),
      });
      this.props.onStroke(key, this.state.textTitle,this.state.textFirstLine,this.state.textSecondLine,this.state.textThirdLine);
      
    }
  }


  clearLetter() {
    clearInterval(this.state.timerId);
    this.setState({letter: ""})
  }

  reset() {
    this.setState(
      { 
        cutTop: false, 
        cutBottom: false, 
        textTitle: "",
        textFirstLine:"",
        textSecondLine:"",
        textThirdLine:""
      
      });
  }

  render() { 
    return (
      <AppContext.Consumer>{ ({danger, won}) =>
      {
        return(
        <div
          className={classNames('editor', {
            danger,
            'cut-top': this.state.cutTop,
            'cut-bottom': this.state.cutBottom,
          })}
         ref={this.wrapper}
        >
          <textarea
            className="title"
            placeholder="无题"
            spellCheck="false"
            onKeyDown={this.onStroke}
            onChange={this.titleOnChange}
            onScroll={this.onScroll}
            ref={this.input}
            value={this.state.textTitle}
          ></textarea>
          
          <textarea
            className="firstLine"
            placeholder="这是一首三行诗"
            spellCheck="false"
            onKeyDown={this.onStroke}
            onChange={this.firstLineOnChange}
            onScroll={this.onScroll}
            ref={this.input}
            value={this.state.textFirstLine}
          ></textarea>

          <textarea
            className="secondLine"
            placeholder="不是两行"
            spellCheck="false"
            onKeyDown={this.onStroke}
            onChange={this.secondLineOnChange}
            onScroll={this.onScroll}
            ref={this.input}
            value={this.state.textSecondLine}
          ></textarea>

          <textarea
            className="thirdLine"
            placeholder="也不是四行"
            spellCheck="false"
            onKeyDown={this.onStroke}
            onChange={this.thirdLineOnChange}
            onScroll={this.onScroll}
            ref={this.input}
            value={this.state.textThirdLine}
          ></textarea>
        </div>)}
        
      }</AppContext.Consumer>
    )
  }
}
