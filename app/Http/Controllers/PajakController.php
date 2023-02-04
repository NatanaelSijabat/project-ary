<?php

namespace App\Http\Controllers;

use App\Models\Pajak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PajakController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Pajak/Index', [
            'pajaks' => Pajak::with('user:id,name')->latest()->get()
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
            'kode' => 'required|string|max:5',
            'nama' => 'required|string|max:255',
        ]);

        $request->user()->pajak()->create($validated);

        return redirect(route('pajak.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pajak  $pajak
     * @return \Illuminate\Http\Response
     */
    public function show(Pajak $pajak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pajak  $pajak
     * @return \Illuminate\Http\Response
     */
    public function edit(Pajak $pajak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pajak  $pajak
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pajak $pajak)
    {
        $this->authorize('update', $pajak);

        $validated = $request->validate([
            'kode' => 'required|string|max:5',
            'nama' => 'required|string|max:255',
        ]);

        $pajak->update($validated);

        return redirect(route('pajak.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pajak  $pajak
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pajak $pajak)
    {
        $this->authorize('delete', $pajak);

        $pajak->delete();

        return redirect(route('pajak.index'));
    }

    // public function addToCart($id)
    // {
    //     $pajak = Pajak::find($id);

    //     if (!$pajak) {
    //         abort(404);
    //     }

    //     $cart = session()->get('cart');

    //     if (!$cart) {
    //         $cart = [
    //             $id => [
    //                 "kode" => $pajak->kode,
    //                 "nama" => $pajak->nama,
    //             ]
    //         ];

    //         session()->put('cart', $cart);
    //         return redirect()->back()->with('success', 'Pajak added to Cart');
    //     }

    //     $cart[$id] = [
    //         "kode" => $pajak->kode,
    //         "nama" => $pajak->nama,
    //     ];

    //     session()->put('cart', $cart);

    //     return redirect()->back()->with('succes', "pajak added to cart");
    // }
}
