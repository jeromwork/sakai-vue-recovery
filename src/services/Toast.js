import {ToastSeverity} from 'primevue/api';
import {app} from '@/main';

const lifeTime = 3000;

export default {
    lifeTime:lifeTime,
    info(title, body){
        app.config.globalProperties.$toast.add({severity: ToastSeverity.INFO, summary: title, detail: body, life: this.lifeTime});
    },
    error(title, body){
        if(this.lifeTime === 3000) this.lifeTime = 10000;
        app.config.globalProperties.$toast.add({severity: ToastSeverity.ERROR, summary: title, detail: body, life: this.lifeTime});
    },
    warning(title, body) {
        app.config.globalProperties.$toast.add({severity: ToastSeverity.WARN, summary: title, detail: body, life: this.lifeTime});
    },
    success(title, body) {
        app.config.globalProperties.$toast.add({severity: ToastSeverity.SUCCESS, summary: title, detail: body, life: this.lifeTime});
    },
    duration(duration){
        this.lifeTime = duration;
        return this;
    }
};
