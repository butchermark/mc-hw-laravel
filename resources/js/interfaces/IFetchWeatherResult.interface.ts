import { IWeatherData } from "./IWeatherData.interface";

export interface IFetchWeatherResult {
    weatherData: IWeatherData | null;
    loading: boolean;
    error: Error | null;
}
