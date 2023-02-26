<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class TransaksiController extends BaseController
{
    public function index()
    {
        $data = DB::table('transaksis')
            ->join('users', function (JoinClause $join) {
                $join->on('transaksis.user_id', '=', 'users.id');
            })->get();

        return response()->json($data);
    }

    public function show($npwpd)
    {
        $data = DB::table('transaksis')
            ->join('users', function (JoinClause $join) {
                $join->on('transaksis.user_id', '=', 'users.id');
            })->where('npwpd', $npwpd)->get();

        return response()->json(['transaksi' => $data]);
    }
}
