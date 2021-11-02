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
          userService.registerUser(newUser).then(() => {
            this.isLoading = false;
            this.isRegister = false;
            alert('Cadastro feito com sucesso!');
          }).catch(() => {
            this.isLoading = false;
            alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
          });
        }
      } else if (evaluateLogin(newUser)) {
        this.isLoading = true;
        userService.logUserIn(newUser).then((userType) => {
          this.isLoading = false;
          console.log(userType);
          if (userType === 'Agente Externo') {
            this.$router.push({ name: 'My Proposals' });
          } else {
            this.$router.push('/');
          }
        }).catch(() => {
          this.isLoading = false;
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
