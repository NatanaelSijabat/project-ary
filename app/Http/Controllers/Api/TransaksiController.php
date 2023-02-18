<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $transaksi = Transaksi::all();

        return new TransaksiResource(true, 'List Transaksi', $transaksi);
    }

    public function show($user_id)
    {
        $data = Transaksi::where('user_id', $user_id)->get();
        return new TransaksiResource(true, "list Transaksi", $data);
    }
}
