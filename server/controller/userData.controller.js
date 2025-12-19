import userModel from "../model/userData.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

/* ================= REGISTER ================= */
export const doRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ ok: false, message: "Passwords do not match" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({ ok: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

/* ================= LOGIN ================= */
// temporary data Storage   sub users ki ids save kerne k liye
const sessionKeys = {};
export const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ ok: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ ok: false, message: "Invalid password" });
    } else {
      const dynamicKey = CryptoJS.lib.WordArray.random(16).toString();
      const sessionID = uuidv4();
      const encryptedMail = CryptoJS.AES.encrypt(email, dynamicKey).toString();
      sessionKeys[sessionID] = { dynamicKey, encryptedEmail: encryptedMail };

      return res.status(200).json({
        ok: true,
        message: "Login successful",
        // userEmail: { email: user.email },
        userEmail: { sessionID },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const { sessionID } = req.params; // localhost/profile/:email
    if (!sessionKeys[sessionID]) {
      return res
        .status(404)
        .json({ ok: false, message: "session Expierd" })
        .toString(CryptoJS.enc.Utf8);
    }

    if (!decryptedMail) {
      return res
        .status(400)
        .json({ ok: false, message: "Email decryption failed" });
    }

    const { dynamicKey, encryptedEmail } = sessionKeys[sessionID];
    const decryptedMail = crypto.AES.decrypt(
      encryptedEmail,
      dynamicKey
    ).toString(CryptoJS.enc.Utf8);

    //email checking from db
    const userEmail = await userModel.findOne({ decryptedMail });
    if (!userEmail) {
      return res
        .status(400)
        .json({ ok: false, message: "userEmail not found" });
    } else {
      return res.json({ ok: true, email: userEmail });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
