import React from "react";
import { Table } from "react-bootstrap";
import Pagination from "./Pagination";
import Tbody from "./TbodyWithAction";
import Thead from "./Thead";

function TableWithAction({
    withoutPagination,
    actionNotDisplay,
    handlePageClick,
    data,
    thead,
    tbody,
    editUrl,
    deleteAction,
    customAction,
    pages,
    page,
    limit,
    total,
    status,
    size,
}) {
    return (
        <>
            <Table size={size} striped bordered hover>
                <Thead text={thead} />
                <Tbody
                    status={status}
                    data={data}
                    display={tbody}
                    editUrl={editUrl}
                    deleteAction={deleteAction}
                    actionNotDisplay={actionNotDisplay}
                    customAction={customAction}
                />
            </Table>
            {!withoutPagination && data.length ? (
                <Pagination
                    currentDataLength={data.length}
                    page={page}
                    pages={pages}
                    limit={limit}
                    total={total}
                    handlePageClick={handlePageClick}
                />
            ) : (
                ""
            )}
        </>
    );
}

export default TableWithAction;
