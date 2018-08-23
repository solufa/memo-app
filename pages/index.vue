<template>
  <div class="main">
    <form class="name-form" @submit.prevent="submitName">
      <h1 class="logo">WeWrite</h1>
      <b-input-group size="lg">
        <b-form-input type="text" placeholder="好きなボード名を入力" v-model="name"/>
        <b-input-group-append>
          <b-btn variant="primary" @click="submitName">ENTER</b-btn>
        </b-input-group-append>
      </b-input-group>
    </form>
  </div>
</template>

<script>
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
import bInputGroupAddon from 'bootstrap-vue/es/components/input-group/input-group-addon';

export default {
  components: {
    bFormInput,
    bInputGroup,
    bInputGroupAddon,
  },
  async fetch({ store }) {
    await store.dispatch('getBoards');
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    async submitName() {
      if (!this.name) return;

      const targetBoard = this.$store.state.boards.find(board => board.name === this.name);

      if (!targetBoard) {
        const id = await this.$store.dispatch('createBoard', this.name);
        this.$router.push(`/board/?id=${id}`);
      } else {
        this.$router.push(`/board/?id=${targetBoard.id}`);
      }
    },
  },
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: center/cover url(~/assets/desk.jpg);
}

.name-form {
  position: absolute;
  bottom: 20%;
  right: 10%;
  width: 500px;
}

.logo {
  margin-bottom: 40px;
  color: #fff;
  font-size: 100px;
  font-style: italic;
  text-align: right;
  margin-right: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
