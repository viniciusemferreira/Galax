<?php

use Illuminate\Database\Seeder;

class PlanetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('planets')->insert(
            [
                'name' => 'Earth'
            ]);

        DB::table('planets')->insert(
            [
                'name' => 'Mars'
            ]);

        DB::table('planets')->insert(
            [
                'name' => 'AX-39'
            ]);

        DB::table('planets')->insert(
            [
                'name' => 'JBD-18'
            ]);
    }
}
