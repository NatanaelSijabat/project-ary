<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KategoriPajakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kategori = [
            [
                'user_id' => 1,
                'pajak_id' => 1,
                'nama' => 'caffe',
                'percent' => 10,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 1,
                'nama' => 'warkop',
                'percent' => 20,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 1,
                'nama' => 'warkop 1',
                'percent' => 30,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 2,
                'nama' => 'Cluster',
                'percent' => 22,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 2,
                'nama' => 'Mega Sedayu',
                'percent' => 23,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 2,
                'nama' => 'Mega Tron',
                'percent' => 24,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 3,
                'nama' => 'Bingo',
                'percent' => 30,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 3,
                'nama' => 'Melonte',
                'percent' => 50,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'pajak_id' => 3,
                'nama' => 'Pp',
                'percent' => 45,
                'created_at' => Carbon::now(),
            ]
        ];

        DB::table('kategori_pajaks')->delete();
        DB::table('kategori_pajaks')->insert($kategori);
    }
}
