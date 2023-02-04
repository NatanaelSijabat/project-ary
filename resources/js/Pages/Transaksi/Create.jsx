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
                    {/* <div className="flex">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    oke
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </UserLayout>
    );
}
