import userModel from "../model/userData.model.js";
import bcrypt from "bcrypt";

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
    }

    return res.status(200).json({
      ok: true,
      message: "Login successful",
      userEmail: { email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const { email } = req.params; // localhost/profile/:email
    //email checking from db
    const userEmail = await userModel.findOne({ email });
    if (!userEmail) {
      return res
        .status(400)
        .json({ ok: false, message: "userEmail not found" });
    } else {
      return res.json(userEmail);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
