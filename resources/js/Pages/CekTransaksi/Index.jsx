import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CekTransaksi from "@/Components/CekTransaksi";
import { Table } from "flowbite-react";

export default function Index({ auth, transaksis }) {
    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cek Transaksi
                </h2>
            }
        >
            <Head title="Periksa Transaksi" />

            <br />

            <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
                <div className="relative overflow-x-auto shadow-md mt-3">
                    <Table>
                        <Table.Head className="bg-lime-300">
                            <Table.HeadCell>No.</Table.HeadCell>
                            <Table.HeadCell>Nama User</Table.HeadCell>
                            <Table.HeadCell>Nama Usaha</Table.HeadCell>
                            <Table.HeadCell>Jenis Pajak</Table.HeadCell>
                            <Table.HeadCell>Kategori Pajak</Table.HeadCell>
                            <Table.HeadCell>Tanggal Awal</Table.HeadCell>
                            <Table.HeadCell>Tanggal Akhir</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {transaksis.map((transaksi, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <CekTransaksi transaksi={transaksi} />
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </Authenticated>
    );
}
