import React, { useState } from "react";
import AuthenticateLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Pajak from "@/Components/Pajak";
import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Index({ auth, pajaks }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        kode: "",
        nama: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pajak.store"), {
            onSuccess: () => setOpen(false) + reset(),
        });
    };

    return (
        <AuthenticateLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Jenis Pajak
                </h2>
            }
        >
            <Head title="Jenis Pajak" />
            <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-end">
                    <Button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        onClick={() => setOpen(true)}
                    >
                        Tambah
                    </Button>
                </div>
                {/* Modal */}
                <Modal show={open} onClose={() => setOpen(false)}>
                    <Modal.Header>Form Tambah Jenis Pajak</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                method="POST"
                            >
                                <div>
                                    <div className="mb-1 block">
                                        <Label htmlFor="kode" value="Kode" />
                                        <InputError
                                            message={errors.kode}
                                            className="text-xs"
                                        />
                                        <TextInput
                                            id="kode"
                                            type="text"
                                            value={data.kode}
                                            onChange={(e) =>
                                                setData("kode", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 block">
                                        <Label htmlFor="nama" value="Nama" />
                                        <InputError
                                            message={errors.nama}
                                            className="text-xs"
                                        />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                            value={data.nama}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <PrimaryButton processing={processing}>
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* End Modal */}
                <div className="relative overflow-x-auto shadow-md mt-3">
                    <Table>
                        <Table.Head className="bg-lime-300">
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Kode</Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {pajaks.map((pajak, index) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={index}
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Pajak pajak={pajak} />
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </AuthenticateLayout>
    );
}
