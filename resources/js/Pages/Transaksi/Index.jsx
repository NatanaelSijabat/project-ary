import React, { useEffect, useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm } from "@inertiajs/react";
import Transaksi from "@/Components/Transaksi";
import InputError from "@/Components/InputError";
import CurrencyFormat from "react-currency-format";
import { Label, Modal, Select, Table, TextInput } from "flowbite-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, transaksis, pajaks, kategoris }) {
    const [open, setOpen] = useState(false);

    const [jenis, setJenis] = useState([]);
    const [jenisId, setJenisId] = useState("");
    const [kategori, setKategori] = useState([]);
    const [kategoriId, setKategoriId] = useState("");
    const [percent, setPercent] = useState("");

    const [totalPajak, setTotalPajak] = useState(0);
    const [pendapatan, setPendapatan] = useState(0);

    useEffect(() => {
        const getJenis = async () => {
            const res = await fetch("http://localhost:8000/api/pajak");
            const result = await res.json();
            setJenis(await result);
        };
        getJenis();
    }, []);

    useEffect(() => {
        const getKategoriByPajak = async () => {
            const res = await fetch(
                `http://localhost:8000/api/kategori/pajak/${jenisId}`
            );
            const get = await res.json();
            setKategori(await get);
        };
        getKategoriByPajak();
    }, [jenisId]);

    useEffect(() => {
        const getKategoriById = async () => {
            const res = await fetch(
                `http://localhost:8000/api/kategori/${kategoriId}`
            );
            const get = await res.json();
            setPercent(await get);
        };
        getKategoriById();
    }, [kategoriId]);

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

    const { data, setData, post, reset, errors, processing, cancel } = useForm({
        pajak_id: pajaks.id,
        kategori_pajak_id: kategoris.id,
        nama_usaha: "",
        jumlah_pendapatan: "",
        jumlah_pajak: "",
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const handlePendapatan = (e) => {
        const pendapatanValue = parseInt(e.target.value.replaceAll(".", ""));
        setPendapatan(pendapatanValue);
        setData("jumlah_pendapatan", pendapatanValue);
    };

    const calculate = (pendapatan) => {
        const persen = percent.data?.map((e) => e.percent);
        const total_pajak = (pendapatan * persen) / 100;
        return total_pajak;
    };

    useEffect(() => {
        const pajakValue = calculate(pendapatan);
        setTotalPajak(pajakValue);
        setData("jumlah_pajak", totalPajak);
    }, [totalPajak, pendapatan]);

    // const imageChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setSelectedImage(e.target.files[0]);
    //         setData("file", e.target.files[0]);
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("transaksi.store"), {
            onSuccess: () => {
                setOpen(false);
                reset();
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
                                cancel();
                                reset();
                            }}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                    {/* modal */}
                    <Modal
                        show={open}
                        size="5xl"
                        onClose={() => {
                            setOpen(false);
                        }}
                    >
                        <Modal.Header>Form Pembayaran Pajak</Modal.Header>
                        <Modal.Body>
                            <form
                                onSubmit={handleSubmit}
                                method="POST"
                                encType="multipart/form-data"
                            >
                                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
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
                                                htmlFor="jumlah_pajak"
                                                value="Jumlah Pajak"
                                            />
                                            <InputError
                                                message={errors.jumlah_pajak}
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
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2 pl-8 pr-12 cursor-not-allowed"
                                                thousandSeparator={"."}
                                                decimalSeparator={","}
                                                value={totalPajak}
                                                disabled={true}
                                                readOnly={true}
                                                allowNegative="false"
                                            />
                                        </div>
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
                                            name="jenis_pajak"
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
                                                <option key={d.id} value={d.id}>
                                                    {d.nama}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="block">
                                            <Label
                                                htmlFor="tanggal_awal"
                                                value="Tanggal Awal"
                                            />
                                            <InputError
                                                message={errors.tanggal_awal}
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
                                            onChange={(e) => handleKategori(e)}
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
                                                htmlFor="tanggal_akhir"
                                                value="Tanggal Akhir"
                                            />
                                            <InputError
                                                message={errors.tanggal_akhir}
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
                                                value={pendapatan}
                                                onChange={(e) =>
                                                    handlePendapatan(e)
                                                }
                                                autoComplete="off"
                                                allowNegative={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <PrimaryButton processing={processing}>
                                    Simpan
                                </PrimaryButton>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* end modal */}

                    <div className="flex flex-col w-100 h-100 relative overflow-hidden">
                        <div className="-my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <h2>Record Pembayaran Anda : </h2>
                                <br />
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg relative">
                                    <Table>
                                        <Table.Head className="bg-lime-300">
                                            <Table.HeadCell>No.</Table.HeadCell>
                                            <Table.HeadCell>
                                                Nama Usaha
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Jenis Pajak
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Kategori Pajak
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Jumlah Pendapatan
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Jumlah Pajak
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Tanggal Awal
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Tanggal Akhir
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Status
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Aksi
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {transaksis.map(
                                                (transaksi, index) => (
                                                    <>
                                                        {transaksi.user.id ===
                                                            auth.user.id && (
                                                            <Table.Row
                                                                key={
                                                                    transaksi.id
                                                                }
                                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                            >
                                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                    {index + 1}
                                                                </Table.Cell>
                                                                <Transaksi
                                                                    transaksi={
                                                                        transaksi
                                                                    }
                                                                />
                                                            </Table.Row>
                                                        )}
                                                    </>
                                                )
                                            )}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
