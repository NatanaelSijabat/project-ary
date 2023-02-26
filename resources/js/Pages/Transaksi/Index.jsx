import React, { useEffect, useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm } from "@inertiajs/react";
import Transaksi from "@/Components/Transaksi";
import InputError from "@/Components/InputError";
import CurrencyFormat from "react-currency-format";
import { FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, transaksis, pajaks, kategoris }) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    const [jenis, setJenis] = useState([]);
    const [jenisId, setJenisId] = useState("");
    const [kategori, setKategori] = useState([]);
    const [kategoriId, setKategoriId] = useState("");
    // const [percent, setPercent] = useState();

    useEffect(() => {
        const getJenis = async () => {
            const res = await fetch("http://localhost:8000/api/pajak");
            const result = await res.json();
            setJenis(await result);
        };
        getJenis();
    }, []);

    const handleJenis = (e) => {
        const getJenisId = e.target.value;
        setJenisId(getJenisId);
        setData("pajak_id", getJenisId);
    };

    useEffect(() => {
        const getKategori = async () => {
            const res = await fetch(
                `http://localhost:8000/api/kategori/${jenisId}`
            );
            const get = await res.json();
            setKategori(await get);
        };
        getKategori();
    }, [jenisId]);

    const handleKategori = (e) => {
        const getKategoriId = e.target.value;
        setKategoriId(getKategoriId);
        setData("kategori_pajak_id", getKategoriId);
    };

    const { data, setData, post, reset, errors, processing } = useForm({
        pajak_id: pajaks.id,
        kategori_pajak_id: kategoris.id,
        nama_usaha: "",
        jumlah_pendapatan: "",
        jumlah_pajak: "",
        tanggal_awal: "",
        tanggal_akhir: "",
        file: null,
    });

    const d = parseInt(data.jumlah_pendapatan.replaceAll(".", ""));
    const total_pajak = d / 10;

    const handleTotalPajak = () => {
        setData("jumlah_pajak", total_pajak);
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setData("file", e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("transaksi.store"), {
            onSuccess: () => {
                setOpen(false);
                reset(
                    "pajak_id",
                    "kategori_pajak_id",
                    "nama_usaha",
                    "jumlah_pendapatan",
                    "jumlah_pajak",
                    "tanggal_awal",
                    "tanggal_akhir",
                    "file"
                );
            },
        });
    };

    return (
        <UserLayout
            auth={auth}
            errors={auth.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Transaksi Pajak Anda
                </h2>
            }
        >
            <Head title="Bangga Bayar Pajak 🗿" />

            <h1 className="text-center ">AYO BAYAR PAJAK ANDA 🗿</h1>

            <div className="w-full ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end m-2 p-2">
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                    {/* modal */}
                    <Modal
                        show={open}
                        size="7xl"
                        popup={true}
                        onClose={() => setOpen(false)}
                        className="overflow-hidden"
                    >
                        <Modal.Header>Form Pembayaran Pajak</Modal.Header>
                        <Modal.Body>
                            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                {selectedImage && (
                                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                        <img
                                            alt="image"
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            width={100}
                                        />
                                    </div>
                                )}
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <form
                                        onSubmit={handleSubmit}
                                        method="POST"
                                        encType="multipart/form-data"
                                    >
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="nama_usaha"
                                                    value="Nama Usaha"
                                                />
                                                <InputError
                                                    message={errors.nama_usaha}
                                                    className="text-xs"
                                                />
                                            </div>
                                            <TextInput
                                                id="nama_usaha"
                                                type="text"
                                                value={data.nama_usaha}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_usaha",
                                                        e.target.value
                                                    )
                                                }
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="jenis_pajak"
                                                    value="Jenis Pajak"
                                                />
                                                <InputError
                                                    message={errors.pajak_id}
                                                    className="text-xs"
                                                />
                                            </div>
                                            <Select
                                                name="jenis"
                                                onChange={(e) => handleJenis(e)}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                    hidden
                                                >
                                                    -- Jenis Pajak --
                                                </option>
                                                {jenis.data?.map((d) => (
                                                    <option
                                                        key={d.id}
                                                        value={d.id}
                                                    >
                                                        {d.nama}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="kategori_pajak_id"
                                                    value="Kategori Pajak"
                                                />
                                                <InputError
                                                    message={
                                                        errors.kategori_pajak_id
                                                    }
                                                    className="text-xs"
                                                />
                                            </div>
                                            <Select
                                                name="kategori"
                                                onChange={(e) =>
                                                    handleKategori(e)
                                                }
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                    hidden
                                                >
                                                    -- Kategori Pajak --
                                                </option>
                                                {jenisId ? (
                                                    kategori.data?.map((k) => (
                                                        <option
                                                            key={k.id}
                                                            value={k.id}
                                                        >
                                                            {k.nama}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>
                                                        No Data Kategori
                                                    </option>
                                                )}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="jumlah_pendapatan"
                                                    value="Jumlah Pendapatan"
                                                />
                                                <InputError
                                                    message={
                                                        errors.jumlah_pendapatan
                                                    }
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
                                                    name="jumlah_pendapatan"
                                                    value={
                                                        data.jumlah_pendapatan
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jumlah_pendapatan",
                                                            e.target.value
                                                        )
                                                    }
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="jumlah_pajak"
                                                    value="Jumlah Pajak"
                                                />
                                                <InputError
                                                    message={
                                                        errors.jumlah_pajak
                                                    }
                                                    className="text-xs"
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
                                                            thousandSeparator={
                                                                "."
                                                            }
                                                            decimalSeparator={
                                                                ","
                                                            }
                                                            value={
                                                                data.jumlah_pajak
                                                            }
                                                            onChange={(e) =>
                                                                handleTotalPajak(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="block">
                                                <Label
                                                    htmlFor="tanggal_awal"
                                                    value="Tanggal Awal"
                                                />
                                                <InputError
                                                    message={
                                                        errors.tanggal_awal
                                                    }
                                                />
                                            </div>
                                            <input
                                                name="tanggal_awal"
                                                type="date"
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2"
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
                                                    htmlFor="tanggal_akhir"
                                                    value="Tanggal Akhir"
                                                />
                                                <InputError
                                                    message={
                                                        errors.tanggal_akhir
                                                    }
                                                />
                                            </div>
                                            <input
                                                name="tanggal_akhir"
                                                type="date"
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2"
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
                                                    htmlFor="file"
                                                    value="Upload File"
                                                />
                                                <InputError
                                                    message={errors.file}
                                                />
                                            </div>
                                            <input
                                                name="file"
                                                type="file"
                                                accept="image/*"
                                                className="block w-full sm:text-sm mb-2"
                                                onChange={(e) => imageChange(e)}
                                            />
                                            {/* <FileInput
                                                name="file"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => imageChange(e)}
                                            /> */}
                                        </div>
                                        <PrimaryButton processing={processing}>
                                            Simpan
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* end modal */}

                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <h2>Record Pembayaran Anda : </h2>
                                <br />
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Jenis Pajak
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Nama Usaha
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Jumlah Pendapatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Jumlah Pajak
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Tanggal Awal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Tanggal Akhir
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transaksis.map(
                                                (transaksi, index) => (
                                                    <>
                                                        {transaksi.user.id ===
                                                            auth.user.id && (
                                                            <tr
                                                                key={
                                                                    transaksi.id
                                                                }
                                                            >
                                                                <td className="px-6 py-6">
                                                                    {index + 1}
                                                                </td>
                                                                <Transaksi
                                                                    transaksi={
                                                                        transaksi
                                                                    }
                                                                />
                                                            </tr>
                                                        )}
                                                    </>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
