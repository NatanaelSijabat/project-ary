<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaksi extends Model
{
    use HasFactory;

    // protected $id = 'slug';

    protected $fillable = [
        'pajak_id', 'nama_usaha', 'jumlah_pendapatan', 'jumlah_pajak', 'tanggal_awal', 'tanggal_akhir', 'file', 'isCheck'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('storage/images/' . $value),
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pajak(): BelongsTo
    {
        return $this->belongsTo(Pajak::class);
    }
}
