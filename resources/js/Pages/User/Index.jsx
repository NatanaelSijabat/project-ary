import User from "@/Components/User";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    return (
        <Authenticated auth={props.auth}>
            <Head title="Users" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="relative overflow-x- auto shadow-md mt-3">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map((user, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <User key={user.id} user={user} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
}
