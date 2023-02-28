<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pajak_id')->constrained()->cascadeOnDelete();
            $table->foreignId('kategori_pajak_id')->constrained()->cascadeOnDelete();
            $table->string('nama_usaha');
            $table->bigInteger('jumlah_pendapatan');
            $table->bigInteger('jumlah_pajak');
            $table->date('tanggal_awal');
            $table->date('tanggal_akhir');
            $table->string('file');
            $table->boolean('isCheck')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaksis');
    }
};
