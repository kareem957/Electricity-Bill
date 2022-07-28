const { nanoid } = require("nanoid");

const ElectricityBill = require("../../models/ElectricityBill");

const addBill = async (req, res) => {
    try {
        const newBill = {
            ...req.body,
            billId: nanoid(18),
        };

        const bill = await ElectricityBill.create(newBill);

        const responseObject = {
            billId: bill?.billId,
            billDate: bill?.billDate,
            billPaidDate: bill?.billPaidDate,
            unitConsumed: bill?.unitConsumed,
            amount: bill?.amount,
            createdAt: bill?.createdAt,
            updatedAt: bill?.updatedAt,
        };

        res.status(201).json({
            message: "Bill created",
            status: 201,
            bill: responseObject,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
};

const getBills = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = "billId" } = req.query;
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort,
            select: "",
        };

        const data = await ElectricityBill.paginate({}, options);
        res.status(200).json({
            data,
            status: 201,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getBillById = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await ElectricityBill.findOne({ billId: id }, { _id: 0, __v: 0 });
        res.status(200).json({
            data: bill,
            message: `Fetched Bill ${id}`,
            status: 200,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const updateBill = async (req, res) => {
    const { id } = req.params;
    const { payload } = req.body;

    try {
        const updatedBill = await ElectricityBill.updateOne(
            { billId: id },
            {
                $set: {
                    ...payload,
                    updatedAt: new Date().toISOString(),
                },
            },
        );
        res.status(200).json({
            message: "Bill is updated",
            status: 200,
            billId: id,
            isUpdated: updatedBill,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteBill = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await ElectricityBill.deleteMany({ billId: id });
        res.status(200).json({
            message: "Bill is deleted",
            status: 200,
            billId: id,
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    addBill,
    updateBill,
    deleteBill,
    getBills,
    getBillById,
};
