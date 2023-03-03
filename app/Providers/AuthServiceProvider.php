<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\KategoriPajak;
use App\Models\Transaksi;
use App\Policies\KategoriPolicy;
use App\Policies\TransaksiPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        KategoriPajak::class => KategoriPolicy::class,
        // Transaksi::class => TransaksiPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();


        //
    }
}
