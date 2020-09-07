<template>
  <div class="step-two">
    <RadioGroup
        :options="deliveryTypeList"
        :selected="formData.deliveryType"
        @pick="formData.deliveryType = $event"/>
    <div class="step-two__grid">
      <template v-if="formData.deliveryType === 1">
        <div class="select"
             :class="{'--error':$v.formData.country.$error}">
          <div class="form-label">Страна</div>
          <multiselect v-model="$v.formData.country.$model"
                       :options="countriesList"
                       :show-labels="false"
                       placeholder="Выберите страну"/>
          <div class="error" v-if="$v.formData.country.$error && !$v.formData.country.required">Поле
            <strong>Страна</strong> обязательно
          </div>
        </div>
        <TextInput v-model.trim="$v.formData.city.$model"
                   label="Город"
                   placeholder="Москва"
                   :class="{'--error':$v.formData.city.$error}">
          <template v-slot:errors="">
            <div class="error" v-if="!$v.formData.city.required">Поле <strong>Город</strong> обязательно</div>
            <div class="error" v-if="!$v.formData.city.maxLength">Введите что-нибудь покороче</div>
          </template>
        </TextInput>
        <TextInput v-model.trim="$v.formData.index.$model"
                   label="Почтовый индекс"
                   placeholder="440440"
                   mask="999999"
                   :class="{'--error':$v.formData.index.$error}">
          <template v-slot:errors="">
            <div class="error" v-if="!$v.formData.index.required">Поле <strong>Индекс</strong> обязательно</div>
          </template>
        </TextInput>
        <TextInput v-model.trim="$v.formData.address.$model"
                   label="Адрес"
                   placeholder="ул. Космонавтов 78, кв. 9"
                   :class="{'--error':$v.formData.address.$error}">
          <template v-slot:errors="">
            <div class="error" v-if="!$v.formData.address.required">Поле <strong>Адрес</strong> обязательно</div>
            <div class="error" v-if="!$v.formData.address.maxLength">Введите что-нибудь покороче</div>
          </template>
        </TextInput>
        <TextInput v-model.trim="$v.formData.deliveryDate.$model"
                   label="Дата доставки"
                   placeholder="30/09/2020"
                   :mask="{alias:'date',greedy:true}"
                   :class="{'--error':$v.formData.deliveryDate.$error}">
          <template v-slot:errors="">
            <div class="error" v-if="!$v.formData.deliveryDate.required">Поле <strong>Дата</strong> обязательно</div>
            <div class="error" v-if="$v.formData.deliveryDate.required && !$v.formData.deliveryDate.isDate">
              Введите корректную дату
            </div>
          </template>
        </TextInput>
      </template>
      <TextareaInput v-model="formData.comment"
                     label="Комментарий"
                     placeholder="Оставьте ваш комментарий"/>
      <Button @click="finishStep">Оформить заказ</Button>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/common/TextInput";
import {required, maxLength} from 'vuelidate/lib/validators';
import {countriesList} from "@/utilities/countriesList";
import Button from "@/components/common/Button";
import RadioGroup from "@/components/common/RadioGroup";
import TextareaInput from "@/components/common/TextAreaInput";

const validateDate = (value) => !isNaN(+value.replace(/\//g, ''));

export default {
  components: {TextareaInput, RadioGroup, Button, TextInput},
  data() {
    return {
      value: '',
      deliveryTypeList: [
        {name: 'Доставка', val: 1},
        {name: 'Самовывоз', val: 2}
      ],
      countriesList: countriesList,
      formData: {
        deliveryType: 1,
        country: null,
        city: null,
        index: null,
        address: null,
        deliveryDate: null,
        comment: ''
      }
    }
  },
  validations() {
    if (this.formData.deliveryType === 1) {
      return {
        formData: {
          country: {required},
          city: {required, maxLength: maxLength(255)},
          index: {required},
          address: {required, maxLength: maxLength(255)},
          deliveryDate: {required, isDate: validateDate}
        }
      }
    }
    return {}
  },
  watch: {
    'formData.deliveryType'(newValue) {
      this.formData = {
        deliveryType: newValue,
        country: null,
        city: null,
        index: null,
        address: null,
        deliveryDate: null,
        comment: ''
      }
      this.$v.$reset();
    }
  },
  methods: {
    prepareFormData() {
      return this.formData.deliveryType === 1 ?
          {...this.formData} :
          {deliveryType: this.formData.deliveryType, comment: this.formData.comment}
    },
    finishStep() {
      this.$v.$touch();
      if (!this.$v.$invalid) {

        this.$emit('finish', this.prepareFormData())
      }
    }
  }
}
</script>

<style lang="scss">
.step-two {
  .radio-group {
    margin-bottom: 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }

}
</style>