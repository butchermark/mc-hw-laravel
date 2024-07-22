<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class CityController extends Controller
{
    public function searchCity(Request $request)
    {
        $client = new Client();
        $response = $client->get('https://geocoding-api.open-meteo.com/v1/search', [
            'query' => [
                'name' => $request->query('name')
            ]
        ]);

        return $response->getBody();
    }
}