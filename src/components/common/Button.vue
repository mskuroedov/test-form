<template>
  <button class="button" type="submit" @click.prevent="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  width: 100%;
  height: 40px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  line-height: 16px;
  color: white;
  background: #486680;
  border: 0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: darken(#486680, 10);
  }
  &:focus{
    box-shadow: 0 0 10px #486680;
  }
  &[disabled] {
    background: lighten(#486680, 15);

    &:hover {
      background: lighten(#486680, 15);
    }
  }
}

</style>