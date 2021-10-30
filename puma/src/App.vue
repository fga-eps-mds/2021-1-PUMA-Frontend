  <template>
  <div id='app'>
    <link
      href='https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700,900'
      rel='stylesheet'
    />
    <Navbar v-if='isloggedIn' />
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Navbar from '@/components/Navbar.vue';
import UserService from './services/userService';

const userService = new UserService();

export default {
  components: {
    Navbar,
  },
  methods: {
    updateSessionStatus() {
      this.isloggedIn = userService.isUserLoggedIn();
    },
  },
  data() {
    return {
      isloggedIn: false,
    };
  },
  created() {
    this.updateSessionStatus();
  },
  updated() {
    this.updateSessionStatus();
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #15355e;
}

input,
textarea,
select {
  border-radius: 7px;
  font-size: 1.1em;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 15px;
}

.submit-btn {
  align-items: center;
  background-color: #f7db36;
  color: #222;
  border: 2px solid #f7db36;
  padding: 10px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
  width: 10em;
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.flex1 {
  flex: 1;
}

.title {
  display: flex;
  color: black;
  font-family: rubik, Sans-serif;
  font-weight: 300;
  font-size: 2em;
  justify-content: left;
  margin-top: 1.7em;
  margin-left: 3.5em;
}
</style>
