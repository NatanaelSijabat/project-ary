import User from "@/Components/User";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "flowbite-react";
import React from "react";

export default function Index(props) {
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <Head title="Users" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="relative overflow-x- auto shadow-md mt-3">
                    <Table>
                        <Table.Head className="bg-lime-300">
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>NPWPD</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {props.users.map((user, index) => (
                                <Table.Row>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <User key={user.id} user={user} />
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </Authenticated>
    );
}
