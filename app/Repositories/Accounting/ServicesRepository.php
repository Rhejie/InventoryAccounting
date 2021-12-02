<?php

namespace App\Repositories\Accounting;

use App\Models\Accounting\Services;
use App\Repositories\Repository;

class ServicesRepository extends Repository
{
    public function __construct(Services $model)
    {

        parent::__construct($model);

    }

    public function getServices($params)
    {

        $services = $this->model();

        if($params->search) {

            $services = $services->where(function($query) use ($params) {
                $query->where('name', 'LIKE', "%$params->search%");
            })->with(['unit', 'tax'])->orderBy('id', 'desc')->paginate($params->count, ['*'], 'page', $params->page);

            return $services;

        }

        $services = $services->with(['unit', 'tax'])->orderBy('id', 'desc')->paginate($params->count, ['*'], 'page', $params->page);
        return $services;
    }

    public function storeService($request)
    {

        $data = new $this->model();
        $data->name = $request->name;
        $data->service_fee = $request->service_fee;
        $data->tax_id = $request->tax_id;
        $data->category_id = $request->category_id;
        $data->unit_id = $request->unit_id;
        $data->type = $request->type;
        $data->description = $request->description;
        if($data->save()) {

            return $this->model()->with(['unit', 'tax'])->find($data->id);

        }
    }

    public function updateService($id, $request)
    {

        $data = $this->model()->find($id);
        $data->name = $request->name;
        $data->service_fee = $request->service_fee;
        $data->tax_id = $request->tax_id;
        $data->category_id = $request->category_id;
        $data->unit_id = $request->unit_id;
        $data->type = $request->type;
        $data->description = $request->description;
        if($data->save()) {

            return $this->model()->with(['unit', 'tax'])->find($id);

        }

    }

    public function deleteService($id)
    {

        $data = $this->model()->find($id);
        $data->delete();

    }
}
