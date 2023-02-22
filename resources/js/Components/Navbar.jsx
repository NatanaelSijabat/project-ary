import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "@inertiajs/react";

const ExampleNavbar = ({ auth, npwpd }) => {
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="border-b fixed top-0 w-full z-50"
        >
            <Navbar.Brand>
                <Link href="adminDashboard">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 " />
                </Link>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white p-3">
                    Flowbite
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2 pt-4">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{auth}</span>
                        <span className="block text-sm font-bold">{npwpd}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <Link href={route("profile.edit")}>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link href={route("logout")} method="POST" as="button">
                            Logout
                        </Link>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </Navbar>
    );
};

export default ExampleNavbar;
