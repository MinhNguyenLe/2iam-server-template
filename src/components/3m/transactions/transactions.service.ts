import TransactionsModel from "mongo/schema/3m/transactions";

export function getTransactionByType({ filter, type }: any) {
  const $filter = { $match: { isProduction: true } };
  if (filter.rangeDate) {
    $filter.$match["label.date"] = {
      $gte: new Date(filter.rangeDate[0]),
      $lte: new Date(filter.rangeDate[1]),
    };
  }

  const expenditure = TransactionsModel.aggregate([
    {
      $match: { ...$filter.$match, type },
    },
    {
      $group: {
        _id: "$label.type",
        total: { $sum: "$label.value" },
      },
    },
  ]);
  return expenditure.exec();
}

export function create({ type, label }: any) {
  const newTransaction = new TransactionsModel({
    isProduction: true,
    type,
    label: { ...label, date: new Date(label?.date) },
    createdAt: new Date(),
  });

  return newTransaction.save();
}

export async function update({ type, label, idTransaction }: any) {
  const transaction: any = await TransactionsModel.findOne({
    _id: idTransaction,
  });

  transaction.type = type;
  transaction.label = label;
  transaction.updatedAt = new Date();

  await transaction.save();
}

export function remove({ idTransaction }: any) {
  return TransactionsModel.findOneAndRemove({
    _id: idTransaction,
  });
}

export function changeTransactionType({ type, idTransaction }: any) {
  return TransactionsModel.findOneAndUpdate({ _id: idTransaction }, { type });
}
