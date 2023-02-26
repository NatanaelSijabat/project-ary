<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\PajakResource;
use App\Models\Pajak;
use Illuminate\Http\Request;

class PajakController extends BaseController
{
    public function index()
    {
        $pajak = Pajak::all();

        return $this->sendResponse(PajakResource::collection($pajak), 'Data Pajak');
    }
}
