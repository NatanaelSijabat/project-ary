import { useForm, usePage } from "@inertiajs/react";
import { Modal, Table, Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import DangerButton from "./DangerButton";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Select from "./Select";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

export default function KategoriPajak({ kategori }) {
    const { pajaks } = usePage().props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const {
        data,
        setData,
        patch,
        clearErrors,
        reset,
        errors,
        delete: destroy,
    } = useForm({
        pajak_id: kategori.pajak_id,
        nama: kategori.nama,
        percent: kategori.percent,
    });

    useEffect(() => {
        setData(data);
        reset();
    }, []);

    const onEdit = (e) => {
        e.preventDefault();
        patch(route("kategori.update", kategori.id), {
            method: "put",
            onSuccess: () => {
                setOpenEdit(false);
            },
        });
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("kategori.destroy", kategori.id), {
            onSuccess: () => setOpenDelete(false),
        });
    };

    return (
        <>
            <Table.Cell>{kategori.pajak.nama}</Table.Cell>
            <Table.Cell>{kategori.nama}</Table.Cell>
            <Table.Cell>{kategori.percent} %</Table.Cell>
            <Table.Cell>
                <button onClick={() => setOpenEdit(true)}>
                    <FiEdit className="text-2xl" />
                </button>
                <Modal
                    show={openEdit}
                    onClose={() => setOpenEdit(false)}
                    size="md"
                    popup={true}
                >
                    <Modal.Header>Edit Modal</Modal.Header>
                    <Modal.Body>
                        <div>
                            <form onSubmit={onEdit}>
                                <div>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="pajak_id"
                                            value="Pilih Jenis Pajak"
                                        />
                                        <Select
                                            name="pajak_id"
                                            onChange={(e) =>
                                                setData(
                                                    "pajak_id",
                                                    e.target.value
                                                )
                                            }
                                            pajaks={pajaks}
                                            value={data.pajak_id}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="nama"
                                            value="Nama Kategori"
                                        />
                                        <TextInput
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                            type="text"
                                            id="nama"
                                            autoComplete="off"
                                        />
                                        <InputError message={errors.nama} />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="percent"
                                            value="Percent"
                                        />
                                        <TextInput
                                            value={data.percent}
                                            onChange={(e) =>
                                                setData(
                                                    "percent",
                                                    e.target.value
                                                )
                                            }
                                            id="percent"
                                            type="number"
                                            autoComplete="off"
                                        />
                                        <InputError message={errors.percent} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-end gap-2">
                                    <PrimaryButton className="py-2">
                                        Simpan
                                    </PrimaryButton>
                                    <Button
                                        onClick={() => {
                                            setOpenEdit(false);
                                            reset();
                                            clearErrors();
                                        }}
                                        className="mt-2"
                                        color="gray"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
                <button onClick={() => setOpenDelete(true)}>
                    <MdDeleteForever className="text-2xl" />
                </button>
            </Table.Cell>

            <Modal
                show={openDelete}
                onClose={() => setOpenDelete(false)}
                size="md"
                popup={true}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <form onSubmit={onDelete}>
                            <div className="flex justify-center gap-4">
                                <DangerButton>Yes, I'm Sure</DangerButton>
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
        </>
    );
}
