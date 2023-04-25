import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonOverview from "../components/Pokemon/PokemonOverview";
import { IStore } from "../store/store";
import useQuery from "../utils/useQuery";
import { motion } from "framer-motion";

const SearchContainer: React.FC = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const { pokemon, severity } = useSelector((state: IStore) => state.search);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        transition: {
          duration: 0.4,
        },
      }}
    >
      {pokemon && "name" in pokemon && query.get("pokemon") ? (
        <PokemonOverview
          pokemon={pokemon!}
          viewPokemon={() =>
            navigate("/react-pokemon-ui/pokemon/" + pokemon!.name)
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
    </motion.div>
  );
};
export default React.memo(SearchContainer);
