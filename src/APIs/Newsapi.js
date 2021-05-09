import axios from "axios";

export default axios.create({
  baseURL:
    "https://dk6wv3787j.execute-api.us-west-2.amazonaws.com/travamplif/news", //'https://newsapi.org/v2/'
});
