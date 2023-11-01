import {
  changeTransactionType,
  create,
  getTransactionByType,
  update,
  getListTransaction,
} from "./transactions.service";

export async function getTotalValue(req, res) {
  try {
    console.log(
      "🔥 3m 🔥 transactions/get-total-value-by-filter >>> ",
      req.query
    );

    const dataRevenue = await getTransactionByType({
      filter: req.query.filter,
      type: "Revenue",
    });
    const dataExpenditure = await getTransactionByType({
      filter: req.query.filter,
      type: "Expenditure",
    });

    res
      .status(200)
      .send({ expenditure: dataExpenditure, revenue: dataRevenue });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function createTransaction(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/create >>> ", req.body);

    await create({ type: req.body.type, label: req.body.label,userId: req.user.id });

    res.status(200).json({ message: "Create new transaction successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function updateTransaction(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/update >>> ", req.body);

    await update({
      type: req.body.type,
      label: req.body.label,
      idTransaction: req.body.idTransaction,
    });

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function removeTransaction(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/remove >>> ", req.body);

    await update({
      idTransaction: req.body.idTransaction,
    });

    res.status(200).json({ message: "Remove successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function changeTransactionTypeController(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/change-type >>> ", req.body);

    await changeTransactionType({
      type: req.body.type,
      idTransaction: req.body.idTransaction,
    });

    res.status(200).json({ message: "Change type successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getListTransactionByPaginationAndFilter(req, res) {
  try {
    console.log(
      "🔥 3m 🔥 transactions/get-by-filter-and-pagination >>> ",
      req.query
    );

    const data = await getListTransaction({
      filter: req.query.filter,
      pagination: req.query.pagination,
    });

    res.status(200).send({
      data: data[0]?.data || [],
      total: data[0]?.count?.[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
}
