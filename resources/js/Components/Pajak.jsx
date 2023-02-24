import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { Button, Modal, Table } from "flowbite-react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export default function Pajak({ pajak }) {
    const [editing, setEditing] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        data,
        setData,
        patch,
        clearErrors,
        reset,
        errors,
        delete: destroy,
    } = useForm({
        kode: pajak.kode,
        nama: pajak.nama,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("pajak.update", pajak.id), {
            onSuccess: () => {
                setEditing(false);
                reset();
            },
        });
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("pajak.destroy", pajak.id), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <>
            {editing ? (
                <div>
                    <form onSubmit={submit}>
                        <input
                            value={data.kode}
                            onChange={(e) => setData("kode", e.target.value)}
                            className="mt-4 p-2 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                        <InputError message={errors.kode} className="mt-2" />
                        <input
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="mt-4 p-2 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                        <InputError message={errors.nama} className="mt-2" />
                        <div className="space-x-2 mb-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <Table.Cell>{pajak.kode}</Table.Cell>
                    <Table.Cell>{pajak.nama}</Table.Cell>
                    <Table.Cell>
                        <button onClick={() => setEditing(true)}>
                            <FiEdit className="text-2xl" />
                        </button>
                        <button onClick={() => setOpen(true)}>
                            <MdDeleteForever className="text-2xl" />
                        </button>
                        <Modal
                            show={open}
                            onClose={() => setOpen(false)}
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
                                                onClick={() => setOpen(false)}
                                            >
                                                No, cancel
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Table.Cell>
                </>
            )}
        </>
    );
}
