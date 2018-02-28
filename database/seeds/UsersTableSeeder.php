<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'nickname' => 'Dev',
                'login' => 'dev',
                'password' => app('hash')->make('dev123')
            ]);

        DB::table('users')->insert(
            [
                'nickname' => 'AAA',
                'login' => 'aaa',
                'password' => app('hash')->make('dev123')
            ]);

        DB::table('users')->insert(
            [
                'nickname' => 'BBB',
                'login' => 'bbb',
                'password' => app('hash')->make('dev123')
            ]);

        DB::table('users')->insert(
            [
                'nickname' => 'CCC',
                'login' => 'ccc',
                'password' => app('hash')->make('dev123')
            ]);
    }
}
