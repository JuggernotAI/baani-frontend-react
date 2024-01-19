import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getInit = async () => {
  return await instance
    .get("/chat/init", {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
    .then((response) => {
      return response.data.messages[0];
    })
    .catch((error) => {
      return error;
    });
};

export const getResponse = async (messages) => {
  return await instance
    .post(
      "/chat/generate",
      {
        messages: messages,
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
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      return error;
    });
};
