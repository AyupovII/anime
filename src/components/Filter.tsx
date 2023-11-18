import { useEffect } from "react";
import { fetchGenres, fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import styled from "styled-components";

const BlockFilters = styled.div`
  display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(7, 1fr);
grid-column-gap: 5px;
grid-row-gap: 5px;
padding: 15px 15px;
@media (max-width: 1500px) {
  grid-template-columns: repeat(6, 1fr);
};
@media (max-width: 1300px) {
  grid-template-columns: repeat(5, 1fr);
};
@media (max-width: 1070px) {
  grid-template-columns: repeat(4, 1fr);
};
@media (max-width: 890px) {
  grid-template-columns: repeat(3, 1fr);
};
@media (max-width: 680px) {
  grid-template-columns: repeat(2, 1fr);
};
@media (max-width: 460px) {
  grid-template-columns: repeat(1, 1fr);
};
`
const BlockFilter = styled.div`
width: 200px;
gap: 12px;
`

const Filter = () => {
  const dispatch = useDispatch();
  const genresList = useSelector((state: any) => state.todos.genresList);
  const params = useSelector((state: any) => state.todos.params);
  const { genre: genreState } = params;
  const onCheckedHandler = (genre: any) => {
    const indexPosition = genreState.findIndex((el: any) => el === genre.id);
    dispatch(setIsAccumlateData(false));
    if (indexPosition < 0) {
      dispatch(setParams({ genre: [...genreState, genre.id] }))
    } else
      dispatch(setParams({ genre: [...genreState.filter((el: any) => el !== genre.id)] }));
  }
  useEffect(() => {
    dispatch(fetchGenres() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    dispatch(fetchTodos({ ...params, genre: params.genre?.join(",") }) as unknown as AnyAction);
  }, [genreState]);

  return (
    <BlockFilters>
      {genresList.map((genre: any) => {
        return <BlockFilter>
          <label>
            <input type="checkbox" onChange={() => onCheckedHandler(genre)} checked={genreState.find((el: any) => el === genre.id)} />
            {genre.russian}
          </label></BlockFilter>
      })}
    </BlockFilters>
  )
}

export default Filter;