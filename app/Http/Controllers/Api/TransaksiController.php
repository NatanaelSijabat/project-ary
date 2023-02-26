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
        $data = Transaksi::where('user_id', $user_id)->get();

        if (is_null($data)) {
            return $this->sendError("Data Not Found");
        }
        return new TransaksiResource(true, "list Transaksi", $data);
    }
}
