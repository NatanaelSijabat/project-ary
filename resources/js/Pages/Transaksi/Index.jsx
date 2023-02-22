import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm } from "@inertiajs/react";
import Transaksi from "@/Components/Transaksi";
import Modal from "@/Components/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import CurrencyFormat from "react-currency-format";

export default function Index({ auth, transaksis, pajaks }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        pajak_id: pajaks.id,
        nama_usaha: "",
        jumlah_pendapatan: "",
        jumlah_pajak: "",
        tanggal_awal: "",
        tanggal_akhir: "",
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("transaksi.store"), {
            onSuccess: () => setOpen(false) + reset(),
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

            <div className="px-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* modal */}
                    <div className="flex justify-end m-2 p-2">
                        <button
                            onClick={() => setOpen(true)}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                    <Modal show={open}>
                        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"></div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2-xl font-bold text-gray-900 sm:pr-12">
                                        Form Pembayaran Pajak
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-2"
                                    >
                                        <form
                                            onSubmit={handleSubmit}
                                            encType="multipart/form-data"
                                            method="POST"
                                        >
                                            <InputLabel
                                                forInput="jenis_pajak"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Jenis Pajak
                                            </InputLabel>
                                            <InputError
                                                message={errors.pajak_id}
                                            />
                                            <Select
                                                name="jenis_pajak"
                                                onChange={(e) =>
                                                    setData(
                                                        "pajak_id",
                                                        e.target.value
                                                    )
                                                }
                                                pajaks={pajaks}
                                            />

                                            <InputLabel
                                                forInput="nama_usaha"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nama Usaha Anda
                                            </InputLabel>
                                            <InputError
                                                message={errors.nama_usaha}
                                            />
                                            <input
                                                name="nama_usaha"
                                                type="text"
                                                className="block mb-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={data.nama_usaha}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_usaha",
                                                        e.target.value
                                                    )
                                                }
                                                autoComplete="off"
                                            />
                                            <InputLabel
                                                forInput="jumlah_pendapatan"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Jumlah Pendapatan Anda
                                            </InputLabel>
                                            <InputError
                                                message={
                                                    errors.jumlah_pendapatan
                                                }
                                            />
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
                                                    value={
                                                        data.jumlah_pendapatan
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jumlah_pendapatan",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputLabel
                                                forInput="jumlah_pajak"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Jumlah Pajak Anda
                                            </InputLabel>
                                            <InputError
                                                message={errors.jumlah_pajak}
                                            />
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
                                                    value={data.jumlah_pajak}
                                                    onChange={(e) =>
                                                        setData(
                                                            "jumlah_pajak",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputLabel
                                                forInput="tanggal_awal"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tanggal Awal
                                            </InputLabel>
                                            <InputError
                                                message={errors.tanggal_awal}
                                            />
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
                                            <InputLabel
                                                forInput="tanggal_akhir"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tanggal Akhir
                                            </InputLabel>
                                            <InputError
                                                message={errors.tanggal_akhir}
                                            />
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

                                            <InputLabel
                                                forInput="file"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                File
                                            </InputLabel>
                                            <InputError message={errors.file} />
                                            <input
                                                name="file"
                                                type="file"
                                                className="block w-full sm:text-sm mb-2"
                                                onChange={(e) =>
                                                    setData(
                                                        "file",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            <PrimaryButton
                                                processing={processing}
                                            >
                                                Simpan
                                            </PrimaryButton>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        </div>
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
