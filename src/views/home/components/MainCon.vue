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
                    <!-- <videoPlayer class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        @play="onPlayerPlay($event)"
                        customEventName="customstatechangedeventname">
                    </videoPlayer> -->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div>{{$t('intro.title')}}</div>
            <el-row>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-for="(item, index) in $t('intro.describe')" :key='index'>
                    <div className="item-pic"><img src="@/assets/globe-1.png" /></div>
                    <div>{{item}}</div>
                </el-col>
            </el-row>
            <div v-for="(item, index) in $t('intro.notice')" :key="index">{{item}}</div>
        </el-row>
        <el-row class="feature">
            <div>{{$t('feature.title')}}</div>
            <el-row>
                <el-col :span="24" v-for="(item, index) in $t('feature.contents')" :key='index'>
                    <div className="item-pic"><img src="@/assets/icon-1.png" /></div>
                    <div>
                        <div>{{item.title}}</div>
                        <div>{{item.intro}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="download">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('download')" :key='index'>
                <div className="item-pic"><img src="@/assets/document1.png" /></div>
                <div>{{item.title}}</div>
            </el-col>
        </el-row>
        <el-row class="team">
            <div>{{$t('team.title')}}</div>
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('team.members')" :key='index'>
                    <div className="item-pic"><img src="@/assets/logo.png" /></div>
                    <div>
                        <div>{{item.name}}</div>
                        <div>{{item.desc}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="adviser">
            <div>{{$t('adviser.title')}}</div>
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('adviser.members')" :key='index'>
                    <div className="item-pic"><img src="@/assets/logo.png" /></div>
                    <div>
                        <div>{{item.name}}</div>
                        <div>{{item.desc}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="investor">
            <div>{{$t('investor.title')}}</div>
            <el-row>
                <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item, index) in investorArr" :key='index'>
                    <img :src="item.img" />
                </el-col>
            </el-row>
        </el-row>
        <el-row class="partner">
            <div>{{$t('partner.title')}}</div>
            <el-row>
                <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" v-for="(item, index) in partnerArr" :key='index'>
                    <img :src="item.img" />
                </el-col>
            </el-row>
        </el-row>
        <div className="contact">
            <div className="title">{{$t('contact.title')}}</div>
            <div className="contact-icons clearfix">
                <img src="@/assets/twittergray.png" />
                <img src="@/assets/twitterbgray.png" />
                <img src="@/assets/facebookgray.png" />
            </div>
            <div className="up-to-top">
                <img src="@/assets/arrow.png" />
            </div>
        </div>
        <el-row class="footer">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div className="item-pic"><img src="@/assets/logo2.png" /></div>
                <div>
                    <h3>{{$t('footer.addr.title')}}</h3>
                    <div>{{$t('footer.addr.street')}}</div>
                    <div>{{$t('footer.addr.city')}}</div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div>
                    <h3>{{$t('footer.contact.title')}}</h3>
                    <div>{{$t('footer.contact.email')}}</div>
                    <div>{{$t('footer.contact.join')}}</div>
                </div>
                <div className="contact-icons clearfix">
                    <img src="@/assets/twitterwhite.png" />
                    <img src="@/assets/twitterbwhite.png" />
                    <img src="@/assets/facebook.png" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import videoPlayer from 'vue-video-player'
export default {
  components: {
    // videoPlayer
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
      investorArr: [
        {img: require('@/assets/invester_01.jpg')},
        {img: require('@/assets/invester_02.jpg')},
        {img: require('@/assets/invester_03.jpg')},
        {img: require('@/assets/invester_04.jpg')},
        {img: require('@/assets/invester_05.jpg')},
        {img: require('@/assets/invester_06.jpg')},
        {img: require('@/assets/invester_07.jpg')},
        {img: require('@/assets/invester_08.jpg')},
        {img: require('@/assets/invester_09.jpg')},
        {img: require('@/assets/invester_10.jpg')}
      ],
      partnerArr: [
        {img: require('@/assets/ptn1.jpg')},
        {img: require('@/assets/ptn2.jpg')},
        {img: require('@/assets/ptn3.jpg')},
        {img: require('@/assets/ptn4.jpg')},
        {img: require('@/assets/ptn5.jpg')},
        {img: require('@/assets/ptn6.jpg')},
        {img: require('@/assets/ptn7.jpg')},
        {img: require('@/assets/ptn8.jpg')},
        {img: require('@/assets/ptn9.jpg')},
        {img: require('@/assets/ptn10.jpg')},
        {img: require('@/assets/ptn11.jpg')},
        {img: require('@/assets/ptn12.jpg')},
        {img: require('@/assets/ptn13.jpg')},
        {img: require('@/assets/ptn14.jpg')},
        {img: require('@/assets/ptn15.jpg')},
        {img: require('@/assets/ptn16.jpg')},
        {img: require('@/assets/ptn17.jpg')},
        {img: require('@/assets/ptn18.jpg')}
      ]
    //   playerOptions: {
    //     muted: true,
    //     language: 'en',
    //     playbackRates: [0.7, 1.0, 1.5, 2.0],
    //     sources: [{
    //       type: 'video/mp4',
    //       src: 'http://www.goglobechain.io/res/goglobe.mp4'
    //     }]
    //   }
    }
  },
  computed: {
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
