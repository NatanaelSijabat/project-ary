<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pajak;
use Illuminate\Support\Facades\Validator;


class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Transaksi/Index', [
            'transaksis' => Transaksi::with('user:id,name', 'pajak:id,nama')->latest()->get(),
            'pajaks' => Pajak::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'pajak_id' => ['required'],
            'nama_usaha' => ['required'],
            'jumlah_pendapatan' => ['required'],
            'jumlah_pajak' => ['required'],
            'tanggal_awal' => ['required'],
            'tanggal_akhir' => ['required'],
            'file' => ['required'],
        ])->validate();

        $fileName = time() . '.' . $request->file->extension();
        $request->file->move(public_path('uploads'), $fileName);

        $validated = ([
            'pajak_id' => $request->pajak_id,
            'nama_usaha' => $request->nama_usaha,
            'jumlah_pendapatan' => $request->jumlah_pendapatan,
            'jumlah_pajak' => $request->jumlah_pajak,
            'tanggal_awal' => $request->tanggal_awal,
            'tanggal_akhir' => $request->tanggal_akhir,
            'file' => $fileName
        ]);

        $request->user()->transaksi()->create($validated);

        return redirect(route('transaksi.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function show(Transaksi $transaksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaksi $transaksi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaksi $transaksi)
    {
        //
    }
}
