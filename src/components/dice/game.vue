<template>
    <div>
        <div class="game-container">
            <!-- 第一行 -->
            <el-row style="padding: 20px;" :gutter="20">
                <el-col :span="14">
                    <div class="tip-text">{{$t('BET AMOUNT')}}</div>
                    <div class="bet-amount-container">
                        <el-row class="bet-amount">
                            <el-col :span="12" class="amount">
                                <img class="navbar-coin" src="../../assets/eos-logo.png">
                                <span class="display-text" style="margin-left: 30px;">
                                  <el-input v-model.number="betAmount" class="bet-amount-input" @change="changeBetAmount"></el-input>
                                </span>
                            </el-col>
                            <el-col :span="4" class="amount-button tip-text">
                                <span @click="amountTimes(0.5)">1/2</span>
                            </el-col>
                            <el-col :span="4" class="amount-button tip-text">
                                <span @click="amountTimes(2)">2X</span>
                            </el-col>
                            <el-col :span="4" class="amount-button tip-text">
                                <span @click="amountMax()">MAX</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="tip-text">{{$t('PAYOUT ON WIN')}}</div>
                    <div class="payout-on-win-container">
                        <img class="navbar-coin" src="../../assets/eos-logo.png">
                        <span class="display-text">{{payOnWin}}</span>
                    </div>
                </el-col>
            </el-row>

            <!-- 第二行 -->
            <el-row class="choose-info" :gutter="20">
                <el-col :span="6" :offset="6" >
                  <el-badge is-dot style="width: 100%" :hidden="choose != 'small'">
                    <div :class="['choose-info-section', choose === 'small' ? 'choose-text' : 'big-display-text']" @click="choose = 'small'">{{$t('Small')}}</div>
                  </el-badge>
                </el-col>
                <el-col :span="6">
                  <el-badge is-dot style="width: 100%" :hidden="choose != 'big'">
                    <div :class="['choose-info-section', choose === 'big' ? 'choose-text' : 'big-display-text']" @click="choose = 'big'">{{$t('Big')}}</div>
                  </el-badge>
                </el-col>
            </el-row>

            <!-- 第三行 -->
            <el-row class="roll-info">
                <el-col :span="8" class="roll-info-section">
                    <div class="tip-text" v-if="choose === 'small'">{{$t('ROLL UNDER TO WIN')}}</div>
                    <div class="tip-text" v-else>{{$t('ROLL OVER TO WIN')}}</div>
                    <div class="big-display-text">{{range}}{{choose === 'small' ? '↓' : '↑'}}</div>
                </el-col>
                <el-col :span="8" class="roll-info-section">
                    <div class="tip-text">{{$t('PAYOUT')}}</div>
                    <div class="big-display-text">{{payout}} x</div>
                </el-col>
                <el-col :span="8" class="roll-info-section">
                    <div class="tip-text">{{$t('WIN CHANCE')}}</div>
                    <div class="big-display-text">{{choose === 'small' ? range : 99 - range}} %</div>
                </el-col>
            </el-row>

            <!-- 第四行 -->
            <el-row class="account-info">
                <el-col :span="8" class="account-info-section">
                    <div class="account-container">
                        <img class="navbar-coin" src="../../assets/eos-logo.png">
                        <span class="display-text">{{balance.eos}}</span>
                    </div>
                </el-col>
                <el-col :span="8" class="account-info-section">
                  <el-button type="primary" class="login-button" @click="initIdentity()" v-if="!account">{{$t('LOGIN')}}</el-button>
                  <el-button type="primary" class="login-button" @click="roll()" v-else v-loading="loading">{{$t('ROLL DICE')}}</el-button>
                </el-col>
                <el-col :span="8" class="account-info-section">
                    <div class="account-container">
                        <img class="navbar-coin" src="../../assets/HPY_Token.png">
                        <span class="display-text">{{balance.hpy}}</span>
                        <i class="el-icon-question" @click="isShowBetDialog = !isShowBetDialog" style="cursor: pointer;"></i>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="slider-wrapper">
            <span>0</span>
            <el-slider v-model="range" class="range" :min="0" :max="99"></el-slider>
            <span>99</span>
        </div>

        <!-- 买卖token及K线 -->
        <!-- <token-display :code="'happyeosslot'" :game="'dice'" :symbol="'hpy'"></token-display> -->
        <!-- <token-display :code="'dicemaster11'" :game="'dice'" :symbol="'dmt'"></token-display> -->

        <!-- log -->
        <!-- <dice-log></dice-log> -->

        <!-- 弹出 -->
        <el-dialog
          :title="$t('HPY Token Giveaway!')"
          :visible.sync="isShowBetDialog"
          width="30%"
          center>
          <img src="../../assets/HPY_Token.png" style="width: 40%; display: block; margin: auto;">
          <p>{{$t('bet-1')}}</p>
          <p>{{$t('bet-2')}} <a href="https://happyeosslot.com/" target="_blank">https://happyeosslot.com/</a></p>
          <p>{{$t('bet-3')}}</p>
        </el-dialog>
    </div>
</template>

<script>
import { transferTokenViaEosjs } from '@/blockchain'
import { mapState, mapActions, mapGetters } from 'vuex'
// import tokenDisplay from '@/components/token/token.vue';
import log from './log.vue'

export default {
  components: {
    // 'token-display': tokenDisplay,
    'dice-log': log
  },
  data () {
    return {
      range: 50,
      betAmount: 1,
      isShowBetDialog: false,
      loading: false,
      choose: 'small'
    }
  },
  computed: {
    ...mapState(['eos', 'rpc', 'balance', 'seed', 'referral']),
    ...mapGetters(['account']),
    eosBalance () {
      return Number(this.balance.eos.slice(0, -4))
    },
    payOnWin () {
      if (this.choose === 'small') {
        return Math.floor((98 / this.range) * this.betAmount * 10000) / 10000
      } else {
        return (
          Math.floor((98 / (99 - this.range)) * this.betAmount * 10000) / 10000
        )
      }
    },
    payout () {
      if (this.choose === 'small') {
        return Math.floor((98 / this.range) * 10000) / 10000
      } else {
        return Math.floor((98 / (99 - this.range)) * 10000) / 10000
      }
    }
  },
  watch: {
    range (newRange, oldRange) {
      if (newRange < 6) {
        this.range = 6
      } else if (newRange > 93) {
        this.range = 93
      }
    }
  },
  methods: {
    ...mapActions(['updateBalance']),
    amountTimes (data) {
      this.betAmount = this.betAmount * data
      if (this.betAmount > this.eosBalance) {
        this.betAmount = this.eosBalance
      }
    },
    amountMax () {
      this.betAmount = this.eosBalance
    },
    changeBetAmount (data) {
      this.betAmount = Math.floor(this.betAmount * 10000) / 10000
    },
    async queryReveal () {
      const { rows } = await this.rpc.get_table_rows({
        json: true,
        code: 'happyeosdice',
        scope: this.account.name,
        table: 'result',
        table_key: '0'
      })
      const ans = rows[0].roll_number
      // roll点值为0-99
      if (ans < 100) {
        this.loading = false
        if (
          (this.choose === 'small' && ans < this.range) ||
          (this.choose === 'big' && ans > this.range)
        ) {
          this.roll_success(ans)
        } else {
          this.roll_fail(ans)
        }
        this.updateBalance()
      } else {
        const nextTime = new Date().getTime() + 3000
        console.log(
          `Next Query for answer ${new Date(nextTime).toLocaleString()}`
        )
        setTimeout(() => {
          this.queryReveal()
        }, 3000)
      }
    },
    async roll () {
      this.loading = true
      let memo = `bet ${
        this.choose === 'small' ? this.range + 100 : this.range
      } ${this.seed}`
      const referral = this.referral
      if (referral) {
        memo += ` ${referral}`
      }
      try {
        const res = await transferTokenViaEosjs({
          from: this.account.name,
          to: 'happyeosdice',
          memo,
          quantity: `${this.betAmount.toFixed(4)} EOS`
        })
        console.log(res)
        // 轮询查找结果
        this.queryReveal()
      } catch (error) {
        console.error(error)
        this.loading = false
        alert('项目出错了，快联系开发者！')
      }
    },
    roll_success (ans) {
      const { $t, $notify } = this
      $notify({
        title: $t('Congratulations!'),
        message: $t('success_message', [
          ans,
          this.payout * this.betAmount
        ]),
        type: 'success'
      })
    },
    roll_fail (ans) {
      this.$notify.error({
        title: this.$t('You fail'),
        message: this.$t('fail_message', [ans, this.payout * this.betAmount])
      })
    }
  }
}
</script>

<style>
.game-container {
  width: 655px;
  height: 386px;
  margin: 60px auto 20px auto;
  font-size: 18px;
  border-radius: 5px;
  background-color: #4b4848;
  align-items: center;
}
.slider-wrapper {
  padding: 10px;
  background-color: #4b484888;
  border-radius: 30px;
  align-items: center;
  width: 655px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: space-between;
}
.slider-wrapper .range {
  width: 90%;
}
.bet-amount-container {
  background-color: #3f3e3e;
  height: 43px;
  border-radius: 0.3em;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bet-amount {
  width: 100%;
  height: 100%;
  display: flex;
}
.bet-amount .amount {
  background-color: #4b4848;
  display: flex;
  align-items: center;
  border-radius: 0.3em;
}
.bet-amount .amount-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}
.navbar-coin {
  height: 22px;
  margin-left: 10px;
  vertical-align: middle;
}
.payout-on-win-container {
  background-color: #3f3e3e;
  height: 43px;
  border-radius: 0.3em;
  padding: 4px;
  display: flex;
  align-items: center;
}
.payout-on-win-container span {
  display: block;
  width: 100%;
  text-align: center;
}
.roll-info {
  background-color: #3f3e3e;
  border-radius: 0.3em;
  height: 87px;
  margin: 0 20px;
}
.roll-info-section {
  text-align: center;
  padding: 10px;
}
.choose-info {
  margin-bottom: 20px;
}
.choose-info-section {
  background-color: #3f3e3e;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3em;
  padding: 4px;
}
.account-info {
  height: 87px;
  margin: 0 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.account-container {
  display: flex;
  align-items: center;
}
.account-container span {
  display: block;
  width: 100%;
  text-align: center;
}
.bet-amount-input input {
  background-color: #4b4848;
  border: 0;
  color: white;
  font-size: 1.2em;
}
</style>
