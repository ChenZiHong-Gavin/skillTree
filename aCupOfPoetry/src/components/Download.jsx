import React from 'react';
// 保存文件的模块
import FileSaver from 'file-saver';
import {AppContext} from './AppContext';

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
  }

  // 以第一行为标题
  download () {
    console.log(this.props)
    console.log(this.props.textTitle.replace(/([^\r])\n/g, "$1\r\n"))
    console.log(this.props.textFirstLine.replace(/([^\r])\n/g, "$1\r\n"))
    console.log(this.props.textSecondLine.replace(/([^\r])\n/g, "$1\r\n"))
    console.log(this.props.textThirdLine.replace(/([^\r])\n/g, "$1\r\n"))

    const title = (this.props.textTitle.replace(/[",.!-::']/g , "")).split("\n")[0];
    // const length = firstLine.indexOf(" ", 25);
    const length=title.length;
    const downloadTitle = title.substr(0, length > 0 ? length : 30);
    const date = new Date().toLocaleDateString();

    // Replace clean newlines with windows evil
    const text = this.props.textTitle.replace(/([^\r])\n/g, "$1\r\n")+"\n"
    + this.props.textFirstLine.replace(/([^\r])\n/g, "$1\r\n")+"\n"
    + this.props.textSecondLine.replace(/([^\r])\n/g, "$1\r\n")+"\n"
    + this.props.textThirdLine.replace(/([^\r])\n/g, "$1\r\n")+"\n"
    ;
    const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    const filename = `${downloadTitle} (三行诗 ${date}).txt`;
    FileSaver.saveAs(blob, filename);
  }

  render() {

    return (
      <AppContext.Consumer>
      { ({words}) =>
        <button onClick={this.download} className="tiny ghost">Download { words || 0 } { words === 1 ? "word" : "words" }</button>
      }
      </AppContext.Consumer>
    )
  }
}
