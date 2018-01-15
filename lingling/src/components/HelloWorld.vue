<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links!</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <el-input v-model="username" placeholder="请输入账号"></el-input>
    <el-input v-model="password" placeholder="请输入密码"></el-input>
    <el-button type="success" @click="register">注册</el-button>
    <el-button type="success" @click="toHome">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: '',
      password: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
      this.$http({
        url: "/api/",
        method: "get",
        params: {
          ID: 123456
        }
      }).then(function (data) {
        console.log(data.welcome);
      })
  },
  methods: {
    register() {
      let _this = this;
      //注册
      this.$http({
        url: "/api/",
        method: "POST",
        params: {
          username: this.username,
          password: this.password
        }
      }).then(function (argument) {
        // console.log(argument);
      })
    },
    toHome() {
      let _this = this;
      //登录
      this.$router.push('/home');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
