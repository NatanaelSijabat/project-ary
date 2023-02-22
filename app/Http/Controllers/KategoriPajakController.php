<?php

namespace App\Http\Controllers;

use App\Models\KategoriPajak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriPajakController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kategoris = KategoriPajak::with('pajak:id,nama')->latest()->paginate(6);
        // dd($kategoris);
        return Inertia::render('Kategori/Index', [
            'kategoris' => $kategoris
        ]);
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
        $validated = $request->validate([
            'pajak_id' => 'required',
            'nama' => 'required|string|max:255',
            'percent' => 'required|numeric|min:1|max:100'
        ]);

        $request->user()->kategoriPajak()->create($validated);

        return redirect(route('kategori.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function show(KategoriPajak $kategoriPajak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function edit(KategoriPajak $kategoriPajak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KategoriPajak $kategoriPajak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function destroy(KategoriPajak $kategoriPajak)
    {
        //
    }
}
