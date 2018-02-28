<?php

use Illuminate\Database\Seeder;

class SpaceshipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('spaceships')->insert(
            [
                'name' => 'Viper',
                'velocity' => '10',
                'acceleration' => '2.5',
                'weight' => '10',
                'size' => '10'
            ]);

        DB::table('spaceships')->insert(
            [
                'name' => 'Viper-RX',
                'velocity' => '25',
                'acceleration' => '3.8',
                'weight' => '8',
                'size' => '5'
            ]);
    }
}
