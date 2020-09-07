<template>
  <div class="text-input">
    <label class="form-label">{{ label }}</label>
    <input :placeholder="placeholder"
           @input="$emit('input',$event.target.value)"
           v-mask="mask">
    <slot name="errors"></slot>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {},
    mask: {}
  }
}
</script>

<style lang="scss">
.text-input {
  position: relative;

  input {
    background: #FFFFFF;
    border: 1px solid #D3D7DC;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 0 14px;
    font-size: 11px;
    height: 40px;
    width: 100%;
    transition: all .2s;

    &::placeholder {
      color: #BDC3C9;
    }

    &:focus {
      border-color: #757D85;
      outline: none;
    }

    &:hover {
      border-color: lighten(#757D85, 5);
    }
  }

  .error {
    display: none;
  }

  &.--error {
    input {
      animation-name: shakeError;
      animation-fill-mode: forwards;
      animation-duration: 0.6s;
      animation-timing-function: ease-in-out;
      border-color: rgb(245, 127, 108);;
      outline: none;
    }

    .error {
      display: block;
      color: rgb(245, 127, 108);
      position: absolute;
      font-size: 0.7rem;
      bottom: 0;
      left: .5rem;
      transform: translateY(100%);
    }
  }
}

</style>