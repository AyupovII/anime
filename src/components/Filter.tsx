import { useEffect } from "react";
import { fetchGenres, fetchTodos, setParams } from "../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import styled from "styled-components";

const BlockFilters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`
const BlockFilter = styled.div`
width: 200px;
gap: 12px;
`

const Filter = () => {
  const dispatch = useDispatch();
  const genresList = useSelector((state: any) => state.todos.genresList);
  const params  = useSelector((state: any) => state.todos.params);
  const { genre: genreState } = params;
  console.log(genreState);
  const onCheckedHandler = (genre: any) => {
    console.log(genre.name);
    const indexPosition = genreState.findIndex((el: any) => el === genre.id);
    if (indexPosition < 0) {
      dispatch(setParams({ genre: [...genreState, genre.id] }))
    } else
      dispatch(setParams({ genre: [...genreState.filter((el: any) => el !== genre.id)] }));
  }
  useEffect(() => {
    dispatch(fetchGenres() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    dispatch(fetchTodos({...params, genre: params.genre?.join(",")}) as unknown as AnyAction);
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