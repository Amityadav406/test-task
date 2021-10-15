import axios from "axios";
import ENV from "../configs/env";

const useSave = ({ url, options }) => {
  const sendDataToAPI = async (data) => {
    const post_url = ENV.BASE_URL + url;

    try {
      const response = await axios.post(post_url, data, {
        ...options,
      });
      if (response) {
        return {
          status: 200,
          response,
        };
      }
    } catch (response) {
      if (response) {
        return {
          status: 400,
          response,
        };
      }
    }
  };

  return [
    {
      sendDataToAPI,
    },
  ];
};

export default useSave;
