import axios from "@/utils/http";
export default {
  sendCode(address) {
    return axios.post("/email", { address });
  },
  async verifyCode(address, code) {
    return axios
      .get(`/email?address=${address}&code=${code}`)
      .then((res) => res.verifySuccess);
  },
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("/upload/avatar", formData);
  },
};
