<template>
  <div class="form">
    <div class="form__nav">
      <div class="nav-item"
           :class="{active:currentStep === 1}"
           @click="currentStep = 1">
        Основные данные
      </div>
      <div class="nav-item"
           :class="{active:currentStep === 2,disabled:!isSecondStepEnabled}"
           @click="isSecondStepEnabled ? currentStep = 2 : undefined">
        Адрес отправки
      </div>
    </div>
    <div class="step">
      <Contacts v-show="currentStep === 1" @finish="goToSecondStep($event)"/>
      <DeliveryDetails v-if="currentStep === 2" @finish="finishDelivery($event)"/>
    </div>
    <FormLoading v-show="submitted"/>
  </div>
</template>

<script>
import Contacts from "@/components/DevileryForm/DeliveryFormSteps/Contacts";
import DeliveryDetails from "@/components/DevileryForm/DeliveryFormSteps/DeliveryDetails";
import FormLoading from "@/components/DevileryForm/FormLoading";

export default {
  name: "DeliveryForm",
  components: {FormLoading, Contacts, DeliveryDetails},
  data() {
    return {
      currentStep: 1,
      contactsData: null,
      deliveryData: null,

      submitted: false,
    }
  },
  computed: {
    isSecondStepEnabled() {
      return !!this.contactsData;
    }
  },
  methods: {
    prepareData() {
      return {...this.contactsData, ...this.deliveryData};
    },
    goToSecondStep(firstStepData) {
      this.currentStep = 2;
      this.contactsData = firstStepData;
    },
    finishDelivery(deliveryData) {
      this.deliveryData = deliveryData;
      this.sendApplication();
    },
    async sendApplication() {
      this.submitted = true;
      const usersDeliveryData = this.prepareData();

      let response = await fetch('/test.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usersDeliveryData)
      });
      if (response.ok) {
        let json = await response.json();
        console.log(json)
        if (json.success) {
          this.$emit('success')
        } else {
          this.$emit('error')
        }
      }
      this.submitted = false;
    }
  }
}
</script>

<style lang="scss">
.form {
  overflow: hidden;
  display: grid;
  margin: auto;
  width: 400px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 0px 20px powderblue;
  position: relative;

  &__nav {
    display: flex;
    background: #D3D7DC;

    .nav-item {
      display: inline-flex;
      color: #757D85;
      padding: 12px;
      justify-content: center;
      cursor: pointer;
      transition: all .2s;

      &.disabled {
        cursor: not-allowed;
      }

      &.active,
      &:hover:not(.disabled) {
        background: white;
        color: #486680;
      }

      @media(max-width: 550px) {
        width: 50%;
      }
    }
  }

  .step {
    padding: 24px 36px;
    font-size: 11px;
  }

  .form-label {
    margin-bottom: 7px;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 14px;
    width: 100%;
    display: block;
    color: #757D85;
    text-align: left;
  }

  .select {
    position: relative;

    &.--error {
      .multiselect__tags {
        border-color: rgb(245, 127, 108);
      }

      .multiselect__select:after {
        background-color: rgb(245, 127, 108);
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

  @media(max-width: 550px) {
    width: 300px;
    margin: 40px 0;
  }
}

@keyframes shakeError {
  0% {
    transform: translateX(0px);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0px);
  }
}

</style>