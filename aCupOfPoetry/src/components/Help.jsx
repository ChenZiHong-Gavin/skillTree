import React from "react";
// 开始写诗的按钮
import WriteButton from "./WriteButton";
// 空行
import Space from "./Space";
import { Link } from "react-router-dom";

// 引用
const renderQuote = ({ text, author, url }) => {
  return (
    <blockquote cite={url} key={author}>
      <p>
        {/* 左右引号 */}
        <i className="icon-quote-left" />
        {text}
        <i className="icon-quote-right" />
      </p>
      <p className="author">
        &mdash; <a href={url}>{author}</a>
      </p>
    </blockquote>
  );
};

export default class Help extends React.Component {
  // 引用
  static quotes = [
    {
      text: "命中因怯暖/不敢向君开/春来抱死赴尘埃",
      author: "2014南大“单身·三行诗”比赛",
      url:
        "http://edu.people.com.cn/n/2014/1120/c1053-26062046.html"
    },
    {
      text: "螃蟹在剥我的壳/笔记本在写我/漫天的我落在枫叶上雪花上/而你在想我",
      author: "武汉大学三行情诗比赛",
      url: "https://www.jianshu.com/p/5604e5e08866"
    }
  ];

  componentDidMount() {
    if (window.plausible) window.plausible('Help')
  }

  render() {
  return (
    <div className="Help">
      <Link to="/" className="navButton backButton">
        Back
      </Link>
      <Space l />
      <div className="content">

        <h1>我想说的</h1>
        <h2>为什么要做这个？</h2>
        <p>
          我自己不喝酒。
        </p>
        <p>
          我听过许多诗人酒后挥毫。
        </p>
        <p>
          我也看到有程序员微醺后创意迸发。
        </p>
        <p>
          我看到许多人在训练AI写诗。
        </p>
        <p>
          我发现大家都不写诗了。
        </p>


        <Space m />
        <WriteButton ghost color="red" />

        <h2>写给诗人</h2>

        <p>
          苦闷的时候写点诗
        </p>
        <p>
          日子会变得好过点吧
        </p>
        <p>
          不必长， <abbr title="源自日本的一种微型诗，只有三行">三行</abbr>就够了
        </p>

        {Help.quotes.map(quote => renderQuote(quote))}


        
        <Space m />
        <WriteButton ghost color="red" />


        <h2>写给程序员</h2>

        <p>这个项目是模仿前两年一个著名项目写的: </p>


        <p>
          <i className="icon-mdwa" />{" "}
          <abbr title="The Most Dangerous Writing App">MDWA</abbr> was written
          by{" "}
          <a
            href="https://www.twitter.com/maebert"
            rel="noopener noreferrer"
            target="_blank"
            title="Manuel Ebert"
          >
            Manuel Ebert
          </a>{" "}
          </p>

          <p>
          over two glasses of wine
          </p>

          <p>
          on a Sunday afternoon
          </p>

          <p>
           and is{" "}
          </p>

           <p>
          <a
            title="MDWA on Github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/maebert/themostdangerouswritingapp"
          >
            <i className="icon-github" />open source
          </a>
          .
        </p>

        <p>
          The domain <a href="https://themostdangerouswritingapp.com">themostdangerouswritingapp.com</a> 
          
        </p>

        <p>
          has been acquired 
          </p>

          <p>
          by <a href="https://www.squibler.io" title="Squibler">Squibler</a>, 
        </p>

        <p>
          who now maintain and continue to develop the app.{" "}
          </p>
          <p>
          This is the the original version of the app,
          </p>
          <p>
           which will continue to be available
           </p>

           <p>
            at 
            </p>
            <p>
            <a href="https://maebert.github.io/themostdangerouswritingapp">maebert.github.io/themostdangerouswritingapp</a>.
        </p>

        <p>作为REACT入门的一个项目</p>
        <p>我在里面写满了注释</p>
        <p>有兴趣的朋友可以<a href="https://github.com/ChenZiHong-Gavin/themostdangerouswritingapp">看看</a></p>


        <Space m />
        <WriteButton ghost color="red" />

        <h2>关于我自己</h2>
        <p>
          如果对我感兴趣，可以访问我的
          <a href="https://github.com/ChenZiHong-Gavin">github主页</a>
          ,
          <a href="https://www.zhihu.com/people/cheng-zi-hong-97">知乎</a>
          ,
          <a href="https://space.bilibili.com/291947905">B站</a>
          。
        </p>

    
      <h2>
        拜托
      </h2>
        <p>
          如果可以，希望关注一下<a href="https://cn.bing.com/search?q=%E6%89%AC%E5%B7%9E%E7%96%AB%E6%83%85&cvid=12f56cfa4d5746d4a3f0aff493d3128b&aqs=edge.0.69i59j0l5j69i60.5454j0j4&FORM=ANAB01&PC=NMTS">扬州疫情</a>
        </p>


        <Space l />
      </div>
    </div>
  );
}
};

