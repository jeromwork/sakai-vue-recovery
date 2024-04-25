<script setup>
    import { useLayout } from '@/layout/composables/layout';
    import { ref, computed } from 'vue';
    import AppConfig from '@/layout/AppConfig.vue';  //it use, not remove!
    import authService from '../../../services/Profile/AuthService'
    import { useRouter } from 'vue-router'

    const { layoutConfig, contextPath } = useLayout();
    const email = ref('');
    const password = ref('');
    const checked = ref(false);
    const passwordErrorMessage = ref('');
    const emailErrorMessage = ref('');

    const onFocus = () => {
        passwordErrorMessage.value = emailErrorMessage.value = '';
    }
    const router = useRouter();
    const logoUrl = computed(() => {
        return `layout/images/${layoutConfig.darkTheme.value ? 'logo-dark' : 'logo-dark'}.svg`;
    });

    const entry = async () => {
        if (email.value && password.value) {
            const response = await authService.login({ email: email.value, password: password.value });
            if (response && response.ok) {
                await router.push({ path: '/' });
            }
        } else {
            if (!email.value) emailErrorMessage.value = 'обязательно для заполнения';
            if (!password.value) passwordErrorMessage.value = 'обязательно для заполнения';
        }
    };
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">

                    <div>
                        <div class="field p-fluid md:w-30rem mb-3">
                            <label for="login1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="login1" type="text" placeholder="введите email" class="w-full" style="padding: 1rem" v-model="email"
                                       :class="(emailErrorMessage)?'p-invalid':''"
                            />
                            <small class="p-error" id="login1-error">{{ emailErrorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="field p-fluid md:w-30rem mb-3">
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                            <Password id="password1"
                                      v-model="password"
                                      :feedback="false"
                                      placeholder="введите пароль"
                                      :toggleMask="true"
                                      class="w-full "
                                      :class="(passwordErrorMessage)?'p-invalid':''"
                                      inputClass="w-full"
                                      inputStyle="padding:1rem"
                            @focus="onFocus"></Password>
                            <small class="p-error" id="password1-error">{{ passwordErrorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Запомнить</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Забыли пароль?</a>
                        </div>
                        <Button label="Войти" class="w-full p-3 text-xl" @click="entry"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
