<template>
  <div class="radio-group">
    <div v-for="(option,i) in options"
         class="radio-group__item"
         :class="{'selected': selected === option.val,'disabled': option.disabled  }"
         :key="i"
         @click="click(option)">
      {{ option.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioGroup",
  props: {
    options: {
      required: true,
      type: Array
    },
    selected: {
      type: Number,
      required: true,
    }
  },
  methods: {
    click(opt) {
      if (!opt.disabled)
        this.$emit('pick', opt.val)
    }
  }
}
</script>

<style lang="scss">
.radio-group {
  &__item {
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 15px;
    color: #757D85;
    position: relative;
    height: 24px;
    padding-left: 26px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    cursor: pointer;

    &:before {
      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      left: 0;
      top: 4px;
      border-radius: 100%;
      background: white;
      border: 2px solid #D3D7DC;
    }

    &:after {
      content: '';
      position: absolute;
      left: 3px;
      top: 7px;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      opacity: 0;
      background: #486680;
    }

    &.selected {
      &:before {
        border-color: #486680;
      }

      &:after {
        opacity: 1;
      }
    }

    &.disabled {
      cursor: not-allowed;

      &:before {
        background: darken(white, 5);
      }

      &:before, &:after {
        filter: grayscale(100%);
      }
    }
  }
}
</style>
