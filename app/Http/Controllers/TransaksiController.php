<?php

namespace App\Http\Controllers;

use App\Models\KategoriPajak;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pajak;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transaksis  = Transaksi::with('user:id,name', 'pajak:id,nama', 'kategori_pajak:id,nama')->latest()->get();
        $pajaks = Pajak::all();
        $kategoris = KategoriPajak::all();

        return Inertia::render(
            'Transaksi/Index',
            ['transaksis' => $transaksis, 'kategoris' => $kategoris, 'pajaks' => $pajaks]
        );
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
            'kategori_pajak_id' => ['required'],
            'nama_usaha' => ['required'],
            'jumlah_pendapatan' => ['required'],
            'jumlah_pajak' => ['required'],
            'tanggal_awal' => ['required'],
            'tanggal_akhir' => ['required'],
        ])->validate();

        // $fileName = time() . '.' . $request->file->extension();
        // $request->file->move(public_path('storage/images'), $fileName);

        $validated = ([
            'pajak_id' => $request->pajak_id,
            'kategori_pajak_id' => $request->kategori_pajak_id,
            'nama_usaha' => $request->nama_usaha,
            'jumlah_pendapatan' => $request->jumlah_pendapatan,
            'jumlah_pajak' => $request->jumlah_pajak,
            'tanggal_awal' => $request->tanggal_awal,
            'tanggal_akhir' => $request->tanggal_akhir,
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
    public function update(Request $request, Transaksi $transaksi): RedirectResponse
    {
        $this->authorize('update', $transaksi);

        $validated = $request->validate([
            'pajak_id' => 'required',
            'kategori_pajak_id' => 'required',
            'nama_usaha' => 'required|string',
            'jumlah_pendapatan' => 'required',
            'jumlah_pajak' => 'required',
            'tanggal_awal' => 'required',
            'tanggal_akhir' => 'required',
        ]);

        // dd($validated);

        $transaksi->update($validated);

        return redirect(route('transaksi.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaksi $transaksi): RedirectResponse
    {
        $imagePath = public_path() . './storage/images/' . $transaksi->file;

        if ($imagePath > 0) {
            unlink($imagePath);
            $this->authorize('delete', $transaksi);
            $transaksi->delete();
        }


        return redirect(route('transaksi.index'));
    }

    public function uploadFile(Request $request, Transaksi $transaksi): RedirectResponse
    {
        Validator::make($request->all(), [
            'file' => 'required'
        ])->validate();

        $fileName = time() . '.' . $request->file->extension();
        $request->file->move(public_path('storage/images'), $fileName);

        $validated =  ([
            'file' => $fileName
        ]);

        // $transaksi->update($validated);
        $request->user()->transaksi()->update($validated);

        return redirect(route('transaksi.index'));
    }
}
