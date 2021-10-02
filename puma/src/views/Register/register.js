import UserService from '../../services/userService';
import Loading from '@/components/Loading.vue'
const userService = new UserService();

function evaluateLogin(email, password) {
  if(!(email && password)) {
    alert('Preencha todos os campos');
    return false;
  }
  return true;
}

function evaluateRegister(name, email, password, repeatPassword, type, matricula, hasMatricula) {
  if (!(name && email && password && repeatPassword && type && (matricula || !hasMatricula))) {
    alert('Preencha todos os campos');
    return false;
  } else if (repeatPassword !== password) {
    alert('As senhas não são iguais');
    return false;
  }
  return true;
}

export default {
  components: {
    Loading
  },
  name: 'Register',
  data() {
    return {
      name: '',
      sobrenome: '',
      email: '',
      matricula: '',
      password: '',
      repeatPassword: '',
      type: '',
      greetings: 'Bem-vindo(a) ao PUMA',
      submitButtonText: 'Entrar',
      isRegister: false,
      isLoading: false,
      hasMatricula: false,
    };
  },
  updated() {
    if(this.isRegister) {
      this.greetings = 'CADASTRO DE USUÁRIO';
      this.submitButtonText = 'Cadastrar';
    } else {
      this.greetings = 'Bem-vindo(a) ao PUMA';
      this.submitButtonText = 'Entrar';
    }
    if(this.type == 'Aluno' || this.type == 'Professor') {
      this.hasMatricula = true;
    } else {
      this.hasMatricula = false;
    }
  },
  methods: {
    submit() {
      if (this.isRegister) {
        if (evaluateRegister(this.name, this.email, this.password, this.repeatPassword, this.type, this.matricula, this.hasMatricula)) {
          this.isLoading = true;
          userService.registerUser(this.name, this.email, this.password, this.type, this.matricula).then((response) => {
            this.isLoading = false;
            this.isRegister = false;
            console.log("then user register")
            console.log(response);
            alert('Cadastro feito com sucesso!');
          }).catch((response) => {
            this.isLoading = false;
            console.log("catch user register")
            console.log(response);
            alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
          });
        }

      } else {
        if(evaluateLogin(this.email, this.password)) {
          this.isLoading = true;
          userService.logUserIn(this.email, this.password).then((response) => {
            console.log("then user login")
            console.log(response);
            this.isLoading = false;
          }).catch((response) => {
            this.isLoading = false;
            console.log("catch user login")
            console.log(response);
            alert('Uma falha ocorreu ao fazer login. Tente novamente.');
          });
        }
      }

    },
    goToRegister() {
      this.isRegister = true;
    },
    goToLogin() {
      this.isRegister = false;
    }
  },
};