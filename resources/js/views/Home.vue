<template>
    <div class="p-5 space-y-5 max-w-2xl mx-auto">
        <div class="text-3xl font-semibold">
            Reverb Api Test Home
        </div>
        <hr class="border-neutral-400">
        <div v-if="state.isLoggedIn" class="text-lg font-semibold">
            Hello !{{ state.user.name }}.
        </div>
        <div class="border border-neutral-300 rounded-lg hover:bg-neutral-100 text-center py-2 p-4 cursor-pointer w-fit transition duration-200" v-else @click="login">
            Login
        </div>
        <div class="border border-neutral-300 rounded-lg hover:bg-neutral-100 text-center py-2 p-4 cursor-pointer w-fit transition duration-200" @click="sendMessage">
            Send Api Private Event
        </div>
        <hr class="border-neutral-400">
        <div>
            <div class="text-xs uppercase tracking-wider text-neutral-500">
                Message is: 
            </div>
            <div id="message-board">

            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import useUserState from '@/composable/useUserState'

    const { updateUserData, state } = useUserState()

    const login = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: 'test@example.com',
                password: 'password'
            })
            localStorage.setItem('reverb_accessToken', response.data.token);
            updateUserData()
        } catch (error) {
            console.log(error.response)
        }
    }

    const sendMessage = async () => {
        try {
            const response = await axios.get('/api/broadcast/message', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('reverb_accessToken')}`
                }
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    Echo.private('message.1')
        .listen('MessageSent', (event) => {
            console.log(event.message)
            const element = document.getElementById('message-board');
            element.innerHTML += event.message;
        })
</script>
<style scoped>

</style>