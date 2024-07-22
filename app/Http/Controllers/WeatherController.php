<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    
    public function getWeather(Request $request)
    {
        $client = new Client();
        $response = $client->get('https://api.open-meteo.com/v1/forecast', [
            'query' => [
                'latitude' => $request->query('latitude'),
                'longitude' => $request->query('longitude'),
                'daily' => 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
                'timezone' => 'auto'
            ]
        ]);
        
        return $response->getBody();
    }
}