import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import PokemonOverview from "../components/Pokemon/PokemonOverview";
import { IStore } from "../store/store";
import useQuery from "../utils/useQuery";
import { SearchContainerProps } from "../interfaces/Search.interface";

const SearchContainer = (props: SearchContainerProps) => {
  let query = useQuery();
  const { pokemon, severity } = useSelector((state: IStore) => state.search);
  return (
    <React.Fragment>
      <div>
        {pokemon && "name" in pokemon && query.get("pokemon") ? (
          <PokemonOverview
            pokemon={pokemon!}
            viewPokemon={() =>
              props.history.push("/react-pokemon-ui/pokemon/" + pokemon!.name)
            }
          />
        ) : severity === "error" ? (
          <p
            style={{
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "60px",
            }}
          >
            The pokemon that you are looking doesn't exits
          </p>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};
export default withRouter(React.memo(SearchContainer));
