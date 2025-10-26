import express from "express";
import sale from "../models/sale.js";
import client from "../models/client.js";

/**
 * Representa uma venda no sistema.
 * @class
 */
export default class saleController {
  /**
   * Recupera a venda a partir do seu identificador, as informações do cliente vinculado a venda fazem parte do JSON de retorno.
   * @returns {json} Informações da venda.
   */
  async findById(req, res) {
    const { id } = req.params;
    try {
      const foundSale = await sale.findByPk(id, {
        include: {
          model: client,
        },
      });

      if (!foundSale) {
        return res.status(400).json({ message: "Nenhuma venda encontrada" });
      }

      res.status(201).json(foundSale);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar vendas", error });
    }
  }

  /**
   * Recupera todas as vendas, as informações do cliente vinculado às vendas fazem parte do JSON de retorno.
   * @returns {json} Informações da venda.
   */
  async findAll(req, res) {
    try {
      const sales = await sale.findAll({
        include: {
          model: client,
        },
      });

      if (!sales) {
        return res.status(400).json({ message: "Nenhuma venda encontrada" });
      }

      res.status(201).json(sales);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar vendas", error });
    }
  }

  /**
   * Inserção de uma nova venda.
   * @returns {json} Informações da venda cadastrada.
   */
  async create(req, res) {
    const { product, price, quantity, client_id } = req.body;
    try {
      const newsale = await sale.create({
        product,
        price,
        quantity,
        client_id,
      });
      res.status(201).json(newsale);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar venda", error });
    }
  }

  /**
   * Atualiza as informações da venda informada.
   * @returns {json} Informações da venda alterada.
   */
  async update(req, res) {
    const { id } = req.params;
    const { product, price, quantity, client_id } = req.body;

    try {
      const updatesale = await sale.update(
        { product, price, quantity, client_id },
        { where: { id: id } }
      );

      if (!updatesale) {
        return res.status(400).json({ message: "Venda não encontrada" });
      }

      const updatedsale = await sale.findByPk(id);
      if (!updatedsale) {
        return res.status(400).json({ message: "Venda não encontrada" });
      }
      res.status(201).json(updatedsale);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar venda", error });
    }
  }

  /**
   * Deleta a venda informada.
   * @returns {json} Indica de a remoção ocorreu com sucesso ou não.
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletesale = await sale.destroy({ where: { id: id } });
      if (!deletesale) {
        return res.status(400).json({ message: "Venda não encontrada" });
      }
      console.log(deletesale);
      res.status(201).json({ message: "Venda deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar venda", error });
    }
  }
}
