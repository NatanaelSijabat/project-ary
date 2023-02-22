<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriPajak extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'pajak_id', 'nama', 'percent'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pajak()
    {
        return $this->belongsTo(Pajak::class);
    }
}
