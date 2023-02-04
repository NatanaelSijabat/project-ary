import Select from "@/Components/Select";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Create({ auth, pajaks }) {
    // const { data, setData, post, processing, reset, errors } = useForm({
    //     pajak_id: pajaks.id,
    //     nama_usaha: "",
    //     jumlah_pendapatan: "",
    //     jumlah_pajak: "",
    //     file: null,
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post(route("transaksi.store"), {
    //         onSuccess: () => reset(),
    //     });
    // };

    return (
        <UserLayout
            auth={auth}
            errors={auth.errors}
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Transaksi
                </h1>
            }
        >
            <Head title="Tambah Transaksi Pembayaran Pajak" />
            <div className="py-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex m-2 p-2">
                        <Link
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                            href="/transaksi"
                        >
                            Back
                        </Link>
                    </div>
                    <div className="flex">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <form
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data"
                                        method="POST"
                                    >
                                        <Select
                                            name="pajaks"
                                            onChange={(e) =>
                                                setData(
                                                    "pajak_id",
                                                    e.target.value
                                                )
                                            }
                                            pajaks={pajaks}
                                        />
                                        <InputError
                                            message={errors.pajak_id}
                                            className="mt-3"
                                        />
                                        <InputLabel
                                            forInput="nama_usaha"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nama Usaha Anda
                                        </InputLabel>
                                        <div className="relative mt-1 rounded-md shadow-sm">
                                            <input
                                                name="nama_usaha"
                                                type="text"
                                                value={data.nama_usaha}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_usaha",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="nama usaha anda"
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <InputError
                                                message={errors.nama_usaha}
                                            />
                                        </div>

                                        <InputLabel
                                            forInput="jumlah_pendapatan"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Jumlah Pendapatan
                                        </InputLabel>
                                        <div className="relative mt-1 rounded-md shadow-sm">
                                            <div className="pointer-event-none absolute inset-y-0 left-0 flex items-center pl-2">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Rp
                                                </span>
                                            </div>
                                            <input
                                                name="jumlah_pendapatan"
                                                type="number"
                                                value={data.jumlah_pendapatan}
                                                onChange={(e) =>
                                                    setData(
                                                        "jumlah_pendapatan",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <InputError
                                                message={
                                                    errors.jumlah_pendapatan
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <InputLabel
                                            forInput="jumlah_pajak"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Jumlah Pajak
                                        </InputLabel>
                                        <div className="relative mt-1 mb-4 rounded-md shadow-sm">
                                            <div className="pointer-event-none absolute inset-y-0 left-0 flex items-center pl-2">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Rp
                                                </span>
                                            </div>
                                            <input
                                                name="jumlah_pajak"
                                                type="number"
                                                value={data.jumlah_pajak}
                                                onChange={(e) =>
                                                    setData(
                                                        "jumlah_pajak",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <InputError
                                                message={errors.jumlah_pajak}
                                                className="mt-2"
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(e) =>
                                                setData(
                                                    "file",
                                                    e.target.files[0]
                                                )
                                            }
                                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm shadow-sm"
                                        />
                                        <InputError
                                            message={errors.file}
                                            className="mt-2"
                                        />
                                        <PrimaryButton
                                            processing={processing}
                                            className="mt-4"
                                        >
                                            Simpan
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
