import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { HiOutlineDownload } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { Modal, Table, Button, Label, TextInput, Select } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";
import { useForm } from "@inertiajs/react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import DangerButton from "./DangerButton";
import InputError from "./InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CurrencyFormat from "react-currency-format";
import { FaFileUpload } from "react-icons/fa";

export default function Transaksi({ transaksi }) {
    const {
        data,
        setData,
        patch,
        clearErrors,
        reset,
        errors,
        delete: destroy,
        processing,
        post,
    } = useForm({
        pajak_id: transaksi.pajak_id,
        nama_usaha: transaksi.nama_usaha,
        kategori_pajak_id: transaksi.kategori_pajak_id,
        jumlah_pendapatan: transaksi.jumlah_pendapatan,
        jumlah_pajak: transaksi.jumlah_pajak,
        tanggal_awal: transaksi.tanggal_awal,
        tanggal_akhir: transaksi.tanggal_akhir,
        file: null,
    });

    useEffect(() => {
        setData(data);
        reset();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        patch(route("transaksi.update", transaksi.id), {
            onSuccess: () => {
                setModalEdit(false);
                reset();
            },
        });
    };

    const [jenis, setJenis] = useState([]);
    const [jenisId, setJenisId] = useState("");
    const [kategori, setKategori] = useState([]);
    const [kategoriId, setKategoriId] = useState("");
    const [percent, setPercent] = useState("");
    const [totalPajak, setTotalPajak] = useState("");
    const [pendapatan, setPendapatan] = useState("");

    const [pajakNama, setPajakNama] = useState("");
    const [kategoriNama, setKategoriNama] = useState("");

    const [selectedImage, setSelectedImage] = useState();
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalUploadFile, setModalUploadFile] = useState(false);

    useEffect(() => {
        const pajakId = data.pajak_id;
        setJenisId(pajakId);
        const kategoriPajakId = data.kategori_pajak_id;
        setKategoriId(kategoriPajakId);
        const getJenisById = async () => {
            const req = await fetch(
                `http://localhost:8000/api/pajak/${jenisId}`
            );
            const res = await req.json();
            setPajakNama(await res);
        };

        const getJenisAll = async () => {
            const req = await fetch("http://localhost:8000/api/pajak");
            const res = await req.json();
            setJenis(await res);
        };

        const getKategoriById = async () => {
            const req = await fetch(
                `http://localhost:8000/api/kategori/${kategoriId}`
            );
            const res = await req.json();
            setKategoriNama(await res);
            setPercent(await res);
        };

        const getKategoriByJenisId = async () => {
            const req = await fetch(
                `http://localhost:8000/api/kategori/pajak/${jenisId}`
            );
            const res = await req.json();
            setKategori(await res);
        };

        getJenisById();
        getJenisAll();
        getKategoriById();
        getKategoriByJenisId();
    }, [jenisId, kategoriId]);

    const handleJenis = (e) => {
        const getJenisId = e.target.value;
        setJenisId(getJenisId);
        setData("pajak_id", getJenisId);
    };

    const handleKategori = (e) => {
        const getKategoriId = e.target.value;
        setKategoriId(getKategoriId);
        setData("kategori_pajak_id", getKategoriId);
    };

    const handlePendapatan = (e) => {
        const pendapatan = parseInt(e.target.value.replaceAll(".", ""));
        setPendapatan(pendapatan);
        setData("jumlah_pendapatan", pendapatan);
    };

    const handleJumlahPajak = (e) => {
        const persen = percent.data?.map((e) => e.percent);
        const d = parseInt(pendapatan);
        const total_pajak = (d * persen) / 100;
        setTotalPajak(total_pajak);
        setData("jumlah_pajak", total_pajak);
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setData("file", e.target.files[0]);
        }
    };

    const status = (result) => {
        if (transaksi.isCheck === 0) {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200">
                    Menunggu Konfirmasi
                </span>
            );
        } else {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 ">
                    Sudah Di Bayar
                </span>
            );
        }
        return result;
    };

    const action = (e) => {
        if (transaksi.isCheck === 1) {
            e = <></>;
        } else {
            e = (
                <div className="flex">
                    <button className="mr-1" onClick={() => setModalEdit(true)}>
                        <FiEdit className="text-xl" />
                    </button>
                    <button
                        onClick={() => setModalDelete(true)}
                        className="mr-1"
                    >
                        <MdDeleteForever className="text-xl" />
                    </button>
                    <button
                        className="flex"
                        onClick={() => setModalUploadFile(true)}
                    >
                        <span>Upload</span>
                        <FaFileUpload className="text-xl" />
                    </button>
                    <button className="mr-1">
                        <a href={"transaksi/pdf/" + transaksi.id}>
                            <HiOutlineDownload className="text-xl" />
                        </a>
                    </button>
                </div>
            );
        }
        return e;
    };

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const handleUploadFile = (e) => {
        e.preventDefault();
        post(route("transaksi.upload"), {
            onSuccess: () => {
                setModalUploadFile(false);
                reset();
            },
        });
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("transaksi.destroy", transaksi.id), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.nama_usaha}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.pajak.nama}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {transaksi.kategori_pajak.nama}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {rupiah(transaksi.jumlah_pendapatan)}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {rupiah(transaksi.jumlah_pajak)}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_awal).format("D MMMM YYYY")}
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_akhir).format("D MMMM YYYY")}
            </Table.Cell>
            {/* <Table.Cell className="px-1 py-1 whitespace-nowrap">
                <img src={`storage/images/${transaksi.file}`} />
            </Table.Cell> */}
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {status()}
                </span>
            </Table.Cell>
            <Table.Cell className="px-6 py-6 whitespace-nowrap">
                {action()}
            </Table.Cell>
            <Modal
                show={modalDelete}
                onClose={() => setModalDelete(false)}
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
                                    onClick={() => setModalDelete(false)}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={modalUploadFile}
                onClose={() => {
                    setModalUploadFile(false);
                    reset();
                }}
                size="xl"
            >
                <Modal.Header>Upload File</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUploadFile}>
                        <div className="flex">
                            <div>
                                <div className="block">
                                    <Label
                                        htmlFor="file"
                                        value="Upload File"
                                        className="text-xs"
                                    />
                                    <InputError message={errors.file} />
                                </div>
                                <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    className="block w-full sm:text-sm mb-2"
                                    onChange={(e) => imageChange(e)}
                                    value={""}
                                />
                            </div>
                            <div>
                                {selectedImage && (
                                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                        <img
                                            alt="image"
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            className="rounded-t-lg w-80 aspect-auto"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <PrimaryButton processing={processing}>
                            Simpan
                        </PrimaryButton>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal
                show={modalEdit}
                onClose={() => setModalEdit(false)}
                size="5xl"
            >
                <Modal.Header>Edit Modal</Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        <div className="grid grid-flow-col gap-3">
                            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="nama_usaha"
                                            value="Nama Usaha"
                                            className="text-xs"
                                        />
                                        <InputError
                                            message={errors.nama_usaha}
                                        />
                                    </div>
                                    <TextInput
                                        autoComplete="off"
                                        id="nama_usaha"
                                        value={data.nama_usaha}
                                        onChange={(e) =>
                                            setData(
                                                "nama_usaha",
                                                e.target.value
                                            )
                                        }
                                        className="text-xs"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="jumlah_pajak"
                                            value="Jumlah Pajak"
                                            className="text-xs"
                                        />
                                        <InputError
                                            message={errors.jumlah_pajak}
                                        />
                                    </div>
                                    <div className="relative rounded-md shadow-sm ">
                                        {jenisId && (
                                            <>
                                                <div className="pointer-event-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                                                    <span className="text-gray-500 sm:text-sm">
                                                        Rp
                                                    </span>
                                                </div>
                                                <CurrencyFormat
                                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2 pl-8 pr-12"
                                                    thousandSeparator={"."}
                                                    decimalSeparator={","}
                                                    value={data.jumlah_pajak}
                                                    onChange={(e) =>
                                                        handleJumlahPajak(e)
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="jenis_pajak"
                                            value="Jenis Pajak"
                                            className="text-xs"
                                        />
                                        <InputError message={errors.pajak_id} />
                                    </div>
                                    <Select
                                        name="jenis_pajak"
                                        onChange={(e) => handleJenis(e)}
                                    >
                                        {pajakNama.data?.map((e) => (
                                            <option hidden value={e.id}>
                                                {e.nama}
                                            </option>
                                        ))}
                                        {jenis.data?.map((e) => (
                                            <option value={e.id} key={e.id}>
                                                {e.nama}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="tanggal_awal"
                                            value="Tanggal Awal"
                                            className="text-xs"
                                        />
                                        <InputError
                                            message={errors.tanggal_awal}
                                        />
                                    </div>
                                    <TextInput
                                        name="tanggal_awal"
                                        type="date"
                                        value={data.tanggal_awal}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_awal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="kategori"
                                            value="Kategori Pajak"
                                            className="text-xs"
                                        />
                                        <InputError
                                            message={errors.kategori_pajak_id}
                                        />
                                    </div>
                                    <Select
                                        name="kategori"
                                        onChange={(e) => handleKategori(e)}
                                    >
                                        {kategoriNama.data?.map((e) => (
                                            <option
                                                value={e.id}
                                                key={e.id}
                                                hidden
                                            >
                                                {e.nama}
                                            </option>
                                        ))}
                                        {kategori.data?.map((e) => (
                                            <option key={e.id} value={e.id}>
                                                {e.nama}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="tanggal_akhir"
                                            value="Tanggal Akhir"
                                            className="text-xs"
                                        />
                                        <InputError
                                            message={errors.tanggal_akhir}
                                        />
                                    </div>
                                    <TextInput
                                        name="tanggal_akhir"
                                        type="date"
                                        value={data.tanggal_akhir}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_akhir",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label
                                            htmlFor="pendapatan"
                                            value="Jumlah Pendapatan"
                                            className="text-xs"
                                        />
                                    </div>
                                    <div className="relative rounded-md shadow-sm ">
                                        <div className="pointer-event-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                                            <span className="text-gray-500 sm:text-sm">
                                                Rp
                                            </span>
                                        </div>
                                        <CurrencyFormat
                                            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2 pl-8 pr-12"
                                            thousandSeparator={"."}
                                            decimalSeparator={","}
                                            name="pendapatan"
                                            value={data.jumlah_pendapatan}
                                            onChange={(e) =>
                                                handlePendapatan(e)
                                            }
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PrimaryButton className="" processing={processing}>
                            Simpan
                        </PrimaryButton>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
