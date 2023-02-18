import React from "react";
import moment from "moment/moment";

export default function Transaksi({ transaksi }) {
    const status = (result) => {
        if (transaksi.isCheck === 0) {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200">
                    Menunggu Konfirmasi
                </span>
            );
        } else {
            result = (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200">
                    Sudah Di Bayar
                </span>
            );
        }
        return result;
    };

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
            <td className="px-1 py-1 whitespace-nowrap">
                <img src={`storage/images/${transaksi.file}`} />
            </td>
            <td className="px-6 py-6 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {status()}
                </span>
            </td>
            <td>
                <a href={"transaksi/pdf/" + transaksi.id}>Download</a>
            </td>
        </>
    );
}
