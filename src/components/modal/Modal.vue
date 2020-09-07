<template>
  <div class="modal-window" v-show="open" :class="{open:open}">
    <div>
      <a href="#" title="Close" class="modal-close"  @click="$emit('close')">&times;</a>
      <slot name="title"></slot>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.modal-window {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
  transition: all 0.3s;

  &.open {
    opacity: 1;
  }

  & > div {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: #ffffff;
  }

  header {
    font-weight: bold;
  }

  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
}

.modal-close {
  color: #aaa;
  line-height: 30px;
  font-size: 20px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 30px;
  text-decoration: none;

  &:hover {
    color: black;
  }
}
</style>