import React from "react";
import moment from "moment/moment";

export default function Transaksi({ transaksi }) {
    return (
        <>
            <td className="px-6 py-6 whitespace-nowrap">
                {transaksi.pajak.nama}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                {transaksi.nama_usaha}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                {transaksi.jumlah_pendapatan}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                {transaksi.jumlah_pajak}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_awal).format("D MMMM YYYY")}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                {moment(transaksi.tanggal_akhir).format("D MMMM YYYY")}
            </td>
            <td className="px-6 py-6 whitespace-nowrap">{transaksi.file}</td>
            <td className="px-6 py-6 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100">
                    {transaksi.isCheck}
                </span>
            </td>
        </>
    );
}
