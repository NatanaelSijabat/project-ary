<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Faker\Core\Number;
use Illuminate\Http\Request;
use Riskihajar\Terbilang\Facades\Terbilang;

class PdfController extends Controller
{
    public function generatePDF($id)
    {
        $data = Transaksi::with('user:id,name,npwpd', 'pajak:id,nama')->where('id', $id)->get();

        // $p = ($data->pluck('jumlah_pajak'));
        $p = $data[0]->jumlah_pajak;

        // $p = intval($pajak->jumla);
        // $terbilangPajak = int($p);
        // dd(gettype($p));

        $terbilang  = Terbilang::make($p);

        $pdf = FacadePdf::loadView('transaksi', ['data' => $data, 'terbilang' => $terbilang]);

        return $pdf->download('file.pdf');
    }

    public function generatePDFAdmin($id)
    {
        $data = Transaksi::with('user:id,name,npwpd', 'pajak:id,nama')->where('id', $id)->get();


        $pdf = FacadePdf::loadView('transaksiAdmin', ['data' => $data]);

        return $pdf->download('file.pdf');
    }
}
