<template>
  <div id="app">
    <DeliveryForm @success="showSuccess" @error="showError"/>
    <Modal :open="formSuccess" @close="formSuccess = false">
      <template v-slot:title><h2>Успешно!</h2></template>
      <template v-slot:text><p>Сейчас мы перезагрузим страницу</p></template>
    </Modal>
    <Modal :open="formError" @close="formError = false">
      <template v-slot:title><h2>Что-то пошло не так!</h2></template>
      <template v-slot:text><p>Попробуйте еще раз</p></template>
    </Modal>
  </div>
</template>

<script>
import DeliveryForm from "@/components/DevileryForm/DeliveryForm";
import Modal from "@/components/modal/Modal";

export default {
  name: 'App',
  components: {Modal, DeliveryForm},
  data() {
    return {
      formSuccess: false,
      formError: false
    }
  },
  methods: {
    showSuccess() {
      this.formSuccess = true;
      setTimeout(() => {
        document.location.reload();
      }, 3000)
    },
    showError() {
      this.formError = true;
      setTimeout(() => {
        this.formError = false;
      }, 5000)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
