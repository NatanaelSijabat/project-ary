<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransaksiResource extends JsonResource
{
    // public $status;
    // public $message;

    // public function __construct($status, $message, $resource)
    // {
    //     parent::__construct($resource);
    //     $this->status = $status;
    //     $this->message = $message;
    // }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'pajak_id' => $this->pajak_id,
            'kategori_pajak_id' => $this->kategori_pajak_id,
            'nama_usaha' => $this->nama_usaha,
            'jumlah_pendapatan' => $this->jumlah_pendapatan,
            'jumlah_pajak' => $this->jumlah_pajak,
            'tanggal_awal' => $this->tanggal_awal,
            'tanggal_akhir' => $this->tanggal_akhir,
            'file' => $this->file,
            'isCheck' => $this->isCheck,
        ];
    }
}
