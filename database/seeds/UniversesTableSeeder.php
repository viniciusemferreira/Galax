<?php

use Illuminate\Database\Seeder;

class UniversesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('universes')->insert(
            [
                'name' => 'Universe 1'
            ]);
    }
}
