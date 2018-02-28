<?php
/**
 * Created by PhpStorm.
 * User: vinicius
 * Date: 28/02/18
 * Time: 09:48
 */

namespace App\Domain\Repository;


class UniverseRepository extends RepositoryAbstract
{
    public function __construct()
    {
        parent::__construct(new Universe());
    }
}