import axios from "axios";

export default axios.create({
  baseURL:
    "https://hsxyjbrb23.execute-api.us-west-2.amazonaws.com/travamplif/weathers", //'https://newsapi.org/v2/'
});
