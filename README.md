# vbox
一款基于vue的音乐播放web app<br/>
<p>在线预览地址 <a href= 'https://babydairy2017.cloudapp.net:8084' target='_blank'>VBox</a>  </p>
<strong>因预览服务器不在中国，qq音乐里面的MV数据是请求不到的</strong>
<strong>预览版本不是最新版本，请下载最新版到本地预览。service Worker因为证书问题，可能不能正常工作，可以下载项目进行预览</strong>
<br/>
 <p>功能</p>
<ul>
  <li>首页
    <ul>
      <li>流行指数，热歌，新歌，中国新歌声排行摘要</li>
      <li>热门歌单 --（歌单详情未完成）</li>
    </ul>
  </li>
  <li>歌手
    <ul>
      <li>分类搜索</li>
      <li>歌手歌曲</li>
      <li>歌手专辑</li>
      <li>歌手MV</li>
      <li>歌手详情</li>
    </ul>
  </li>
  <li>专辑
    <ul>
      <li>简单搜索（最新最热）</li>
      <li>多条件搜素</li>
      <li>专辑详情</li>      
    </ul>
  </li>
  <li>排行榜
    <ul>
      <li>
        QQ音乐巅峰榜
        <ul>
          <li>流行指数</li>
          <li>热歌</li>
          <li>新歌</li>
          <li>中国新歌声</li>
          <li>网络歌曲</li>
          <li>内地</li>
          <li>港台</li>
          <li>欧美</li>
          <li>韩国</li>
          <li>日本</li>
          <li>音乐人</li>
          <li>K个金曲</li>
          <li>MV -- (未完成)</li>
        </ul>
      </li>
      <li>全球榜
      <ul>
        <li>vivo 手机 高品质音乐榜</li>
        <li>美国公告牌榜</li>
        <li>美国iTunes榜</li>
        <li>韩国Mnet榜</li>
        <li>英国UK榜</li>
        <li>日本公信榜</li>
        <li>香港电台榜</li>
        <li>香港商台榜</li>
        <li>台湾幽浮榜</li>
      </ul>
      </li>
    </ul>
  </li>
  <li>歌单
    <ul>
      <li>快捷搜索（最新最热）</li>
      <li>快捷分类搜索</li>
      <li>歌单详情 -- 未完成</li>
    </ul>
  </li>
  <li>MV
    <ul>
      <li>便捷搜索(最新最热)</li>
      <li>多条件搜索</li>
      <li>MV播放</li>
      <li>同艺人的其他MV</li>  
      <li>粉丝们也喜欢看</li>     
    </ul>
  </li>
  <li>搜索
    <ul>
      <li>热门搜索</li>
      <li>搜索推荐</li>
      <li>搜索结果</li>
      <li>搜索历史--未完成</li>
    </ul>
  </li>
  <li>分享 -- 未完成</li>
  <li>设置
    <ul>
      <li>清除缓存</li>
      <li>检查更新 -- （浏览器需要支持ServiceWorker）</li>
      <li>录制音乐--（浏览器需要支持MediaRecorder）</li>
    </ul>
  </li>
  <li>
    其他
    <ul>
      <li>离线提醒 -- (浏览器需要支持Notification)</li>
    </ul>
  </li>
</ul>
<br/>


#VBox特色说明
<ul>
  <li>响应式</li>
  <li>程序本身只有极少的图片，其余都是css3画</li>
  <li>支持离线存储
    <ul>
      <li>localStorage存储基本信息</li>
      <li>indexedDB和FileSystem存储音乐文件</li>
    </ul>
  </li>
  <li>在浏览器支持的情况下：支持录制音乐（MediaRecorder）</li>
  <li>在浏览器支持的情况下：支持离线浏览(serviceWoker)，即断网的情况，页面可以刷新，音乐可以播放，（ctrl + F5例外）</li>
  <li>断网会有友好的断网桌面提醒</li>
</ul>

<br>

#功能特别说明
<ul>
  <li>上一首和下一首的歌曲切换是通过左右滑动实现的，因为touchmove的问题，在andriod内置浏览器可能存在问题</li>
  <li>播放的音乐在播放后会被缓存到文件系统（基于indexedDB和FileSystem），但是会多发一次ajax请求</li>
  <li>录制音乐需要点击保存，才会保存到文件系统</li>
  <li>检查更新会检查serviceWorker文件的更新，如果是启用vue-cli npm run dev进行调试，可能导致serviceWork不正常工作，请F12进行卸载或者ctrl + F5强制重新安装</li>
</ul>


<p技术栈</p>
<ul>
  <li>
    html
    <ul>
      <li>audio & video</li>
      <li>figure,footer, header等等</li>
    </ul>
  </li>
  <li>
    CSS
    <ul>
      <li>rem</li>
      <li>flex布局</li>
      <li>css伪类（画图标）等</li>
    </ul>
  </li>
  <li>
  JavaScript
    <ul>
      <li>ES6 & ES7</li>
      <li>vue & vue-router & vuex & vue-infinite-loading & vue-lazyload</li>
      <li>fetch</li>
      <li>Web API
        <ul>
          <li>indexedDB & FileSystem</li>
          <li>serviceWorker</li>
          <li>MediaRecorder</li>
          <li>Notification</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

#还在研究和可能添加的技术/功能
<ul>
  <li>在线分享（基于socket.io + webRTC）</li>
  <li>附近的人也在听 (geolocation或者第三方API)</li>
  <li>网络状态提醒（呵呵，native app容易 web app不容易）</li>
</ul>



## 安装步骤

# 安装依赖
npm install

# 本地调试
npm run dev

# 生产构建
npm run build




