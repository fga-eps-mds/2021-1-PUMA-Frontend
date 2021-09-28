<template>
  <body>
    <div class="container">
      <div class="column">
        <div class="card">
          <div class="title-box">CADASTRO DE USUÁRIO</div>
          <div>
            <form id="register-form">
              <input type="text" id="name" placeholder="Nome Completo" />
              <input
                type="text"
                id="email"
                v-model="email"
                placeholder="E-mail"
              />
              <input
                type="password"
                id="senha"
                v-model="senha"
                placeholder="Senha"
              />
              <input
                type="password"
                id="repeat-senha"
                v-model="senha"
                placeholder="Repita sua senha"
              />
              <select name="tipo" id="tipo" required>
                <option value="" selected disabled class="disabled">
                  Que tipo de usuário você é?
                </option>
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
              </select>
              <input
                type="number"
                id="matricula"
                v-model="matricula"
                placeholder="Digite sua matrícula"
              />
              <input
                type="submit"
                class="submit-btn"
                value="Cadastrar"
                @click.prevent="create"
                form="register-form"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "@/main.js";

export default {
  name: "Register",
  data() {
    return {
      greetings: "Seja bem vindo ao PUMA ",
      username: "usuario",
      sobrenome: "",
      email: "",
      matricula: "",
      senha: "",
    };
  },
  methods: {
    create() {
      console.log(global.URL_GATEWAY + 'asdfgvrftguyhrftgyhugrfg');
      let newRegister = {
        name: this.username,
        surname: this.sobrenome,
        email: this.email,
        matricula: this.matricula,
        password: this.senha,
      };
      axios
        .post(`${global.URL_GATEWAY}/aluno`, newRegister)
        .then(() => {
          this.$router.push("/");
          alert("Cadastro feito com sucesso.");
        })
        .catch(() => {
          alert("Erro no cadastro");
        });
    },
  },
};
</script>

<style>
body {
  background-color: #15355e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  background-color: #ffffff;
  border-radius: 20px;
  margin: 20px;
  padding: 1px;
  width: 725px;
  /* transition: all 0.3s ease-out; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title-box {
  font-size: 2.5em;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f7db36;
  padding: 20px;
}

#register-form {
  display: flex;
  flex-direction: column;
}

input,
select {
  border-radius: 7px;
  font-size: 1.1em;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 15px;
}

select:required:invalid {
  color: gray;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: black;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #0060df;
}

.submit-btn {
  background-color: #f7db36;
  color: #222;
  font-weight: bold;
  border: 2px solid #f7db36;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #f5871f;
}
</style>
