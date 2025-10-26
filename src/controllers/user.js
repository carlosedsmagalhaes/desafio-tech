import express from "express";
import user from "../models/user.js";

export default class userController {
  async login(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const foundUser = await user.findOne({
        where: { email: email, password: password },
      });

      if (!foundUser) {
        return res
          .status(400)
          .json({ message: "Usuário não cadastrado", login: false });
      }

      res.status(201).json({
        message: "Login realizado com sucesso",
        login: true,
        foundUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const foundUser = await user.findByPk(id);

      if (!foundUser) {
        return res.status(400).json({ message: "Nenhum usuário encontrado" });
      }

      res.status(201).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  async findAll(req, res) {
    try {
      const users = await user.findAll();

      if (!users) {
        return res.status(400).json({ message: "Nenhum usuário encontrado" });
      }

      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", error });
    }
  }

  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      const newUser = await user.create({
        name,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const updateUser = await user.update(
        { name, email, password },
        { where: { id: id } }
      );

      if (!updateUser) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      const updatedUser = await user.findByPk(id);
      if (!updatedUser) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleteUser = await user.destroy({ where: { id: id } });
      if (!deleteUser) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }
      console.log(deleteUser);
      res.status(201).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário", error });
    }
  }
}
