<template>

    <div class="container">
            <div class="column">
                <div class="card">
                    <div class="title-box">{{ greetings }}</div>
                    <div>
                        <form id="register-form">

    <input v-if="isRegister" type="text" id="name" v-model="name" placeholder="Nome Completo" />

                            <input type="text" id="email" v-model="email" placeholder="E-mail" />

    <input type="password" id="senha" v-model="password" placeholder="Senha" />

    <input v-if="isRegister" type="password" id="repeatPassword" v-model="repeatPassword"
        placeholder="Repita sua senha" />

        <select v-if="isRegister" name="tipo" id="tipo" required v-model="type">
            <option value="" selected disabled class="disabled">
                Que tipo de usuário você é?
            </option>
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Agente Externo">Agente Externo</option>
        </select>

    <input v-if="isRegister && hasMatricula" type="number" id="matricula" v-model="matricula"
      placeholder="Digite sua matrícula" />

    <select v-if="isRegister && isExternalAgent" required v-model="externalAgentType">
        <option value="" selected disabled class="disabled">
            Que tipo de Agente Externo você é?
        </option>
        <option value="Pessoa Fisica">Pessoa Física</option>
        <option value="Pessoa Juridica">Pessoa Jurídica</option>
    </select>

    <input v-if="isRegister && isJuridical" type="name" id="companyName" v-model="companyName"
       placeholder="Digite o nome da empresa" />

    <input v-if="isRegister && isJuridical" type="number" id="cnpj" v-model="cnpj"
        placeholder="Digite o CNPJ da empresa" />

    <input v-if="isRegister && isJuridical" type="number" id="cep" v-model="cep"
       placeholder="Digite o CEP da empresa" />

    <input v-if="isRegister && isJuridical" type="name" id="socialReason" v-model="socialReason"
                                placeholder="Digite a razão social da empresa" />

    <input v-if="isRegister && isPhysical" type="number" id="cpf" v-model="cpf"
                                placeholder="Digite seu CPF" />

    <div v-if="!isRegister" class="clickable-text-left" v-on:click="goToRegister">
                                <a href="#">
                                    Não possui uma conta? Cadastre-se
                                </a>
                            </div>

                            <div v-if="!isRegister" class="clickable-text-left">
                                <a href="#">
                                    Esqueci minha senha
                                </a>
                            </div>

    <input v-if="!isLoading" type="submit" class="submit-btn" :value="submitButtonText"
                                @click.prevent="submit" form="register-form" />

                            <Loading class="loading" v-if='isLoading' />

    <div v-if="isRegister" class="clickable-text-center" v-on:click="goToLogin">
                                <a href="#">
                                    Voltar ao login
                                </a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
/* eslint-disable import/no-unresolved */
import UserService from '../../services/userService';
import Loading from '@/components/Loading.vue';

const userService = new UserService();

function evaluateLogin(newUser) {
  if (!(newUser.email && newUser.password)) {
    alert('Preencha todos os campos');
    return false;
  }
  return true;
}

function evaluateRegister(newUser, hasMatricula, isJuridical, isPhysical) {
  if (!(
    newUser.name
    && newUser.email
    && newUser.password
    && newUser.repeatPassword
    && newUser.type
    && (newUser.matricula || !hasMatricula)
    && (newUser.cpf || !isPhysical)
    && ((newUser.cnpj && newUser.cep && newUser.companyName
    && newUser.socialReason) || !isJuridical)
  )) {
    alert('Preencha todos os campos');
    return false;
  } if (newUser.repeatPassword !== newUser.password) {
    alert('As senhas não são iguais');
    return false;
  }
  return true;
}

export default {
  components: {
    Loading,
  },
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      matricula: '',
      password: '',
      repeatPassword: '',
      cnpj: '',
      cep: '',
      companyName: '',
      socialReason: '',
      cpf: '',
      type: '',
      externalAgentType: '',
      greetings: 'Bem-vindo(a) ao PUMA',
      submitButtonText: 'Entrar',
      isRegister: false,
      isLoading: false,
      hasMatricula: false,
      isJuridical: false,
      isPhysical: false,
      isExternalAgent: false,
    };
  },
  updated() {
    if (this.isRegister) {
      this.greetings = 'CADASTRO DE USUÁRIO';
      this.submitButtonText = 'Cadastrar';
    } else {
      this.greetings = 'Bem-vindo(a) ao PUMA';
      this.submitButtonText = 'Entrar';
    }
    if (this.type === 'Aluno' || this.type === 'Professor') {
      this.hasMatricula = true;
    } else {
      this.hasMatricula = false;
    }
    if (this.type === 'Agente Externo') {
      this.isExternalAgent = true;
      if (this.externalAgentType === 'Pessoa Fisica') {
        this.isPhysical = true;
        this.isJuridical = false;
      } else if (this.externalAgentType === 'Pessoa Juridica') {
        this.isJuridical = true;
        this.isPhysical = false;
      } else {
        this.isPhysical = false;
        this.isJuridical = false;
      }
    } else {
      this.isExternalAgent = false;
      this.isPhysical = false;
      this.isJuridical = false;
    }
  },
  methods: {
    submit() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword,
        matricula: this.matricula,
        type: this.type,
        externalAgentType: this.externalAgentType,
        cnpj: this.cnpj,
        cep: this.cep,
        companyName: this.companyName,
        socialReason: this.socialReason,
        cpf: this.cpf,
      };
      if (this.isRegister) {
        if (evaluateRegister(newUser, this.hasMatricula, this.isJuridical, this.isPhysical)) {
          this.isLoading = true;
          userService.registerUser(newUser).then((response) => {
            this.isLoading = false;
            this.isRegister = false;
            console.log('then user register');
            console.log(response);
            alert('Cadastro feito com sucesso!');
          }).catch((response) => {
            this.isLoading = false;
            console.log('catch user register');
            console.log(response);
            alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
          });
        }
      } else if (evaluateLogin(newUser)) {
        this.isLoading = true;
        userService.logUserIn(newUser).then((response) => {
          console.log('then user login');
          console.log(response);
          this.isLoading = false;
        }).catch((response) => {
          this.isLoading = false;
          console.log('catch user login');
          console.log(response);
          alert('Uma falha ocorreu ao fazer login. Tente novamente.');
        });
      }
    },
    goToRegister() {
      this.isRegister = true;
    },
    goToLogin() {
      this.isRegister = false;
    },
  },
};

</script>

<style>
html {
    background-color: #15355e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 13vh;
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
  align-items: center;
  background-color: #f7db36;
  color: #222;
  border: 2px solid #f7db36;
  padding: 10px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
  width: 10em;
}

.loading {
  font-size: 16px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #f5871f;
}

a {
  color: black;
  text-decoration: none; /* no underline */
}

.clickable-text-left {
  font-size: 1.1em;
  margin-top: 20px;
  margin-left: 70px;
  text-align: left;
}

.clickable-text-center {
  font-size: 1.1em;
  margin-bottom: 20px;
  text-align: center;
}
</style>
