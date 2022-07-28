const router = require("express").Router();

const controller = require("./electricityController");

module.exports = () => {
    router.route("/addBill").post(controller.addBill);
    router.route("/").get(controller.getBills);
    router.route("/bill/:id").get(controller.getBillById);
    router.route("/:id/edit").put(controller.updateBill);
    router.route("/:id/delete").delete(controller.deleteBill);

    return router;
};
