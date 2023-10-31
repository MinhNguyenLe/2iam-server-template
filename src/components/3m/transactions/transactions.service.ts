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

function getParamsPagination(
  pagination,
) {
  const { pageNumber, pageSize } = pagination;

  return {
    skip: pageNumber > 0 ? pageSize * (pageNumber - 1) : 0,
    limit: pageSize,
  };
}

export  async function getListTransaction({pagination, filter}:any){
  const { skip, limit } = getParamsPagination(pagination)

  const $filter:any = { $match: { isProduction: true } };

  if (filter.type) {
    $filter.$match.type = filter.type
  }
  if (filter["label.type"]?.length) {
    $filter.$match["label.type"] = {
      $in: filter["label.type"]
    }
  }

  if (filter.maxValue) {
    $filter.$match["label.value"] = {
      $lte: Number(filter.maxValue)
    }
  }

  if (filter.rangeDate) {
    $filter.$match["label.date"] = {
      $gte: new Date(filter.rangeDate[0]),
      $lte: new Date(filter.rangeDate[1])
    }
  }

  if (filter["search.description"]) {
    $filter.$match["label.description"] = { $regex: filter["search.description"] }
  }

  const transactionCollection = TransactionsModel.aggregate(
    [
      {
        $project: {
          createdAt: 1,
          updatedAt: 1,
          type: 1,
          isProduction: 1,
          label: {
            value: 1,
            type: 1,
            date: 1,
            description: 1
          }
        }
      },
      $filter,
      {
        $facet: {
          count: [{ $count: 'total' }],
          data: [
            {
              $sort: {
                'label.date': -1
              }
            },
            { $skip: Number(skip) },
            { $limit: Number(limit) }
          ],
        }
      }]);

  return transactionCollection.exec();
}