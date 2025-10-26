import express from "express";
import client from "../models/client.js";

/**
 * Representa um cliente no sistema.
 * @class
 */
export default class clientController {
  /**
   * Recupera o cliente a partir do seu identificador.
   * @returns {json} Informações do cliente.
   */
  async findById(req, res) {
    const { id } = req.params;
    try {
      const foundClient = await client.findByPk(id);

      if (!foundClient) {
        return res.status(400).json({ message: "Nenhum cliente encontrado" });
      }

      res.status(201).json(foundClient);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar cliente", error });
    }
  }

  /**
   * Recupera todos os clientes.
   * @returns {json} Informações dos clientes.
   */
  async findAll(req, res) {
    try {
      const clients = await client.findAll();

      if (!clients) {
        return res.status(400).json({ message: "Nenhum cliente encontrado" });
      }

      res.status(201).json(clients);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
  }

  /**
   * Inserção de um novo cliente.
   * @returns {json} Informações do cliente cadastrado.
   */
  async create(req, res) {
    const { name, email, cpf } = req.body;
    try {
      const newclient = await client.create({
        name,
        email,
        cpf,
      });
      res.status(201).json(newclient);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar cliente", error });
    }
  }

  /**
   * Atualiza as informações do cliente informado.
   * @returns {json} Informações do cliente alterado.
   */
  async update(req, res) {
    const { id } = req.params;
    const { name, email, cpf } = req.body;

    try {
      const updateclient = await client.update(
        { name, email, cpf },
        { where: { id: id } }
      );

      if (!updateclient) {
        return res.status(400).json({ message: "Cliente não encontrado" });
      }

      const updatedclient = await client.findByPk(id);
      if (!updatedclient) {
        return res.status(400).json({ message: "Cliente não encontrado" });
      }
      res.status(201).json(updatedclient);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar cliente", error });
    }
  }

  /**
   * Deleta o cliente informado.
   * @returns {json} Indica de a remoção ocorreu com sucesso ou não.
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleteclient = await client.destroy({ where: { id: id } });
      if (!deleteclient) {
        return res.status(400).json({ message: "Cliente não encontrado" });
      }
      console.log(deleteclient);
      res.status(201).json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar cliente", error });
    }
  }
}
