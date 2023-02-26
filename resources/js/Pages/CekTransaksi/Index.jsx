import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CekTransaksi from "@/Components/CekTransaksi";
import { Button, Label, Table, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

export default function Index({ auth, transaksis }) {
    const [input, setInput] = useState("");

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
                <div className="flex">
                    <TextInput
                        id="search"
                        type="text"
                        icon={CiSearch}
                        placeholder="Cari Disini ..."
                        required={true}
                        className="w-full"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
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
                            {transaksis
                                .filter((transaksis) =>
                                    transaksis.npwpd.includes(input)
                                )
                                .map((transaksi, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <CekTransaksi
                                                transaksi={transaksi}
                                            />
                                        </Table.Row>
                                    );
                                })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </Authenticated>
    );
}
