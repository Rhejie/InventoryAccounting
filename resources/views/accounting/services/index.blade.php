@extends('_layouts.accounting.default')

@section('content')

<div class="card card-custom mr-2 ml-2">
    <div class="card-header">
        <div class="card-title">
            <div class="card-label">
                <h3>Services</h3>
            </div>
        </div>
    </div>
    <div class="card-body">
        <service-index></service-index>
    </div>
</div>

@endsection

