import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

const AddUpdateBill = (props) => {
    const { modal, setModal, getData } = props;
    const { initialValues } = modal || {};
    const { billId, unitConsumed, amount, billDate, billPaidDate } = initialValues || {};

    const [isLoading, setIsLoading] = useState(false);

    const modalHeader = initialValues ? "Update Electricity Bill" : "Add Electricity Bill ";

    const handleClose = () => {
        setIsLoading(false);
        setModal({ show: false });
        getData();
    };

    const addUpdateBill = async () => {
        const billDate = document.getElementById("billDate").value;
        const billPaidDate = document.getElementById("paidDate").value;
        const amount = document.getElementById("amount").value;
        const unitConsumed = document.getElementById("units").value;

        const bill = {
            billDate,
            billPaidDate,
            amount,
            unitConsumed,
        };

        if (initialValues) {
            setIsLoading(true);
            await axios
                .put(`${import.meta.env.VITE_SERVER_ENDPOINT}/${billId}/edit`, { payload: bill })
                .then((res) => {
                    const { data = {} } = res;
                    console.log(data);
                    setIsLoading(true);
                    if (data.status === 200) {
                        setIsLoading(false);
                        setModal({ show: false });
                        getData();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        } else {
            await axios
                .post(`${import.meta.env.VITE_SERVER_ENDPOINT}/addBill`, bill)
                .then((res) => {
                    const { data = {} } = res;
                    console.log(data);
                    if (data.status === 201) {
                        setIsLoading(false);
                        setModal({ show: false });
                        setIsLoading(true);
                        getData();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    };

    return (
        <div className="container">
            <BeatLoader color={"#563d7c"} size={30} loading={isLoading} />
            <div className="model_box">
                <Modal show={modal.show} onHide={() => setModal({ show: false })} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span
                                style={{
                                    color: "green",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                }}
                            >
                                {modalHeader}
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="form-group">
                                <p>
                                    <label for="billDate">No of Units</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="units"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter No of units"
                                        defaultValue={unitConsumed}
                                    />
                                </p>
                            </div>
                            <div class="form-group mt-3">
                                <p>
                                    <label for="billDate">Bill Amount</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="amount"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Amount"
                                        defaultValue={amount}
                                    />
                                </p>
                            </div>
                            <div class="form-group mt-3">
                                <p>
                                    <label for="billDate">Bill Date</label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        id="billDate"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Bill Date"
                                        defaultValue={billDate && moment(billDate).format("YYYY-MM-DD")}
                                    />
                                </p>
                            </div>
                            <div class="form-group mt-3">
                                <p>
                                    <label for="billDate">Bill Paid Date</label>

                                    <input
                                        type="date"
                                        class="form-control"
                                        id="paidDate"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Paid Date"
                                        defaultValue={billPaidDate && moment(billPaidDate).format("YYYY-MM-DD")}
                                    />
                                </p>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit" class="btn btn-success" onClick={() => addUpdateBill()}>
                            Submit
                        </button>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AddUpdateBill;
