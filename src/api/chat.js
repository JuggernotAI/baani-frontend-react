import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const axios = require("axios");
const FormData = require("form-data");

// remove type field from list of jsons
export const removeType = (jsons) => {
  const newJsons = [];
  jsons.forEach((json) => {
    const newJson = { ...json };
    delete newJson.type;
    newJsons.push(newJson);
  });
  return newJsons;
};

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
        messages: removeType(messages),
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

export const postOnLinkedIn = async (message, imageLink) => {
  let body;

  if (imageLink === null) {
    body = {
      content: message,
    };
  } else {
    body = {
      content: message,
      image: imageLink,
    };
  }

  return await instance
    .post("/post_linkedin", body, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      return error;
    });
};
