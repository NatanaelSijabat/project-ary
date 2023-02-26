import React from "react";
import moment from "moment";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Table } from "flowbite-react";

export default function CekTransaksi({ transaksi }) {
    const status = (result) => {
        if (transaksi.isCheck === 0) {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200">
                    Pending
                </span>
            );
        } else {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200">
                    Clear
                </span>
            );
        }
        return result;
    };

    const action = (result) => {
        if (transaksi.isCheck === 0) {
            result = (
                <PrimaryButton processing={processing}>Accept</PrimaryButton>
            );
        }
        return result;
    };

    const { patch, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();
        patch(route("cek.update", transaksi.id));
    };

    return (
        <>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.user.name}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.nama_usaha}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.pajak.nama}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                Kategori Pajak
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_awal).format("D MMMM YYYY")}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_akhir).format("D MMMM YYYY")}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {status()}
            </Table.Cell>
            <Table.Cell className="p-6 whitespace-nowrap">
                <button className="p-4">view</button>
                <form method="POST" onSubmit={submit}>
                    {action()}
                </form>
            </Table.Cell>
        </>
    );
}
