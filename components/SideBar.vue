<template>
  <div class="side-bar" :style="`width: ${width}px`">
    <div class="controls">
      <nuxt-link to="/">
        <span class="logo">WeWrite</span>
      </nuxt-link>
      <div class="plus" v-b-modal.myModal>+</div>
    </div>

    <div class="links">
      <nuxt-link
        v-for="board in boards"
        :key="board.id"
        :to="`/board/?id=${board.id}`"
      >
        <div :class="['item', currentId === board.id ? 'current' : '']">
          <span>{{ board.name }}</span>
          <div class="hover-border"/>
        </div>
      </nuxt-link>
    </div>

    <b-modal
      id="myModal"
      centered
      title="ボードの新規作成"
      @ok="$emit('inputName', name)"
      @hidden="name = ''"
      :ok-disabled="!name"
    >
      <b-form-input type="text" placeholder="好きなボード名を入力" v-model="name"/>
    </b-modal>
  </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';

export default {
  props: ['width', 'boards', 'currentId'],
  components: {
    bModal,
    bFormInput,
  },
  data() {
    return {
      name: '',
    };
  },
}
</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #1C2B36;
}

.controls {
  height: 66px;
  position: relative;
  padding: 15px 15px;
}

.links {
  overflow: auto;
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  bottom: 0;
}

.item {
  position: relative;
  padding-left: 18px;
  font-size: 16px;
  line-height: 42px;
  cursor: pointer;
  color: #fff;
  transition: 0.2s;
}

.item:hover {
  color: #E60014;
}

.item.current {
  background: rgba(230, 0, 20, 0.85);
}

.item.current:hover {
  color: #fff;
}

.hover-border {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 4px;
  background: #E60014;
  transition: 0.2s;
}

.item:hover > .hover-border {
  opacity: 1;
}

.logo {
  color: #fff;
  font-size: 24px;
  font-style: italic;
  transition: 0.2s;
  display: inline-block;
}

.logo:hover {
  transform: scale(1.1);
}

.plus {
  color: #fff;
  font-size: 22px;
  line-height: 20px;
  height: 34px;
  width: 34px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #ddd;
  text-align: center;
  font-weight: bold;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-45%);
  cursor: pointer;
  transition: 0.2s;
}

.plus:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

<style>
a:hover {
  text-decoration: none;
}
</style>
