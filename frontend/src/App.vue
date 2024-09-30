<template>
    <div id="app">
        <h1>Sistema de Cadastro e Login</h1>
        <Login />
        <Register />
    </div>
</template>

<script>
import Login from './components/User-Login.vue';
import Register from './components/User-Register.vue';

export default {
    components: {
        Login,
        Register,
    }
};
</script>