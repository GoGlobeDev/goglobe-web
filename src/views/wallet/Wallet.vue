<template>
  <div>
    <header-con></header-con>
    <div class="account">
        <div class="addr">{{$t('wallet.addr')}} : {{this.$route.params.address}}</div>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content">
                    <img src="@/assets/balance.png" />
                    <p>{{$t('wallet.balance')}}</p>
                    <div className="gog"><span className="gog-number">{{account.balance || 0}}</span> GOG</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <img src="@/assets/miner1.png" />
                    <p>{{$t('wallet.device')}}</p>
                    <div className="number">{{account.deviceSum || 0}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <img src="@/assets/calculate1.png" />
                    <p>{{$t('wallet.power')}}</p>
                    <div className="number">{{account.power || 0}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <img src="@/assets/output1.png" />
                    <p>{{$t('wallet.dailyProduce')}}</p>
                    <div className="number">{{account.dailyProduce || 0}}</div>
                </div>
            </el-col>
        </el-row>
        <div class="recommend">{{$t('wallet.recommend')}} ：{{account.referral || ''}}</div>
        <div class="mining-record">
            <h3 class="table-title">{{$t('wallet.miningRecord')}}</h3>
            <el-table :data="record.list" stripe style="width: 100%" class="table11">
                <el-table-column prop="index" label="" style="width: 10%" align="center"></el-table-column>
                <el-table-column prop="amount" :label="$t('wallet.tableTitle.output')" style="width: 30%" align="center"></el-table-column>
                <el-table-column prop="type" :label="$t('wallet.tableTitle.type')" style="width: 30%" align="center"></el-table-column>
                <el-table-column prop="time" :label="$t('wallet.tableTitle.date')" style="width: 30%" align="center"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="20"
                layout="prev, pager, next, jumper"
                :total="record.number"
                class="page">
            </el-pagination>
        </div>
        
    </div>
  </div>
</template>
<script>
import { HeaderCon } from '../home/components'
import { loadAccountInfo, loadMiningRescord } from '@/api/wallet'
import moment from 'moment'
export default {
  name: 'wallet',
  components: {
    HeaderCon
  },
  data () {
    return {
      account: {},
      record: {},
      currentPage: 1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      const data = {
        ethAddress: this.$route.params.address
      }
      loadAccountInfo(data).then((res) => {
        this.account = res.data
      })
      const data1 = {
        ethAddress: this.$route.params.address,
        start: 0,
        rows: 20
      }
      loadMiningRescord(data1).then((result) => {
        const _res = result.data
        _res.list.map((item, index) => {
          item.index = index + 1
          item.time = moment(item.time).format('YYYY-MM-DD')
          item.type = item.opCode === 0 ? '余额奖励' : '挖矿奖励'
        })
        this.record = _res
      })
    },
    handleCurrentChange (val) {
      const data = {
        ethAddress: this.$route.params.address,
        start: 20 * (val - 1),
        rows: 20
      }
      loadMiningRescord(data).then((result) => {
        const _res = result.data
        _res.list.map((item, index) => {
          item.index = index + 1 + 20 * (val - 1)
          item.time = moment(item.time).format('YYYY-MM-DD')
          item.type = item.opCode === 0 ? '余额奖励' : '挖矿奖励'
        })
        this.record = _res
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
    .account
        margin: 90px auto 20px
        background-color: #ffffff
        border-radius: 10px
        box-shadow: 0px 1px 15px 0px rgba(201,201,201,0.5)
        width: 60%
        .addr
            height: 58px
            line-height: 58px
            font-size: 18px
            background: linear-gradient(136deg, #ffd668 0%, #ffbb18 100%)
            color: #4e4d4e
            border-radius: 10px 10px 0 0
            padding: 0 16px
        .el-row
            padding: 30px 50px
            .el-col
                color: #7d7d7d
                text-align: center
                .grid-content
                    background-color: #f6f6f6
                    padding: 10px 0
                    border-radius: 10px
        .recommend
            padding: 10px 50px
            color: #7d7d7d
            font-size: 16px
        .mining-record
            padding: 10px 50px
            .table-title
                font-size: 20px
                font-weight: 500
            .table11
                margin-bottom: 20px
                .el-table__header-wrapper .el-table__header th.is-leaf
                    background-color: #e4e4e4
        .el-pagination .el-pagination__jump
            float: right
</style>
