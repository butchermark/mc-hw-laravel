import { ICity } from "../interfaces/ICity.interface";

export interface IFetchCitiesResult {
    cities: ICity[];
    loading: boolean;
    error: string | null;
}
