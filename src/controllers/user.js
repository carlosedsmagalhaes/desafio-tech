import express from "express";
import user from "../models/user.js";
import bcrypt from "bcryptjs";

/**
 * Representa um usuário no sistema.
 * @class
 */

export default class userController {
  /**
   * Valida o login do usuário, a senha passa por um processe de descriptografia para realizar a comparação com a senha informada no bdy da requisição.
   * @returns {json} Mensagem descritiva da validação, boolean indicando se o login foi efetuado com sucesso ou não e resultado da busca.
   */
  async login(req, res) {
    const { email, password } = req.body;
    /* console.log(email, password); */
    try {
      const foundUser = await user.findOne({
        where: { email: email },
      });

      if (!foundUser) {
        return res
          .status(400)
          .json({ message: "Usuário não cadastrado", login: false });
      }

      if (bcrypt.compareSync(password, foundUser.password)) {
        res.status(201).json({
          message: "Login realizado com sucesso",
          login: true,
          foundUser,
        });
      } else {
        return res.status(400).json({ message: "Senha errada", login: false });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  /**
   * Recupera o usuário a partir do seu identificador.
   * @returns {json} Informações do usuário.
   */
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

  /**
   * Recupera todos os usuários.
   * @returns {json} Informações dos usuários.
   */
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

  /**
   * Inserção de um novo usuário, a senha passa por um processo de criptografia antes da inserção na base de dados.
   * @returns {json} Informações do usuário cadastrado.
   */
  async create(req, res) {
    let { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
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

  /**
   * Atualiza as informações do usuário informado.
   * @returns {json} Informações do usuário alterado.
   */
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

  /**
   * Deleta o usuário informado.
   * @returns {json} Indica de a remoção ocorreu com sucesso ou não.
   */
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
