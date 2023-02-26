import KategoriPajak from "@/Components/KategoriPajak";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import InputError from "@/Components/InputError";

export default function Index({ auth, kategoris, pajaks }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        pajak_id: pajaks.id,
        nama: "",
        percent: "",
    });

    useEffect(() => {
        setData(data);
        reset();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kategori.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Authenticated
            auth={auth}
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
                {/* modal tambah data */}
                <Modal show={open} onClose={() => setOpen(false)}>
                    <Modal.Header>Tambah Kategori Pajak</Modal.Header>
                    <Modal.Body>
                        <form
                            method="POST"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div>
                                <div className="mb-1 block">
                                    <Label
                                        htmlFor="pajak_id"
                                        value="Pilih Jenis Pajak"
                                    />
                                    <Select
                                        name="pajak_id"
                                        onChange={(e) =>
                                            setData("pajak_id", e.target.value)
                                        }
                                        pajaks={pajaks}
                                    />
                                    <InputError message={errors.pajak_id} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label
                                        htmlFor="kategori"
                                        value="Nama Kategori"
                                    />
                                    <TextInput
                                        id="kategori"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.nama} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label
                                        htmlFor="percent"
                                        value="Percent %"
                                    />
                                    <TextInput
                                        id="percent"
                                        type="number"
                                        value={data.percent}
                                        onChange={(e) =>
                                            setData("percent", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.percent} />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-end">
                                <PrimaryButton
                                    processing={processing}
                                    className="py-2"
                                >
                                    Save
                                </PrimaryButton>
                                <Button
                                    className="mt-2"
                                    color="gray"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
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
