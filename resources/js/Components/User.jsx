import { Table } from "flowbite-react";
import React from "react";

export default function User(props) {
    return (
        <>
            <Table.Cell>{props.user.name}</Table.Cell>
            <Table.Cell>{props.user.npwpd}</Table.Cell>
            <Table.Cell>{props.user.role}</Table.Cell>
            {/* <Table.Cell>
                <button>Edit</button>
                <button>Delete</button>
            </Table.Cell> */}
        </>
    );
}
