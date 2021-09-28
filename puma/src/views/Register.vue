<template>
    <div>
        <h1> {{greetings}}{{username}} !</h1>
        <form id="register-form">
            <div class="input-container">
                <label for="tipo">Escolha o tipo de usuario:</label>
                <select name="tipo" id="tipo">
                    <option value="">Selecione o tipo de usuário</option>
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                </select>
            </div>
            <div class="input-container">
                <label>Nome do usuário</label>
                <input type="text" id="username" v-model="username" placeholder="Digite o seu nome de usuário">
            </div>
            <div class="input-container">
                <label>Sobrenome</label>
                <input type="text" id="sobrenome" v-model="sobrenome" placeholder="Digite o seu sobrenome">
            </div>
            <div class="input-container">
                <label>E-mail</label>
                <input type="text" id="email" v-model="email" placeholder="Digite o seu email">
            </div>
            <div class="input-container">
                <label>Matricula</label>
                <input type="number" id="matricula" v-model="matricula" placeholder="Digite sua matrícula">
            </div>
            <div class="input-container">
                <label>Senha</label>
                <input type="password" id="senha" v-model="senha" placeholder="Digite sua senha">
            </div>
            <div class="input-container">
                <input type="submit" class="submit-btn" value="Realizar Cadastro" @click.prevent="create" form="register-form">
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '@/main.js'

    export default {
        name : 'Register',
        data () {
            return{
                greetings:'Seja bem vindo ao PUMA ',
                username:'usuario',
                sobrenome:'',
                email: '',
                matricula: '',
                senha: ''
            }
        },
        methods:{
            create(){
                let newRegister = {
                    nome: this.username,
                    sobrenome: this.sobrenome,
                    email: this.email,
                    matricula: this.matricula,
                    senha: this.senha
                }
                
                axios.post("http://localhost:3004/aluno",newRegister)
                .then((response) =>{
                    this.$router.push('/');
                    alert(response);
                }).catch((e) =>{
                    alert(e);
                })ç
            }
        },    
    
    }
</script>

<style>
    #register-form{
        max-width: 400px;
        margin: 0 auto;
    }
    
    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    
    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left:4px solid #0060df;
    }

    select{
        padding: 5px 10px;
        width: 300px;
    }
    
    .submit-btn{
        background-color: #0060df;
        color: #222; 
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s
    }

    .submit-btn:hover{
        background-color: transparent;
        color: #f5871f;
    }

</style>
