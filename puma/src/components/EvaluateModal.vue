<template>
  <transition name='modal'>
    <div class='modal-mask'>
      <div class='modal-wrapper'>
        <div v-if='!isChooseSubject' class='modal-container'>
          <div class='close-x' v-on:click='$emit("close")'>X</div>
          <p>Essa proposta se encaixa na disciplina?</p>

          <div class='modal-footer row'>
            <slot name='footer'>
              <input
                type='submit'
                class='submit-btn no-button'
                value='Não'
                v-on:click='sla()'
              />

              <input
                type='submit'
                class='submit-btn yes-button'
                value='Sim'
                v-on:click='approveHandler'
              />
            </slot>
          </div>
        </div>

        <div v-if='isChooseSubject' class='modal-container choose-subject'>
          <div class='modal-header'>
          <div class='close-x' v-on:click='$emit("close")'>X</div>
            <p>Em qual disciplina essa proposta se encaixa?</p>
          </div>

          <select v-model='selected'>
            <option value='' selected disabled class='disabled'>
              Escolha uma disciplina
            </option>
            <option v-for='subject in subjectArray' v-bind:key='subject'
            v-bind:value='subject'>
              {{subject.name}}
            </option>
          </select>

          <input
            type='submit'
            class='submit-btn submit-button'
            value='Submeter'
            v-on:click='submitHandlerNo(selected)'
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EvaluateModal',
  props: ['subjectArray', 'submitHandlerNo', 'submitHandlerYes'],
  data() {
    return {
      isChooseSubject: false,
      selected: '',
    };
  },
  methods: {
    sla() {
      this.isChooseSubject = !this.isChooseSubject;
    },
    selectedHandler(selected) {
      this.submitHandlerNo(selected);
      this.$emit('close');
    },
    approveHandler() {
      this.submitHandlerYes();
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
p {
  font-family: rubik;
  font-size: 20px;
}

.submit-btn {
  margin-left: 10px;
  margin-right: 10px;
}

.no-button {
  background-color: #ffff;
  border: 2px dashed black;
}

.choose-subject {
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.close-x {
  cursor: pointer;
  margin-top: 15px;
  margin-right: 15px;
  text-align: right;
  align-self: flex-end;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

select {
  cursor: pointer;
  width: 90%;
  height: 70%;
  padding: 7px;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-header {
  width: 115%;
  margin-top: -20px;
  margin-left: -30px;
  margin-right: -30px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #f7db36;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition=`modal` when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

option[value=''][disabled] {
  display: none;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
