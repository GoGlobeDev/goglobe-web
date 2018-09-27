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
        <el-row id="intro">
            <el-col :span="10">
                <div class="grid-content">
                    <div class="top-line" />
                    <div class="left-text">世界</div>
                    <div class="left-text">旅游</div>
                    <div class="left-text">新生态</div>
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
        <el-row class="intro module" :style="intro">
            <div class="title">{{$t('intro.title')}}</div>
            <el-row class="intro-list">
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-for="(item, index) in $t('intro.describe')" :key='index' class="intro-item">
                    <div class="intro-pic"><img src="@/assets/globe-1.png" /></div>
                    <div class="intro-text">{{item}}</div>
                </el-col>
            </el-row>
            <div v-for="(item, index) in $t('intro.notice')" :key="index" :class="{ft: item, bold: index === 0}">{{item}}</div>
        </el-row>
        <el-row class="feature module">
            <div class="title">{{$t('feature.title')}}</div>
            <el-row>
                <el-col :span="24" v-for="(item, index) in $t('feature.contents')" :key='index' class="feature-item">
                    <div class="feature-pic"><img src="@/assets/icon-1.png" /></div>
                    <div class="feature-content">
                        <div class="content-title">{{item.title}}</div>
                        <div class="content-intro">{{item.intro}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="download module" id="download">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('download')" :key='index'>
                <div class="item-pic"><img src="@/assets/document1.png" /></div>
                <div :class="{text: item, paper: index === 1}">{{item.title}}</div>
            </el-col>
        </el-row>
        <div class="chaindData" id="chainData">
            <el-input :placeholder="$t('chainData.search.placeholder')" v-model="address" class="input-with-select">
                <el-button slot="prepend" icon="el-icon-search"></el-button>
                <el-button slot="append" @click="searchAddr">{{$t('chainData.search.button')}}</el-button>
            </el-input>
            <el-row class="data-box">
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-for="(item, index) in $t('chainData.data')" :key='index'>
                    <div>
                        <img :src="chainData[index] && chainData[index].img" />
                        <div>{{item}}</div>
                        <div>{{chainData[index] && chainData[index].data}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div :style="team">
            <el-row class="team module" id="team">
                <div class="title">{{$t('team.title')}}</div>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('team.members')" :key='index'>
                        <div class="item-pic fl"><img src="@/assets/a0.png" /></div>
                        <div class="item-intro fl">
                            <div class="name">{{item.name}}</div>
                            <div class="desc">{{item.desc}}</div>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
            <el-row class="adviser module">
                <div class="title">{{$t('adviser.title')}}</div>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in $t('adviser.members')" :key='index'>
                        <div class="item-pic fl"><img src="@/assets/a0.png" /></div>
                        <div class="item-intro fl">
                            <div class="name">{{item.name}}</div>
                            <div class="desc">{{item.desc}}</div>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <el-row class="investor module">
            <div class="title">{{$t('investor.title')}}</div>
            <el-row>
                <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item, index) in investorArr" :key='index'>
                    <img :src="item.img" />
                </el-col>
            </el-row>
        </el-row>
        <el-row class="partner module">
            <div class="title">{{$t('partner.title')}}</div>
            <el-row>
                <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" v-for="(item, index) in partnerArr" :key='index'>
                    <img :src="item.img" />
                </el-col>
            </el-row>
        </el-row>
        <div class="contact" id="contact" :style="contact">
            <div class="title">{{$t('contact.title')}}</div>
            <div class="contact-icons clearfix">
                <img src="@/assets/twittergray.png" />
                <img src="@/assets/twitterbgray.png" />
                <img src="@/assets/facebookgray.png" class="last" />
            </div>
            <div class="up-to-top">
                <img src="@/assets/arrow.png" />
            </div>
        </div>
        <el-row class="footer module" :gutter="30">
            <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                <div class="item-pic fl"><img src="@/assets/logo2.png" /></div>
                <div class="fl">
                    <h3>{{$t('footer.addr.title')}}</h3>
                    <div>{{$t('footer.addr.street')}}</div>
                    <div>{{$t('footer.addr.city')}}</div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                <img src="@/assets/wallet.png" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <div>
                    <h3>{{$t('footer.contact.title')}}</h3>
                    <div>{{$t('footer.contact.email')}}</div>
                    <div>{{$t('footer.contact.join')}}</div>
                </div>
                <div class="contact-icons clearfix">
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
import { loadStatus } from '@/api/wallet'
import web3 from 'web3'
export default {
  components: {
    // videoPlayer
  },
  created () {
    this._loadStatus()
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
      intro: {
        backgroundImage: 'url(' + require('../../../assets/feature.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center bottom'
      },
      team: {
        background: 'url(' + require('../../../assets/team.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center bottom'
      },
      contact: {
        backgroundImage: 'url(' + require('../../../assets/grid.png') + ')',
        backgroundSize: 'auto 100%'
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
      ],
      chainData: [],
      address: ''
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
    },
    _loadStatus () {
      loadStatus().then(res => {
        const _data = [
          {
            img: require('@/assets/miner.png'),
            data: res.data.todayTotalDevice
          },
          {
            img: require('@/assets/calculate.png'),
            data: res.data.todayTotalMining
          },
          {
            img: require('@/assets/output.png'),
            data: res.data.todayTotalPower
          }
        ]
        this.chainData = _data
      })
    },
    searchAddr () {
      let _ethAddress = this.address
      if (_ethAddress && web3.utils.isAddress(_ethAddress)) {
        if (_ethAddress.slice(0, 2) !== '0x') {
          _ethAddress = '0x' + _ethAddress
        }
        console.log(window.location.hash)
        const url = '/mining/wallet/' + _ethAddress + '/' + window.location.hash
        window.location.href = url
      } else {
        this.$message({
          message: '请输入钱包地址',
          type: 'warning'
        })
      }
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
// .video-player-box
//     height: 300px
//     width: 100%
.title
    padding-top: 40px
    text-align: center
    font-size: 40px
    letter-spacing: 8px
    color: #ffb400
    margin-bottom: 30px
.module
    padding: 0 50px
    border-bottom: 1px solid #dee6ed
.intro
    .title
        margin-bottom: 40px
    .intro-list
        margin-bottom: 50px
    .intro-item
        position: relative
        .intro-pic
            width: 40%
            transition: transform 0.3s ease-in
            &:hover
                transition: transform 0.3s ease-out
                transform: scale(1.2, 1.2)
        .intro-text
            width: 55%
            position: absolute
            top: 30%
            left: 40%
    .ft
        margin-bottom: 25px
        text-align: center
    .ft.bold
        font-weight: bold
    // .ft:first-child
    //     font-weight: bold
.feature
    background-color: #fff
    .feature-item
        position: relative
        margin-bottom: 50px
        .feature-pic
            width: 120px
            height: 120px
            margin: 0 auto
            box-shadow: 0 0 60px rgba(86,66,142,0.14)
            border-radius: 50%
        .feature-content
            position: absolute
            .content-title
                font-size: 26px
                color: #ffb400
                margin-bottom: 10px
            .content-intro
                font-style: italic
                font-size: 16px
                line-height: 1.4
    .feature-item:nth-child(2n+1)
        .feature-content
            left: 60%
            right: 0
            top: 3%
    .feature-item:nth-child(2n)
        .feature-content
            right: 60%
            left: 0
            top: 3%
.download
    background-color: rgba(255,180,0,0.1)
    >div
        text-align: center
        padding: 50px 0
        .text
           height: 40px
           line-height: 40px
           color: #ffb400
           background-color: #fff
           width: 260px
           margin: 10px auto
           border-radius: 4px
        .text.paper
            color: #fff
            background-color: #ffb400
.team, .adviser
    .el-col
        padding: 20px 10px
        .item-pic
            width: 27%
            max-width: 150px
            margin-right: 20px
        .item-intro
            width: 63%
            min-width: calc(100% - 170px)
            .name
                font-weight: bold
                font-size: 18px
                margin: 10px 0
                text-align: left
            .desc
                line-height: 23px
                color: rgba(38,42,46,0.6)
                text-align: justify
.partner
    .el-col
        height: 126px
        img
            max-width: 180px
.contact
    .contact-icons
        width: 260px
        margin: 60px auto
        img
            margin-right: 60px
        img.last
            margin-right: 0
.footer
    background-color: #444
    color: rgba(255,255,255,0.3)
    padding: 20px 50px
.chaindData
    padding: 50px
    .data-box
        text-align: center
        .el-col
            padding: 30px
</style>
