import React from "react";
import AuthenticateLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Pajak from "@/Components/Pajak";

export default function Index({ auth, pajaks }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama: "",
        kode: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(
            route("pajak.store", {
                onSuccess: () => reset(),
            })
        );
    };

    return (
        <AuthenticateLayout auth={auth}>
            <Head title="Kategori Pajak" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={data.kode}
                        placeholder="Kode pajak"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm shadow-sm"
                        onChange={(e) => setData("kode", e.target.value)}
                    />
                    <InputError message={errors.kode} className="mt-2" />
                    <input
                        type="text"
                        value={data.nama}
                        placeholder="nama pajak"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm shadow-sm"
                        onChange={(e) => setData("nama", e.target.value)}
                    />
                    <InputError message={errors.nama} className="mt-2" />
                    <PrimaryButton processing={processing} className="mt-4">
                        Simpan
                    </PrimaryButton>
                </form>

                <div className="relative overflow-x-auto shadow-md mt-3">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th>No</th>
                                <th>Kode</th>
                                <th>Nama</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pajaks.map((pajak, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <Pajak key={pajak.id} pajak={pajak} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticateLayout>
    );
}
