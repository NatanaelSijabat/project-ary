import { Table } from "flowbite-react";

export default function KategoriPajak({ kategori }) {
    return (
        <>
            <Table.Cell>{kategori.pajak.nama}</Table.Cell>
            <Table.Cell>{kategori.nama}</Table.Cell>
            <Table.Cell>{kategori.percent} %</Table.Cell>
            <Table.Cell>
                <button>delete</button>
                <button>edit</button>
            </Table.Cell>
        </>
    );
}
