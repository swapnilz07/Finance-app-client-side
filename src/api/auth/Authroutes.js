import axios from "axios";

const validateUser = async () => {
  let token = localStorage.getItem("usersdatatoken");

  try {
    const res = await axios.get("/validuser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};

export { validateUser };
