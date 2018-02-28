<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call('UniversesTableSeeder');
         $this->call('GalaxiesTableSeeder');
         $this->call('PlanetsTableSeeder');
         $this->call('SpaceshipsTableSeeder');
         $this->call('UsersTableSeeder');
    }
}
