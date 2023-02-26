<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;

class TransaksiController extends BaseController
{
    public function index()
    {
        $transaksi = Transaksi::all();
        return $this->sendResponse(TransaksiResource::collection($transaksi), 'Transaksi retrieved successfully.');
    }

    public function show($user_id)
    {
        // $npwpd = Transaksi::with('user:id,')
        $data = Transaksi::where('user_id', $user_id)->get();

        return $this->sendResponse(TransaksiResource::collection($data), 'Data Transaksi');
    }

    // public function search($npwpd)
    // {
    //     $search = Transaksi::with('user:id,npwpd')->where('user:id,npwpd', $npwpd)->get();

    //     return $this->sendResponse(TransaksiResource::collection($search), 'Data Kategori');
    // }
}
