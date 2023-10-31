import {
  changeTransactionType,
  create,
  getTransactionByType,
  update,
} from "./transactions.service";

export async function getListTransaction(req, res) {
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
    console.log("🔥 3m 🔥 transactions/create >>> ", req.query);

    await create({ type: req.query.type, label: req.query.label });

    res.status(200).json({ message: "Create new transaction successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function updateTransaction(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/update >>> ", req.query);

    await update({
      type: req.query.type,
      label: req.query.label,
      idTransaction: req.query.idTransaction,
    });

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function removeTransaction(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/remove >>> ", req.query);

    await update({
      idTransaction: req.query.idTransaction,
    });

    res.status(200).json({ message: "Remove successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function changeTransactionTypeController(req, res) {
  try {
    console.log("🔥 3m 🔥 transactions/change-type >>> ", req.query);

    await changeTransactionType({
      type: req.query.type,
      idTransaction: req.query.idTransaction,
    });

    res.status(200).json({ message: "Change type successful" });
  } catch (error) {
    res.status(500).send({ error });
  }
}
