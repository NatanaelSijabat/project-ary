<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;


class CheckTransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('transaksis')
            ->join('users', 'user_id', '=', 'users.id')
            ->join('pajaks', 'pajak_id', '=', 'pajaks.id')
            ->join('kategori_pajaks', 'kategori_pajak_id', '=', 'kategori_pajaks.id')
            ->select('transaksis.*', 'users.npwpd', 'users.name', 'pajaks.nama as jenis_nama', 'kategori_pajaks.nama as kategori_nama')
            ->get();

        // return response()->json($data);
        return Inertia::render('CekTransaksi/Index', [
            'transaksis' => $data
        ]);
        // 'transaksis' => Transaksi::with('user:id,name', 'pajak:id,nama', 'kategori_pajak:id,nama')->latest()->get()
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaksi $transaksi, $id)
    {
        // dd($transaksi::where('id', $id));
        $transaksi::where('id', $id)->update(['isCheck' => 1]);

        return redirect(route('cek.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
