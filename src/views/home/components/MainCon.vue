<template>
    <div class="content">
        <div class="banner" id="home" :style="banner">
            <div class="tips">
                <h3>{{$t('banner.title')}}</h3>
                <div class="tip-btn">
                    <div class="fl">
                        <span>{{$t('banner.lBtn')}}</span>
                    </div>
                    <div class="fr">
                        <span>{{$t('banner.rBtn')}}</span>
                    </div>
                </div>
                <div>
                    <span>{{$t('banner.more')}}</span>
                    <div class="more">...</div>
                </div>
            </div>
        </div>
        <el-row>
            <el-col :span="10">
                <div class="grid-content">
                    <div className="top-line" />
                    <div className="left-text">世界</div>
                    <div className="left-text">旅游</div>
                    <div className="left-text">新生态</div>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">
                    <videoPlayer class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        @play="onPlayerPlay($event)"
                        customEventName="customstatechangedeventname">
                    </videoPlayer>
                </div>
            </el-col>
        </el-row>
        <!-- <div className="intro clearfix">
            <div className="col-md-5 fun-left">
                <div className="top-line" />
                {ABOUT[LANG].map((item, index) => {
                    return (
                        <div className="left-text" key={index}>{item}</div>
                    );
                })}
            </div>
            <div className="col-md-7 fun-right">
                <Player src="http://www.goglobechain.io/res/goglobe.mp4" />
            </div>
        </div> -->
    </div>
</template>
<script>
import videoPlayer from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      banner: {
        backgroundImage: 'url(' + require('../../../assets/banner.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center bottom'
      },
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'http://www.goglobechain.io/res/goglobe.mp4'
        }]
      }
    }
  },
  methods: {
    onPlayerPlay (player) {
      console.log('player play!', player)
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
    height: 100vh
    position: relative
    .tips
        width: 230px
        position: absolute
        bottom: 30px
        left: 50%
        margin-left: -115px
        font-size: 12px
        color: #fff
        text-align: center
        h3
            margin-top: 0
            font-size: 43px
            font-weight: bold
        .tip-btn
            margin-bottom: 10px
            overflow: hidden
            >div
                border: 2px solid #fff
                width: 105px
                height: 40px
                line-height: 40px
                border-radius: 20px
                text-align: center
        .more
            writing-mode: tb-rl
            position: absolute
            bottom: -18px
            left: 108px
            font-size: 20px
.video-player-box
    height: 300px
    width: 100%
</style>
