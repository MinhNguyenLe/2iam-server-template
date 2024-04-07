import TransactionsModel from "mongo/schema/3m/transactions";
import UsersModel from "mongo/schema/users";
import JARSModel from "mongo/schema/3m/jars";

// just one record
const _idJARS = "66125fe0a54a64403da81237";

export async function getJARS() {
  return JARSModel.findOneAndUpdate({ _id: _idJARS });
}

export function reportMonthly({ filter }: any) {
  if (!filter.year || !filter["label.type"]) {
    return [];
  }

  const $match = { isProduction: true };
  if (filter.year) {
    $match["label.date"] = {
      $gte: new Date(filter.year, 0, 1), // start year
      $lte: new Date(filter.year, 11, 31, 23, 59, 59, 999), // end year
    };
  }
  if (filter.type) {
    $match["type"] = filter.type;
  }
  if (filter["label.type"]) {
    $match["label.type"] = filter["label.type"];
  }

  const expenditure = TransactionsModel.aggregate([
    {
      $match,
    },
    {
      $group: {
        _id: {
          year: { $year: "$label.date" },
          month: { $month: "$label.date" },
        },
        total: { $sum: "$label.value" },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
  ]);
  return expenditure.exec();
}

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

export async function create({ type, label, userId, jars }: any) {
  const newTransaction = new TransactionsModel({
    isProduction: true,
    type,
    label: { ...label, date: new Date(label?.date) },
    createdAt: new Date(),
    userId,
  });

  await newTransaction.save();
  await JARSModel.findOneAndUpdate(
    { _id: _idJARS },
    {
      $inc: jars,
    }
  );
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

function getParamsPagination(pagination) {
  const { pageNumber, pageSize } = pagination;

  return {
    skip: pageNumber > 0 ? pageSize * (pageNumber - 1) : 0,
    limit: pageSize,
  };
}

export async function getListTransaction({ pagination, filter }: any) {
  const { skip, limit } = getParamsPagination(pagination);

  const $filter: any = { $match: { isProduction: true } };

  if (filter.type) {
    $filter.$match.type = filter.type;
  }
  if (filter["label.type"]?.length) {
    $filter.$match["label.type"] = {
      $in: filter["label.type"],
    };
  }

  if (filter.maxValue) {
    $filter.$match["label.value"] = {
      $lte: Number(filter.maxValue),
    };
  }

  if (filter.rangeDate) {
    $filter.$match["label.date"] = {
      $gte: new Date(filter.rangeDate[0]),
      $lte: new Date(filter.rangeDate[1]),
    };
  }

  if (filter["search.description"]) {
    $filter.$match["label.description"] = {
      $regex: filter["search.description"],
    };
  }
  const users = await UsersModel.find({});
  const transactionCollection = TransactionsModel.aggregate([
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
          description: 1,
        },
        userId: 1,
      },
    },
    $filter,
    {
      $facet: {
        count: [{ $count: "total" }],
        data: [
          {
            $sort: {
              "label.date": -1,
            },
          },
          { $skip: Number(skip) },
          { $limit: Number(limit) },
        ],
      },
    },
  ]);
  const transactions = await transactionCollection.exec();

  return {
    total: transactions[0]?.count?.[0]?.total || 0,
    data: transactions[0]?.data?.map((transaction) => {
      const user = users.find(
        (user) => user._id.toString() === transaction.userId
      );
      return { ...transaction, username: user?.oauth?.google?.displayName };
    }),
  };
}

export async function locallyFunc() {
  await JARSModel.findOneAndUpdate(
    { _id: _idJARS },
    {
      $inc: { nec: -100000 },
    }
  );

  return JARSModel.findOne({ _id: _idJARS });
}
