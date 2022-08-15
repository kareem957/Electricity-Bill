import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const ViewBill = (props) => {
    const { modal, setModal, getData } = props;

    const [bill, setBill] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBillById();
    }, []);

    const handleClose = () => {
        setIsLoading(false);
        setModal({ show: false });
    };
    const getBillById = async () => {
        setIsLoading(true);
        await axios
            .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/bill/${modal.id}`)
            .then((res) => {
                const { data = {} } = res;
                console.log(data);
                setIsLoading(false);
                setBill(data.data);
                getData();
            })
            .catch((err) => {
                setIsLoading(true);
                console.log(err);
            });
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
                                View Electricity Bill{" "}
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="form-group">
                                <p>
                                    <label for="billDate">No of Units</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="units"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter No of units"
                                        value={bill?.unitConsumed}
                                        disabled
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
                                        value={bill?.amount}
                                        disabled
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
                                        defaultValue={moment(bill?.billDate).format("YYYY-MM-DD")}
                                        disabled
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
                                        defaultValue={moment(bill?.billPaidDate).format("YYYY-MM-DD")}
                                        disabled
                                    />
                                </p>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Model Box Finish */}
            </div>
        </div>
    );
};

export default ViewBill;
