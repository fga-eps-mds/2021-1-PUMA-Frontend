import UserService from '../../services/userService';
import Loading from '@/components/Loading.vue'
const userService = new UserService();

function evaluateLogin() {

}

function evaluateRegister(name, email, password, repeatPassword, type, matricula, hasMatricula) {
  if (!(name && email && password && repeatPassword && type && (matricula || !hasMatricula))) {
    alert('Preencha todos os campos');
    return false;
  } else if (repeatPassword !== password) {
    alert('As senhas não são iguais');
    return false;
  } else {
    return true;
  }
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
          userService.registerUser(this.name, this.email, this.password, this.type, this.matricula).then(() => {
            this.isLoading = false;
            this.isRegister = false;
            alert('Cadastro feito com sucesso!');
          }).catch(() => {
            this.isLoading = false;
            alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
          });
        }

      } else {
        evaluateLogin();
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