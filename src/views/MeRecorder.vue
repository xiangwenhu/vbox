<template>
  <div class="wrapper" :style="{'pointer-events': enabled ? 'all':'none'}">
    <div :class="recording  ?'':'hide'">
      {{timing}}
    </div>
    <div id='preview'>
      <audio controls id='audioPreview' :src="blobUrl"></audio>
    </div>
    <div class="op">
      <div class="btn-p" :class="stage == 1 ?'':'hide'" @click.stop='record'>{{recording?'暂停':'录制'}}</div>
      <div class="btn-r" :class="stage == 2 ?'':'hide'" @click.stop='save'>保存</div>
      <div class="btn-r btn-c" :class="stage == 2 ?'':'hide'" @click.stop='cancel'>取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 录制功能是否可用
        enabled: false,
        // 录制的开始事件
        startTime: new Date(),
        // 录制的数据
        chunks: [],
        // 是否处于录制状态
        recording: false,
        // 请求媒体的设置
        constraints: { audio: true },
        // 媒体录制对象      
        mediaRecorder: null,
        // 临时生成的blob地址
        blobUrl: null,
        // 录制的时长
        timing: null,
        // 1 录制阶段， 2 保存阶段
        stage: 1
      }
    },
    mounted() {
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
      if (navigator.getUserMedia && !(MediaRecorder in window)) {
        this.enabled = true
        navigator.getUserMedia(this.constraints, this.onGetUserMediaSuccess, this.onGetUserMediaError)
      } else {
        this.enabled = false
        alert('你的浏览器不支持录制功能，(-____-)')
      }
    },
    methods: {
      onGetUserMediaError(err) {
        alert('获取媒体时遇到错误:' + JSON.stringify(err))
      },
      onGetUserMediaSuccess(stream) {
        let mediaRecorder = new MediaRecorder(stream)
        mediaRecorder['onstop'] = this.onstop
        mediaRecorder['ondataavailable'] = this.ondataavailable
        this.mediaRecorder = mediaRecorder
      },
      record() {
        // 记录开始录制事件
        this.startTime = new Date()
        // 更改录制状态
        this.recording = !this.recording
        if (this.recording) {
          this.stage = 1
          if (this.mediaRecorder && this.mediaRecorder.state !== 'recording') {
            this.mediaRecorder.start()
          }
          // 更新录制时间
          this.tickets = setInterval(() => {
            this.timing = ((new Date() - this.startTime) / 1000).toFixed(1) + 's'
          }, 100)
        } else {
          clearInterval(this.tickets)
          this.stage = 2
          if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop()
          }
        }
      },
      cancel() {
        this.timing = null
        this.stage = 1
        this.recording = false
        this.chunks = []
        this.blobUrl = ''
        clearInterval(this.tickets)
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop()
        }
      },
      async save() {
        var blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' }),
          time = new Date().toLocaleString().replace(/[^\x00-\xff]/g, '').replace(/\//g, '-'),
          fname = window.prompt('请输入音乐的名字', `我的音乐-${time}`),
          songmid = 'MyMusic' + new Date().getTime()
        let fs = await window.FileSystem.getInstance()
        if (fs && typeof fs.root.remove === 'function') {
          let file = fs.root.getFile(`vbox/C400${songmid}.m4a`)
          await file.write(blob)
          this.$store.commit('playing/addSong', {
            songname: fname,
            songmid: songmid,
            singer: '未知歌手',
            albummid: '',
            interval: Number.parseInt(this.timing)
          })
          if (this.blobUrl) {
            window.URL.revokeObjectURL(this.blobUrl)
          }
          this.cancel()
          alert('保存成功')
        } else {
          alert('说好的文件系统呢？')
        }
      },
      onstop() {
        var blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
        this.blobUrl = window.URL.createObjectURL(blob)
      },
      ondataavailable(e) {
        this.chunks.push(e.data)
      }
    }
  }

</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .btn-r,
  .btn-p {
    height: 60px;
    width: 60px;
    background: green;
    border-radius: 9999px;
    line-height: 60px;
    text-align: center;
  }

  .btn-c {
    background: red;
  }

  .hide {
    display: none
  }

  .op {
    display: flex;
  }
</style>