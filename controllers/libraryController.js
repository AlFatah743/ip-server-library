import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import dotenv from "dotenv";
import * as yup from "yup";
import errorsHandler from "../errors/errorsHandler";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(32),
  });

  try {
    await schema.validate(req.body);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ field: "email", message: "Mis" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Mis" });
      }

      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          token,
          message: "Loggin Succesfuly",
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        });
      }

      return res
        .status(401)
        .json({ field: "password", message: "Mis" });
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(32),
    username: yup.string().required().min(3).max(32),
  });

  try {
    await schema.validate(req.body);
    const user = await User.create({
      email,
      password,
      username,
    });

    return res.status(201).json({
      message: "Create",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};