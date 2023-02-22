<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Admin',
                'role' => 'admin',
                'npwpd' => '123456789A',
                'password' => Hash::make('admin12345'),
                'created_at' => Carbon::now(),
            ],
            [
                'name' => 'User 1',
                'role' => 'user',
                'npwpd' => '123456789B',
                'password' => Hash::make('user12345'),
                'created_at' => Carbon::now(),
            ],
            [
                'name' => 'User 2',
                'role' => 'user',
                'npwpd' => '123456789C',
                'password' => Hash::make('user123456'),
                'created_at' => Carbon::now(),
            ]
        ];

        DB::table('users')->delete();
        DB::table('users')->insert($users);
    }
}
