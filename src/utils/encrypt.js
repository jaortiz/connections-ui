import crypto from "crypto";

export const encrypt = text => {
  const cipher = crypto.createCipher("aes192", "secretCipher");
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
