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
// @ is an alias to /src

export default {
  name: "home",
  methods: {
    transferMoney() {},
    callContract() {},
    signOnMsg() {}
  }
};
</script>
