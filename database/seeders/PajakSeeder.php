<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PajakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pajaks = [
            [
                'user_id' => 1,
                'kode' => 'K001',
                'nama' => 'Restoran',
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'kode' => 'K002',
                'nama' => 'Perumahan',
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'kode' => 'K003',
                'nama' => 'Hiburan',
                'created_at' => Carbon::now(),
            ]
        ];

        DB::table('pajaks')->delete();
        DB::table('pajaks')->insert($pajaks);
    }
}
