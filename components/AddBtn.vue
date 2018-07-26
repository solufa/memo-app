<template>
  <div class="add" @click="sendAddEvent">+</div>
</template>

<script>
export default {
  methods: {
    sendAddEvent(e) {
      this.$emit('add', {
        originalEvent: e,
        myData: 'oooiiiii',
      });
    },
  },
};
</script>

<style scoped>
.add {
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 50%;
  background: #fff;
  width: 50px;
  height: 50px;
  font-size: 40px;
  line-height: 50px;
  cursor: pointer;
  text-align: center;
}
</style>