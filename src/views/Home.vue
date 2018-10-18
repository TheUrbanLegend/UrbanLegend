<template>
  <div class="home">
    <section class="hero">
      <h1 class="title"> EOSJS 2 Demo with ScatterJS-Core </h1>
    </section>
    <!-- demo for eosjs2 -->
    <button class="button" @click="transferMoney"> Transfer EOS to Frank </button>
    <button class="button" @click="callContract"> Simple Contract Call </button>
    <button class="button" @click="signOnMsg"> Request Signature on certain message </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { transferToken } from "@/blockchain";
// @ is an alias to /src

const eosTokenDetails = {
  contract: "eosio.token",
  symbol: "EOS",
  memo: "Donate to Frank Wei",
  decimals: 4
};

export default {
  name: "home",
  methods: {
    async transferMoney() {
      await transferToken({
        to: "yabukinanako",
        memo: "Peropero",
        amount: "0.0001"
      });
    },
    callContract() {},
    signOnMsg() {}
  },
  computed: {
    ...mapState(["eos", "scatter"])
  }
};
</script>
