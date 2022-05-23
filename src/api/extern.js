import axios from '@/utils/http'
export default {
    sendCode(email) {
        axios;
        email;
        console.log(`${email}已发送`);
        return Promise.resolve('123456');
    },
    sendNotify(body) {
        body;
    }
}