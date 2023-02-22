import KategoriPajak from "@/Components/KategoriPajak";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { kategoris } = usePage().props;

    const [open, setOpen] = useState(false);
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kategori Pajak
                </h2>
            }
        >
            <Head title="Kategori Pajak" />
            <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-end">
                    <Button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        onClick={() => setOpen(true)}
                    >
                        Tambah
                    </Button>
                </div>
                {/* modal */}

                {/* end modal */}
                <div className="relative overflow-x-auto shadow-md mt-3 border rounded">
                    <Table>
                        <Table.Head className="bg-lime-300">
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Jenis Pajak</Table.HeadCell>
                            <Table.HeadCell>Kategori Pajak </Table.HeadCell>
                            <Table.HeadCell>Percent</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {/* {kategoris.map((kategori, index) => (
                                <Table.Row>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <KategoriPajak kategori={kategori} />
                                </Table.Row>
                            ))} */}
                            {kategoris.data.map((kategori, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <KategoriPajak kategori={kategori} />
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className="flex items-center justify-center text-center mt-2">
                    <Pagination class="mt-6" links={kategoris.links} />
                </div>
            </div>
        </Authenticated>
    );
}
