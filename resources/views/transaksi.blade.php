<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    .page-break {
        page-break-after: always;
    }
</style>

<body>
    <h1>Page 1</h1>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>NPWPD</th>
                <th>Nama</th>
                <th>Nama Usaha</th>
                <th>Jumlah Pendapatan</th>
                <th>Jumlah Pajak</th>
                <th>Jenis Pajak</th>
                <th>Tanggal Awal</th>
                <th>Tanggal Akhir</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data ?? '' as $data)
                <tr>
                    <th>{{ $data->id }}</th>
                    <td>{{ $data->user->npwpd }}</td>
                    <td>{{ $data->user->name }}</td>
                    <td>{{ $data->nama_usaha }}</td>
                    <td>{{ $data->jumlah_pendapatan }}</td>
                    <td>{{ $data->jumlah_pajak }}</td>
                    <td>{{ $data->pajak->nama }}</td>
                    <td>{{ $data->tanggal_awal }}</td>
                    <td>{{ $data->tanggal_akhir }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <p>Dibuat Tanggal : <span>{{ $data->created_at }}</span></p>
    <p>{{ $terbilang }}</p>
</body>

</html>
