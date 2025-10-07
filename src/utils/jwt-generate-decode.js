import jwt from "jsonwebtoken";

const JSON_SECRET_KEY = "thisisasignatureforwebtokern";

const generateToken = async () => {
  const jsonToken = jwt.sign({ name: "Ahtasham" }, JSON_SECRET_KEY);
  console.log(jsonToken);
    decodeJWT(jsonToken)
};

const decodeJWT = async (jsonToken) => {
    const decodedToken = jwt.decode(jsonToken)
    console.log(decodedToken)
};

generateToken();
