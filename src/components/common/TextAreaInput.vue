<template>
  <div class="textarea-input">
    <label class="form-label">{{ label }}</label>
    <textarea :value="value"
              :rows="value.split('\n').length"
              :placeholder="placeholder"
              @input="updateValue($event.target.value)">
    </textarea>
  </div>
</template>

<script>
export default {
  name: "TextareaInput",
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
.textarea-input {
  position: relative;

  textarea {
    font-family: 'Roboto Condensed', sans-serif;
    background: #FFFFFF;
    border: 1px solid #D3D7DC;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 13px 14px 8px;
    min-height: 77px;
    width: 100%;
    transition: all .2s;
    resize: vertical;
    color: #555;
    font-size: 11px;

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
}
</style>
