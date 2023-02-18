<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function generatePDF($id)
    {
        $data = Transaksi::with('user:id,name,npwpd', 'pajak:id,nama')->where('id', $id)->get();


        $pdf = FacadePdf::loadView('transaksi', ['data' => $data]);

        return $pdf->download('file.pdf');
    }
}
