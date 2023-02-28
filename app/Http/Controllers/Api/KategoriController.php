<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\KategoriResource;
use App\Models\KategoriPajak;

class KategoriController extends BaseController
{
    public function index()
    {
        $kategori = KategoriPajak::all();
        // dd($kategori);
        return $this->sendResponse(KategoriResource::collection($kategori), 'Data Kategori');
    }

    public function show($id)
    {
        $kategori = KategoriPajak::where('id', $id)->get();

        return $this->sendResponse(KategoriResource::collection($kategori), 'Data Kategori By Id');
    }

    public function pajak($pajak_id)
    {
        $kategori = KategoriPajak::where('pajak_id', $pajak_id)->get();

        return $this->sendResponse(KategoriResource::collection($kategori), 'Data Kategori By Pajak');
    }
}
