<template>
  <div class="add" @click="$emit('add')">+</div>
</template>

<style scoped>
.add {
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background: #fff;
  width: 60px;
  height: 60px;
  font-size: 50px;
  line-height: 50px;
  cursor: pointer;
  text-align: center;
  color: #666;
  transition: 0.2s;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.35);
}

.add:hover {
  transform: scale(1.1);
}
</style>