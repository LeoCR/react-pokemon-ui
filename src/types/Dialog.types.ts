export type DialogProps = {
  isOpen: boolean;
  setOpen: Function;
  pokemonName: string;
  message?: string;
  callback?: Function;
};
