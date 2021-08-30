import React from 'react';

// 文本的状态
// context是react的一个高级API
// 当你不想使用props或者state传值的时候，可以用context
// 如果要context发挥作用，需要用到两种组件
// 一种是context生产者，通常是一个父节点

// 创建一个context对象
export const AppContext = React.createContext({
  won: false,
  lost: false,
  danger: false,
  limit: 5,
  progres: 0,
  type: "minutes",
  hardcore: false
});

export function withAppContext(Component, data = {}) {
   return class extends React.Component {
      render() {
         return (
            // 这个函数接受当前的context
            <AppContext.Consumer>
               {context => (
                  <Component {...context} {...data} />
               )}
            </AppContext.Consumer>
         )
      }
   }
}
