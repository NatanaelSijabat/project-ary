<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'pajak_id', 'nama_usaha', 'jumlah_pendapatan', 'jumlah_pajak', 'tanggal_awal', 'tanggal_akhir', 'file', 'isCheck'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('uploads/' . $value),
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pajak()
    {
        return $this->belongsTo(Pajak::class);
    }
}
