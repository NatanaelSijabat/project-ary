import { Head } from "@inertiajs/react";
import React from "react";
import UserLayout from "@/Layouts/UserLayout";

export default function UserDashboard(props) {
    return (
        <UserLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User Dashboard
                </h2>
            }
        >
            <Head title="User Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Welcome Back {props.auth.user.name}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
