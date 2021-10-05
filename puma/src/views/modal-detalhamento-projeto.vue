<template>
  <div>
  <dialog open>
    <header>
      <slot name="header">
        <h2>{{ name }}</h2>
      </slot>
    </header>
    <section>
      <slot>
        <h2>Descrição: </h2>
        <p>{{ description }}</p>
        <h2>Status: </h2>
        <p :style="{ color: status === 'Em alocacao' || status === 'Aguardando aprovacao' ? '#eeff1b' : status === 'Recusado' ? 'red' : 'green'}">{{ status }}</p>
      </slot>
    </section>
    <button v-if="Object.keys(this.file).length" class="btn btn-primary" @click="downloadFile()">Download</button>

    <menu>
      <slot name="actions">
        <base-button @close="$emit('close')">Fechar</base-button>
      </slot>
    </menu>
  </dialog>
  </div>
</template>

<script>
// import axios from "../main";

export default {
  props: [
    'name',
    'projectid',
    'description',
    'status',
    'file'
  ],
  emits: ['close'],
  data() {
    return {}
  },
  methods: {
    downloadFile() {
      var byteArray = new Uint8Array(this.file.bytecontent);
      var blob = new Blob([byteArray], { type: 'application/octet-stream' });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.file.filename;
      link.click();
    }
  }
};
</script>

<style scoped>

div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;

}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>