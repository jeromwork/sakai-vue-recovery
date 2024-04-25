<script setup lang="ts">
    import { useLayout } from '@/layout/composables/layout';
    import { ref, computed } from 'vue';
    import AppConfig from '@/layout/AppConfig.vue';  //it use, not remove!
    import authService from '../../../services/Profile/AuthService'
    import { useRouter } from 'vue-router'

    const { layoutConfig, contextPath } = useLayout();
    const phone = ref('');
    const sms = ref('');
    const checked = ref(false);
    const smsErrorMessage = ref('');
    const phoneErrorMessage = ref('');

    const onFocus = () => {
        smsErrorMessage.value = phoneErrorMessage.value = '';
    }
    const router = useRouter();
    const logoUrl = computed(() => {
        return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
    });

    const entry = async () => {
        if (phone.value && sms.value) {
            const response = await authService.loginByPhone({ phone: phone.value, code: sms.value });
            if (response && response.ok) {
                await router.push({ path: '/' });
            }else {
                alert(response.error)
                sms.value = '';
            }
        } else {
            if (!phone.value) phoneErrorMessage.value = 'обязательно для заполнения';
            if (!sms.value) smsErrorMessage.value = 'обязательно для заполнения';
        }
    };
    const waitSms = ref(false);
    const sendSMS = async () => {
        phoneErrorMessage.value = '';
        if (!phone.value){
            phoneErrorMessage.value = 'обязательно для заполнения';
            return
        }
        waitSms.value = true;
        const response = await authService.sendSmsByPhone(phone.value);

        if (response && response.ok) {
            await router.push({ path: '/' });
        }else{
            smsErrorMessage.value = 'Not correct sms';
        }
    }

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">

                    <div>
                        <div class="field p-fluid md:w-30rem mb-3">
                            <label for="phone" class="font-bold block mb-2">Phone</label>
                            <InputMask inputId="phone"
                                       v-model="phone"
                                       mask="+7(999) 999-9999"
                                       placeholder="+7(999) 999-9999"
                                       class="w-full"
                                       :class="(phoneErrorMessage)?'p-invalid':''"
                                       :disabled="waitSms"
                                       @update:modelValue="phoneErrorMessage=''"
                            />
                            <small class="p-error" id="login1-error">{{ phoneErrorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="field p-fluid md:w-30rem mb-3" v-if="!waitSms">

                        </div>
                        <div class="field p-fluid md:w-30rem mb-3" v-if="waitSms">
                            <label for="sms" class="block text-900 font-medium text-xl mb-2">SMS</label>
                            <div class="justify-content-center">
                                <InputOtp inputId="sms" v-model="sms" integerOnly/>
                            </div>

                            <small class="p-error" id="password1-error">{{ smsErrorMessage || '&nbsp;' }}</small>
                        </div>

                        <Button label="Получить СМС" class="w-full p-3 text-xl" @click="sendSMS" v-if="!waitSms"></Button>
                        <Button label="Войти" class="w-full p-3 text-xl" @click="entry" v-else></Button>
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
