// JSX是JavaScript的语法拓展
// 就是在JS中使用标记语言

// 元素是构成 React 应用的最小砖块。
// 元素描述了你在屏幕上想看到的内容。


import React from 'react';
import classNames from 'classnames';

// 接收唯一带有数据的 “props”（代表属性）
const Space = (props) => {
    const classes = classNames('space', props);
    return <div className={classes} />
}

// 返回一个className为space的标签
export default Space;

// 这个意思就是
// 从props获取属性, 并把它和space结合，然后返回一个div标签，它的className是刚刚的结合
