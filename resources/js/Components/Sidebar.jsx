import { Sidebar } from "flowbite-react";
import React from "react";
import {
    HiChartPie,
    HiDatabase,
    HiUsers,
    HiShoppingCart,
} from "react-icons/hi";

const ExampleSidebar = () => {
    return (
        <div className="h-screen fixed top-0 left-0 z-40 w-64 pt-20 hidden md:flex border-r">
            <Sidebar>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href={route("adminDashboard")}
                            icon={HiChartPie}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={HiDatabase} label="Pajak">
                            <Sidebar.Item
                                href={route("pajak.index")}
                                icon={HiDatabase}
                            >
                                Jenis Pajak
                            </Sidebar.Item>
                            <Sidebar.Item
                                href={route("kategori.index")}
                                icon={HiDatabase}
                            >
                                Kategori Pajak
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item icon={HiUsers} href={route("user.index")}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={HiShoppingCart}
                            href={route("cek.index")}
                        >
                            Transaksi
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default ExampleSidebar;
