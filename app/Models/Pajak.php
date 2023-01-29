<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pajak extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama', 'kode'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
