<template>
    <div class="app" id="app">
        <!--<div  class="header-content">
            <ul>
                <li onclick="implementFun()"><a>游戏规则</a></li>
                <li><a href="https://github.com/Andoromeda-Foundation/Project-Eolt">项目代码</a></li>
                <li><a href="https://t.me/CryptoHero_Official">社区</a></li>
                <li><a href="https://discordthis.com/invite/nMXUYGQ">讨论</a> </li>
            </ul>
        </div>-->
        <div class="main" >
            <div class="adorn-top"></div>
            <div class="adorn-bottom"></div>
            <div class="box1-left">
                <div class="img-box img-box1" v-bind:class="{selected: index === 1}"></div>
                <div class="img-box img-box2" v-bind:class="{selected: index === 2}"></div>
                <div class="img-box img-box3" v-bind:class="{selected: index === 3}"></div>
                <div class="img-box img-box4" v-bind:class="{selected: index === 4}"></div>
                <div class="img-box img-box5" v-bind:class="{selected: index === 5}"></div>
                <div class="img-box img-box6" v-bind:class="{selected: index === 6}"></div>
            </div>
            <div class="box2-center">
                <div class="box2-contain">
                    <div class="center-box-top">

                        <div class="img-box img-box28" v-bind:class="{selected: index === 28}"></div>
                        <div class="img-box img-box27" v-bind:class="{selected: index === 27}"></div>
                        <div class="img-box img-box26" v-bind:class="{selected: index === 26}"></div>
                        <div class="img-box img-box25" v-bind:class="{selected: index === 25}"></div>
                        <div class="img-box img-box24" v-bind:class="{selected: index === 24}"></div>
                        <div class="img-box img-box23" v-bind:class="{selected: index === 23}"></div>
                        <div class="img-box img-box22" v-bind:class="{selected: index === 22}"></div>
                        <div class="img-box img-box21" v-bind:class="{selected: index === 21}"></div>

                    </div>
                    <div class="center-box-center">
                        <div class="center-box-center-left">

                            <!--                    <div class="bet">bet</div>
                                                <div class="bet-num">70</div>
                                                 <div class="big">
                                                  &lt;!&ndash;   <span STYLE="text-align: center">Bet</span>&ndash;&gt;
                                                     <input v-model="bet_input" type="number" id="bet_input" placeholder="Bet credits">
                                                 </div>
                    -->
                            <div class="bet" @click="change_bet()">Bet</div>
                            <div class="bet-num" @click="change_bet()">{{ bet_input||0 }}
                                <span class="tooltiptext">点击修改Bet数额</span>
                            </div>
                            <div class="bet">EOP</div>
                            <div class="bet-num">{{ (eop!==""?eop.toFixed(4):eop)||0 }}
                            </div>

                            <!-- <div class="cirlce-left"></div> -->
                        </div>
                        <div class="center-box-center-center">
                        </div>
                        <div class="center-box-center-right">
                            <!-- <div class="credits">Current EOP</div>
                            <div class="credits-num">{{ eop.toFixed(4) || 0 }}</div> -->
                            <div class="credits"> EOS Balance</div>
                            <div class="credits-num">{{ balance.eos.slice(0, -4) }} </div>
                            <!--   <div class="small"> </div>-->
                            <div class="credits"> HPY Balance</div>
                            <div class="credits-num">{{ balance.hpy.slice(0, -4) }}</div>
                        </div>
                    </div>
                    <div class="center-box-bottom">
                        <div class="img-box img-box7" v-bind:class="{selected: index === 7}"></div>
                        <div class="img-box img-box8" v-bind:class="{selected: index === 8}"></div>
                        <div class="img-box img-box9" v-bind:class="{selected: index === 9}"></div>
                        <div class="img-box img-box10" v-bind:class="{selected: index === 10}"></div>
                        <div class="img-box img-box11" v-bind:class="{selected: index === 11}"></div>
                        <div class="img-box img-box12" v-bind:class="{selected: index === 12}"></div>
                        <div class="img-box img-box13" v-bind:class="{selected: index === 13}"></div>
                        <div class="img-box img-box14" v-bind:class="{selected: index === 14}"></div>
                    </div>
                </div>
            </div>
            <div class="box3-right">
                <div class="img-box img-box20" v-bind:class="{selected: index === 20}"></div>
                <div class="img-box img-box19" v-bind:class="{selected: index === 19}"></div>
                <div class="img-box img-box18" v-bind:class="{selected: index === 18}"></div>
                <div class="img-box img-box17" v-bind:class="{selected: index === 17}"></div>
                <div class="img-box img-box16" v-bind:class="{selected: index === 16}"></div>
                <div class="img-box img-box15" v-bind:class="{selected: index === 15}"></div>
            </div>
        </div>
        <div class="main-bg">
            <div class="horizontal-box"></div>
            <div class="vertical-box"></div>
        </div>
        <div class="bottom-bg">
            <div class="cube-top-box">
                <div class="top-front"></div>
                <div class="top-bottom"></div>
                <div class="top-back"></div>
                <div class="top-top"></div>
                <div class="top-left"></div>
                <div class="top-right"></div>
            </div>
            <div class="cube-box">
                <div class="front"></div>
                <div class="bottom"></div>
                <div class="back"></div>
                <div class="top"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div v-if="!account">
                <el-button type="primary" class="login-button" @click="setIdentity()" >{{$t('LOGIN')}}</el-button>
            </div>
            <div v-else>
            <button id="spinId" class="spin" v-on:click="start_roll">摇起来！</button>
            <button class="input-money" v-show="true" v-on:click="make_deposit">购买股份</button>
            <button class="get-money" v-show="true"  v-on:click="make_withdraw">出售股份</button>
             </div>

            <!--   <button class="leave"> Leave</button>-->
            <div class="music-play" id="musicId">
                <img id="imgId" src="../../assets/images/pause.jpg">
            </div>
            <div class="actions-table">
                <table class="table">
                    <thead>
                    <tr>
                        <th><abbr title="Position">#</abbr></th>
                        <th>From</th>
                        <th>To</th>
                        <th>Qty</th>
                        <th>Memo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(action, idx) in actions">
                        <th>{{idx}}</th>
                        <td>{{action.from}}</td>
                        <td>{{action.to}}</td>
                        <td>{{action.quantity}}</td>
                        <td>{{action.memo}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <audio id="audioId" loop="loop" preload="auto" autoplay="autoplay">
            <source src="../../assets/music/tiger.mp3" type="audio/mp3">
        </audio>
        <audio id="se_bigreward" preload="auto">
            <source src="../../assets/music/se/bigreward.mp3" type="audio/mp3">
        </audio>
        <audio id="se_buy" preload="auto">
            <source src="../../assets/music/se/buy.mp3" type="audio/mp3">
        </audio>
        <audio id="se_click" preload="auto">
            <source src="../../assets/music/se/click.mp3" type="audio/mp3">
        </audio>
        <audio id="se_rolling" preload="auto">
            <source src="../../assets/music/se/rolling.mp3" type="audio/mp3">
        </audio>
        <audio id="se_smallreward" preload="auto">
            <source src="../../assets/music/se/smallreward.mp3" type="audio/mp3">
        </audio>
        <audio id="se_startrolling" preload="auto">
            <source src="../../assets/music/se/startrolling.mp3" type="audio/mp3">
        </audio>
        <audio id="se_withdraw" preload="auto">
            <source src="../../assets/music/se/withdraw.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import { transferTokenViaEosjs, singleContractCall } from "@/blockchain";
import { createHexRandom } from "./helper";
import { network } from "@/config";
// import ElButton from '../../../node_modules/element-ui/packages/button/src/button'

export default {
  // components: { ElButton },
  data() {
    return {
      requiredFields: null,
      eos: null,
      actions: [],
      last_bet: null,
      bet_input: "1.0000",
      index: 0, // 当前转动到哪个位置，起点位置
      count: 28, // 总共有多少个位置
      speed: 20, // 初始转动速度
      cycle: 20, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      timer: 0, // setTimeout的ID，用clearTimeout清除
      result_timer: 0, // get_roll_result timeout.
      times: 0,
      prize: -1, // 中奖位置
      running: false, // 正在抽奖
      eop: 1 // 经营状况系数
    };
  },
  created() {
    this.get_current_balance();
  },
  methods: {
    change_bet() {
      this.play_se("se_click");
      var new_bet = parseFloat(prompt("赌多少EOS？"));
      //            var new_bet = prompt("赌多少EOS？");
      // Check new bet
      if (new_bet > 0) {
        this.bet_input = new Number(new_bet).toFixed(4);
      }
    },
    get_current_balance() {
      this.get_current_eop();
    },
    async get_current_eop() {
      var happyeosslot_balance = await this.rpc.get_currency_balance(
        "eosio.token",
        "happyeosslot"
      );
      var happyeosslot_true_balance = await this.rpc.get_table_rows({
        json: "true",
        code: "happyeosslot",
        scope: "happyeosslot",
        limit: 10,
        table: "market"
      });
      happyeosslot_balance = happyeosslot_balance[0].split(" ", 1)[0];
      // this.eop = happyeosslot_true_balance;
      happyeosslot_true_balance = happyeosslot_true_balance.rows[0].deposit.balance.split(
        " ",
        1
      )[0];
      this.eop = happyeosslot_balance / (happyeosslot_true_balance - 1250);
      // this.eop = new Number(this.eop).toFixed(4);

      return this.eop;
    },
    make_deposit(event) {
      this.play_se("se_click");
      var new_deposit = prompt("购买多少EOS的股份？");
      // Check new deposit
      if (new_deposit > 0) {
        if (this.isPc()) {
          this.deposit(new_deposit);
        } else {
        }
      }
    },
    make_withdraw(event) {
      this.play_se("se_click");
      var new_withdraw = prompt("出售多少HPY（股份）？");
      // Check new withdraw
      if (new_withdraw > 0) {
        this.withdraw(new_withdraw);
      }
    },
    get_roll_result() {
      this.rpc
        .get_table_rows({
          json: "true",
          code: "happyeosslot",
          scope: this.account.name,
          limit: 10,
          table: "result"
        })
        .then(data => {
          console.log(data);
          var result = data.rows[0].roll_number;
          var rate_100 = 25;
          var rate_50 = [11, 24];
          var rate_20 = [6, 16, 21];
          var rate_10 = [1, 10, 26];
          var rate_5 = [3, 13, 18, 22];
          var rate_2 = [2, 8, 17, 28];
          var rate_0_1 = [5, 9, 12, 14, 19];
          var rate_0_0_1 = [4, 7, 15, 20, 23, 27];

          if (this.running) {
            var random = Math.random();
            // console.log(random);
            if (result >= 10000) {
              this.stop_at(rate_100);
            } else if (result >= 5000) {
              this.stop_at(rate_50[Math.floor(random) * 2]);
            } else if (result >= 2000) {
              this.stop_at(rate_20[Math.floor(random * 3)]);
            } else if (result >= 1000) {
              this.stop_at(rate_10[Math.floor(random * 3)]);
            } else if (result >= 500) {
              this.stop_at(rate_5[Math.floor(random * 4)]);
            } else if (result >= 200) {
              this.stop_at(rate_2[Math.floor(random * 4)]);
            } else if (result >= 10) {
              this.stop_at(rate_0_1[Math.floor(random * 5)]);
            } else if (result >= 1) {
              this.stop_at(rate_0_0_1[Math.floor(random * 6)]);
            } else {
              this.result_timer = setTimeout(this.get_roll_result, 100); // 循环调用
            }
          }
        })
        .catch(err => {
          alert(err.toString());
        });
    },
    deposit(amount) {
      this.play_se("se_click");
      amount = new Number(amount).toFixed(4);
      // console.log(amount);
      transferTokenViaEosjs({
        from: this.account.name,
        to: "happyeosslot",
        memo: "buy",
        quantity: amount + " EOS"
      })
        .then(() => {
          this.play_se("se_buy");
          this.get_current_balance();
          alert("充值成功");
        })
        .catch(err => {
          alert(err.toString());
        });
    },
    async withdraw(amount) {
      // @todo: EOSJS2 actions maybe?
      this.play_se("se_click");
      amount = new Number(amount).toFixed(4);
      var requiredFields = (this.requiredFields = {
        accounts: network
      });
      try {
        this.play_se("se_withdraw");
        await singleContractCall({
          contractAccount: "happyeosslot",
          actionName: "sell",
          actionData: { account: this.account.name, hpy: amount + " HPY" },
          authorization: [
            {
              actor: this.account.name,
              permission: this.account.authority
            }
          ]
        });
        this.get_current_balance();
        this.$notify({
          title: "卖出成功",
          message: "EOS 已到账",
          type: "success"
        });
      } catch (error) {
        console.error(error);
        this.$notify({
          title: "卖出失败",
          message: `错误原因： ${JSON.stringify(error)}`,
          type: "error"
        });
      }
    },
    roll() {
      var index = this.index;
      var count = this.count;
      index += 1;
      if (index > count) {
        index -= count;
      }
      this.index = index;
      return false;
    },
    start_roll() {
      this.play_se("se_click");
      if (this.running) return;
      var amount = Number(this.bet_input).toFixed(4);
      if (this.bet_input === "") {
        amount = "1.0000";
      }
      transferTokenViaEosjs({
        from: this.account.name,
        to: "happyeosslot",
        memo: `bet ${createHexRandom()}`,
        quantity: amount + " EOS"
      })
        .then(() => {
          this.play_se("se_startrolling");
          this.running = true;
          this.last_bet = amount;
          this.roll_loop();
          this.get_roll_result();
        })
        .catch(err => {
          alert(err.toString());
        });
    },
    roll_loop() {
      this.play_se("se_rolling");
      this.times += 1;
      this.roll();
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer);
        this.prize = -1;
        this.times = 0;
        this.running = false;
      } else {
        if (this.times < this.cycle) {
          if (this.speed > 200) {
            this.speed -= 100;
          } else {
            this.speed -= 10;
          }
        } else {
          if (this.prize !== -1) {
            if (
              this.times > this.cycle + 10 &&
              ((this.prize === 1 && this.index === this.count) ||
                this.prize === this.index + 1)
            ) {
              this.speed += 110;
            } else {
              this.speed += 20;
            }
          }
        }
        if (this.speed < 40) {
          this.speed = 40;
        }
        if (this.speed > 500) {
          this.speed = 500;
        }
        this.timer = setTimeout(this.roll_loop, this.speed); // 循环调用
      }
    },
    async fetch_action() {
      // Sorry SuperONE, EOSAsia have the BETTER get_actions API than yours,
      const { data } = await axios({
        method: "post",
        url: "https://geo.eosasia.one/v1/history/get_actions",
        headers: { "content-type": "thislication/x-www-form-urlencoded" },
        data: { account_name: "happyeosslot", pos: -1, offset: -300 }
      });
      this.actions = data.actions
        .map(({ action_trace }) => action_trace.act.data)
        .filter(action => action.quantity); // No Reveal Blank Data will be shown
      // alert(res)
    },
    stop_at(stopPosition) {
      if (this.prize === -1) {
        clearTimeout(this.result_timer);
        this.prize = stopPosition;
        this.get_current_balance();
      }
    },
    isPc() {
      // 移动端PC端判断
      return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    },
    play_se(id) {
      var SEAudio = document.getElementById(id);
      SEAudio.currentTime = 0;
      SEAudio.play();
    }
  },
  computed: {
    ...mapState(["rpc", "eos", "balance"]),
    ...mapGetters(["account"])
  }
};
</script>
<style scoped>
@import "../../assets/css/cube.css";
@import "../../assets/css/cube-top.css";
@import "../../assets/css/main.css";
</style>
<style lang="less">
@import "../../assets/css/main.less";
</style>
