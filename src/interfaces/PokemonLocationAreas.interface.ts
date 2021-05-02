import { Pokemon } from "./Pokemon.interface";

export interface ConditionValues {
  [index: number]: Pokemon;
  chance?: number;
}
export interface EncounterDetails {
  min_level?: number;
  max_level?: number;
  condition_values?: ConditionValues[];
  method?: Pokemon;
}
export interface VersionDetails {
  max_chance?: number;
  encounter_details?: EncounterDetails[];
  version?: Pokemon;
}
export interface PokemonLocationAreasResponse {
  location_area?: Pokemon;
  version_details?: VersionDetails[];
}
export interface PokemonAreasProps {
  pokemonAreas: PokemonLocationAreasResponse[];
  value: number;
  isLoading: boolean;
}
