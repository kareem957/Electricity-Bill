import React from "react";
import axios from "axios";
import moment from "moment";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import ViewBill from "./ViewBill";
import AddUpdateBill from "./AddUpdateBill";
import ConfirmationModal from "./DeleteBill";

const ElectricityBill = () => {
    const [modal, setModal] = useState({ show: false });

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState("billId");

    useEffect(() => {
        getData();
    }, []);

    const getData = async (props) => {
        setIsLoading(true);
        const { limit, page, sort } = props || {};
        const buildUrl = `${import.meta.env.VITE_SERVER_ENDPOINT}?${(() => (limit ? "&limit=" + limit : ""))()}${(() =>
            page ? "&page=" + page : "")()}${(() => (sort ? "&sort=" + sort : ""))()}`;
        await axios.get(buildUrl).then((res) => {
            const { data = {} } = res;
            setData(data?.data?.docs);
            setTotalRows(data?.data?.total);
            setIsLoading(false);
        });
    };

    const getModal = () => {
        const getBillById = <ViewBill modal={modal} setModal={setModal} />;

        const modalMap = {
            view: getBillById,
            addUpdate: <AddUpdateBill modal={modal} getData={getData} setModal={setModal} />,
            delete: <ConfirmationModal modal={modal} setModal={setModal} getData={getData} />,
        };

        return modal.show && modalMap[modal.action];
    };

    return (
        <div class="container">
            <BeatLoader color={"#563d7c"} size={30} loading={isLoading} />
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row">
                    <div className="d-flex flex-row justify-content-end mt-5 mb-4 text-gred">
                        <form class="form-inline w-40" style={{ marginRight: "30px" }}>
                            <input
                                class="form-control mr-sm-3"
                                type="search"
                                placeholder="Search Electricity Bill"
                                aria-label="Search"
                            />
                        </form>
                        <Button variant="success" onClick={() => setModal({ show: true, action: "addUpdate" })}>
                            Add Bill
                        </Button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th width="20%">Bill Id</th>
                                    <th width="22%">Bill Date</th>
                                    <th width="20%">Bill Paid Date</th>
                                    <th width="5%">Units</th>
                                    <th>Amount</th>
                                    <th width="20%">Updated At</th>
                                    <th width="30%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    const { billId, billDate, billPaidDate, amount, unitConsumed, updatedAt } = item;
                                    return (
                                        <tr key={index}>
                                            <td>{billId}</td>
                                            <td>{moment(billDate).format("lll")}</td>
                                            <td>{moment(billPaidDate).format("lll")}</td>
                                            <td>{unitConsumed}</td>
                                            <td>{amount}</td>
                                            <td>{moment(updatedAt).format("lll")}</td>

                                            <td>
                                                <a
                                                    href="#"
                                                    class="view"
                                                    title="View"
                                                    data-toggle="tooltip"
                                                    style={{ color: "#10ab80", marginRight: "10px" }}
                                                >
                                                    <i
                                                        class="material-icons"
                                                        onClick={() =>
                                                            setModal({
                                                                show: true,
                                                                action: "view",
                                                                id: data[index].billId,
                                                            })
                                                        }
                                                    >
                                                        &#xE417;
                                                    </i>
                                                </a>
                                                <a
                                                    href="#"
                                                    class="edit"
                                                    title="Edit"
                                                    data-toggle="tooltip"
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    <i
                                                        class="material-icons"
                                                        onClick={() =>
                                                            setModal({
                                                                initialValues: data[index],
                                                                show: true,
                                                                action: "addUpdate",
                                                            })
                                                        }
                                                    >
                                                        &#xE254;
                                                    </i>
                                                </a>
                                                <a
                                                    href="#"
                                                    class="delete"
                                                    title="Delete"
                                                    data-toggle="tooltip"
                                                    style={{ color: "red" }}
                                                >
                                                    <i
                                                        class="material-icons"
                                                        onClick={() =>
                                                            setModal({
                                                                id: data[index].billId,
                                                                show: true,
                                                                action: "delete",
                                                            })
                                                        }
                                                    >
                                                        &#xE872;
                                                    </i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {getModal()}
            </div>
        </div>
    );
};

export default ElectricityBill;
