<template>
  <div class="add" @click="$emit('add')">+</div>
</template>

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