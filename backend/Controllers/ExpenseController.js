const UserModel = require("../Models/User");


const addExpenes = async (req, res) => {
    const body = req.body;
    const {_id} = req.user; // get user id from user
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, // user id
            {
                $push: { expenses: body}
            },
            {
                new: true //for returning updated document
            }
    );
    return res.status(200).json({
        message: "Expense added successfully",
        success: true,
        data: userData?.expenses
    })
    }catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const fetchExpenses = async (req, res) => {
    const body = req.body;
    const {_id} = req.user; // get user id from user
    try {
        const userData = await UserModel.findById(_id).select('expenses');
    return res.status(200).json({
        message: " Fetched Expense added successfully",
        success: true,
        data: userData?.expenses
    })
    }catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteExpenses = async (req, res) => {
    const {_id} = req.user; // get user id from user
    const { expenseId } = req.params;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, // user id
            {
                $pull: { expenses: {_id: expenseId} } // pull expense from expenses array
            },
            {
                new: true //for returning updated document
            }
    );
    return res.status(200).json({
        message: "Expense Deleted successfully",
        success: true,
        data: userData?.expenses
    })
    }catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {
    addExpenes,
    fetchExpenses,
    deleteExpenses
}