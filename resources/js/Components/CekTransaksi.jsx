import React, { useState } from "react";
import moment from "moment";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import DangerButton from "./DangerButton";

export default function CekTransaksi({ transaksi }) {
    const [opendelete, setOpenDelete] = useState(false);
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

    const donwload = (result) => {
        if (transaksi.file.length > 0) {
            result = (
                <a
                    className="p-4 hover:cursor-pointer"
                    href={"cek/pdf/" + transaksi.id}
                >
                    <HiOutlineDownload className="text-2xl" />
                </a>
            );
        } else {
            result = <></>;
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

    const {
        patch,
        processing,
        reset,
        delete: destroy,
    } = useForm({
        user_id: transaksi.user_id,
        pajak_id: transaksi.pajak_id,
        kategori_pajak_id: transaksi.kategori_pajak_id,
        nama_usaha: transaksi.nama_usaha,
        jumlah_pendapatan: transaksi.jumlah_pendapatan,
        jumlah_pajak: transaksi.jumlah_pajak,
        tanggal_awal: transaksi.tanggal_awal,
        tanggal_akhir: transaksi.tanggal_akhir,
        file: transaksi.file,
        isCheck: transaksi.isCheck,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("cek.update", transaksi.id));
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("cek.destroy", transaksi.id), {
            onSuccess: () => setOpenDelete(false),
        });
    };

    return (
        <>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.name}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.nama_usaha}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.jenis_nama}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.kategori_nama}
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
                <div className="flex">
                    {donwload()}
                    <button onClick={() => setOpenDelete(true)}>
                        <MdDeleteForever className="text-2xl mr-2" />
                    </button>
                    <Modal
                        show={opendelete}
                        onClose={() => setOpenDelete(false)}
                        size="md"
                        popup={true}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    product?
                                </h3>
                                <form onSubmit={onDelete}>
                                    <div className="flex justify-center gap-4">
                                        <DangerButton>
                                            Yes, I'm Sure
                                        </DangerButton>
                                        <Button
                                            color="gray"
                                            onClick={() => setOpenDelete(false)}
                                        >
                                            No, cancel
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <form method="POST" onSubmit={submit}>
                        {action()}
                    </form>
                </div>
            </Table.Cell>
        </>
    );
}
