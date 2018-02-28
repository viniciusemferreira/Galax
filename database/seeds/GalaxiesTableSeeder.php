<?php

use Illuminate\Database\Seeder;

class GalaxiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('galaxies')->insert(
            [
                'name' => 'Via Lactea'
            ]);

        DB::table('galaxies')->insert(
            [
                'name' => 'Andromeda'
            ]);

        DB::table('galaxies')->insert(
            [
                'name' => 'LBSH-1975'
            ]);

        DB::table('galaxies')->insert(
            [
                'name' => 'ZMVT-58'
            ]);
    }
}
