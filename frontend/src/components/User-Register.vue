<template>
    <div>
        <h2>Registro</h2>
        <input v-model="username" placeholder="Usuário" />
        <input v-model="password" type="password" placeholder="Senha" />
        <button @click="register">Registrar</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserRegister',
    data() {
        return {
            username: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async register() {
            try {
                // Simulando requisição de registro via Axios
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.username,
                    password: this.password
                });

                if (response.data.success) {
                    this.message = 'Usuário registrado com sucesso!';
                } else {
                    this.message = 'Falha no registro. Tente novamente.';
                }
            } catch (error) {
                console.error('Erro no registro:', error);
                this.message = 'Erro ao tentar registrar.';
            }
        }
    }
};
</script>