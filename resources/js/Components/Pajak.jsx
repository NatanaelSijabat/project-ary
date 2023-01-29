import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

export default function Pajak({ pajak }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        kode: pajak.kode,
        nama: pajak.nama,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("pajak.update", pajak.id), {
            onSuccess: () => setEditing(false),
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
                    <td>{pajak.kode}</td>
                    <td>{pajak.nama}</td>
                    <td>
                        <button
                            onClick={() => setEditing(true)}
                            className=" w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                        >
                            edit
                        </button>
                        <Link
                            as="button"
                            href={route("pajak.destroy", pajak.id)}
                            method="delete"
                        >
                            Delete
                        </Link>
                    </td>
                </>
            )}
        </>
    );
}
