import moment from "moment";
import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { seminaImageUrl } from "../config";
import Button from "./Button";

function TbodyWithAction({
    data,
    display,
    editUrl,
    deleteAction,
    customAction,
    actionNotDisplay,
    status,
}) {
    const navigate = useNavigate();
    return (
        <tbody>
            {status === "process" ? (
                <tr>
                    <td
                        colSpan={display.length + 1}
                        style={{ textAlign: "center" }}>
                        <div className="flex items-center justify-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </td>
                </tr>
            ) : data.length ? (
                data.map((data, index) => {
                    return (
                        <tr key={index}>
                            {Object.keys(data).map(
                                (key) =>
                                    display.indexOf(key) > -1 && (
                                        <td key={key}>
                                            {key === "avatar" ? (
                                                <Image
                                                    height={40}
                                                    width={40}
                                                    roundedCircle
                                                    src={`${seminaImageUrl}/${data[key]}`}
                                                />
                                            ) : key === "date" ? (
                                                moment(data[key]).format(
                                                    "DD-MM-YYYY HH:MM:SS"
                                                )
                                            ) : key === "status" ? (
                                                data[key] === "PAID" ||
                                                data[key] === "PUBLISHED" ? (
                                                    <span className="fw-bold text-success">
                                                        {data[key]}
                                                    </span>
                                                ) : (
                                                    <span className="fw-bold text-warning">
                                                        {data[key]}
                                                    </span>
                                                )
                                            ) : (
                                                data[key]
                                            )}
                                        </td>
                                    )
                            )}
                            {!actionNotDisplay && (
                                <td>
                                    {customAction &&
                                        customAction(
                                            data._id,
                                            data.statusEvent
                                        )}
                                    {editUrl && (
                                        <Button
                                            variant="success"
                                            size={"sm"}
                                            action={() =>
                                                navigate(
                                                    `${editUrl}/${data._id}/edit`
                                                )
                                            }>
                                            Edit
                                        </Button>
                                    )}
                                    {deleteAction && (
                                        <Button
                                            className="mx-2"
                                            variant="danger"
                                            size={"sm"}
                                            action={() =>
                                                deleteAction(data._id)
                                            }>
                                            Hapus
                                        </Button>
                                    )}
                                </td>
                            )}
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td
                        colSpan={display.length + 1}
                        style={{ textAlign: "center" }}>
                        Tidak Ditemukan Data
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default TbodyWithAction;
