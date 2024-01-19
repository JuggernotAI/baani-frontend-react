import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getResponse = async (message) => {
  return await instance
    .post(
      "/generate",
      {
        prompt: message,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    .then((response) => {
      const data = response.data.response;
      return data[data.length - 1];
    })
    .catch((error) => {
      return error;
    });
};

export const postOnLinkedIn = async (message) => {
  return await instance
    .post(
      "/post_linkedin",
      {
        content: message,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
