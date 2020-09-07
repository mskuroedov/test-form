<template>
  <div class="step-one">
    <TextInput v-model.trim="$v.formData.firstName.$model"
               label="Имя"
               placeholder="Имя"
               :class="{'--error':$v.formData.firstName.$error}">
      <template v-slot:errors="">
        <div class="error" v-if="!$v.formData.firstName.required">Поле <strong>Имя</strong> обязательно</div>
        <div class="error" v-if="!$v.formData.firstName.maxLength">Введите что-нибудь покороче</div>
      </template>
    </TextInput>
    <TextInput v-model.trim="$v.formData.secondName.$model"
               label="Фамилия"
               placeholder="Фамилия"
               :class="{'--error':$v.formData.secondName.$error}">
      <template v-slot:errors="">
        <div class="error" v-if="!$v.formData.secondName.required">Поле <strong>Фамилия</strong> обязательно</div>
      </template>
    </TextInput>
    <TextInput v-model.trim="$v.formData.mail.$model"
               label="E-mail"
               placeholder="E-mail"
               :class="{'--error':$v.formData.mail.$error}">
      <template v-slot:errors="">
        <div class="error" v-if="!$v.formData.mail.required">Поле <strong>E-mail</strong> обязательно</div>
        <div class="error" v-if="!$v.formData.mail.email">Невалидный e-mail</div>
      </template>
    </TextInput>
    <TextInput v-model.trim="$v.formData.tel.$model"
               label="Телефон"
               placeholder="+79046523981"
               :mask="{mask: '+79999999999', greedy: false}"
               :class="{'--error':$v.formData.tel.$error}">
      <template v-slot:errors="">
        <div class="error" v-if="!$v.formData.tel.required">Поле <strong>Телефон</strong> обязательно</div>
        <div class="error" v-if="$v.formData.tel.required && !$v.formData.tel.isPhone">Введите корректный телефон</div>
      </template>
    </TextInput>
    <Button @click="finishStep">Продолжить</Button>
  </div>
</template>

<script>
import TextInput from "@/components/common/TextInput";
import {required, maxLength, email} from 'vuelidate/lib/validators'
import Button from "@/components/common/Button";

const validatePhone = (value) => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g.test(value);

export default {
  components: {Button, TextInput},
  data() {
    return {
      formData: {
        firstName: '',
        secondName: '',
        mail: '',
        tel: ''
      }
    }
  },
  validations: {
    formData: {
      firstName: {required, maxLength: maxLength(255)},
      secondName: {required, maxLength: maxLength(255)},
      mail: {required, email},
      tel: {required, isPhone: validatePhone},
    }
  },
  methods: {
    prepareData() {
      return ({...this.formData})
    },
    finishStep() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const userData = this.prepareData();
        this.$emit('finish', userData);
      }
    }
  }
}
</script>

<style lang="scss">
.step-one {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 16px;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
}
</style>