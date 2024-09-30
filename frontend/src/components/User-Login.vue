<template>
    <div>
        <h2>Login</h2>
        <input v-model="username" placeholder="Usuário" />
        <input v-model="password" type="password" placeholder="Senha" />
        <button @click="login">Login</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserLogin',
    data() {
        return {
            username: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async login() {
            try {
                // Simulando requisição de login via Axios para uma API de autenticação
                const response = await axios.post('http://localhost:3000/login', {
                    username: this.username,
                    password: this.password
                });

                if (response.data.success) {
                    // Login bem-sucedido
                    localStorage.setItem('isAuthenticated', true); // Salva a autenticação
                    this.$router.push({ name: 'home' }); // Redireciona para a Home
                } else {
                    this.message = 'Usuário ou senha incorretos.';
                }
            } catch (error) {
                console.error('Erro no login:', error);
                this.message = 'Erro ao tentar fazer login.';
            }
        }
    }
};
</script>