import axios from "axios";

const instance = axios.create({
    baseURL: "https://dalton-burger-project.firebaseio.com/"
});

export default instance;