import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import "bootstrap/dist/css/bootstrap.min.css";

const DeleteBill = (props) => {
    const { modal, setModal, getData } = props;
    const [isLoading, setIsLoading] = useState(false);

    const deleteBillById = async () => {
        await axios
            .delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/${modal.id}/delete`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        setModal({ show: false });
        getData();
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
                                Delete Electricity Bill{" "}
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are You Sure to Delete Electricity Bill :- <span className="text-danger">${modal.id}</span>
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit" class="btn btn-success" onClick={() => deleteBillById()}>
                            Delete
                        </button>
                        <button variant="danger" class="btn btn-danger" onClick={() => setModal({ show: false })}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default DeleteBill;
