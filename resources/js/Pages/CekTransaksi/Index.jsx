import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CekTransaksi from "@/Components/CekTransaksi";

export default function Index({ auth, transaksis }) {
    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Transaksi
                </h2>
            }
        >
            <Head title="Periksa Transaksi" />

            <br />

            <div className="px-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Nama User
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
                                                    Jenis Pajak
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
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 border-b">
                                            {transaksis.map(
                                                (transaksi, index) => (
                                                    <tr key={index}>
                                                        <td
                                                            className="px-6 py-6 whitespace-nowrap"
                                                            scope="row"
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <CekTransaksi
                                                            transaksi={
                                                                transaksi
                                                            }
                                                        />
                                                    </tr>
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
        </Authenticated>
    );
}
