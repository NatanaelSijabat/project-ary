<?php

namespace App\Http\Controllers;

use App\Models\KategoriPajak;
use App\Models\Pajak;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KategoriPajakController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $kategoris = KategoriPajak::with('pajak:id,nama')->latest()->paginate(6);
        $pajaks = Pajak::all();
        return Inertia::render('Kategori/Index', [
            'kategoris' => $kategoris,
            'pajaks' => $pajaks
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
    public function store(Request $request): RedirectResponse
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
    public function show(KategoriPajak $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function edit(KategoriPajak $kategori)
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
    public function update(Request $request, KategoriPajak $kategori): RedirectResponse
    {
        // dd($kategori->id);
        $this->authorize('update', $kategori);

        $validated = $request->validate([
            'pajak_id' => 'required',
            'nama' => 'required|string|max:255',
            'percent' => 'required|numeric|min:1|max:100'
        ]);

        $kategori->update($validated);

        return redirect(route("kategori.index"));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KategoriPajak  $kategoriPajak
     * @return \Illuminate\Http\Response
     */
    public function destroy(KategoriPajak $kategori): RedirectResponse
    {
        $this->authorize('delete', $kategori);

        $kategori->delete();

        return redirect(route('kategori.index'));
    }
}
