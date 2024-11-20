import { BaseSyntheticEvent, useEffect } from "react";
import { fetchGenres, fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import styled from "styled-components";
import Select from "./Select";


const Container = styled.div<{ filterOpen: boolean }>`
  display: ${p => p.filterOpen ? "block" : "none"};
  padding: 12px;
`
const BlockSelect = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
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

const Filter = ({ filterOpen = false }: { filterOpen?: boolean }) => {
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
  };

  useEffect(() => {
    dispatch(fetchGenres() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    dispatch(fetchTodos({ ...params, genre: params.genre?.join(",") }) as unknown as AnyAction);
  }, [genreState]);

  const optionsStatus = [
    { value: '', label: 'Не выбрано' },
    { value: 'anons', label: 'Анонс' },
    { value: 'ongoing', label: 'Онгоинг' },
    { value: 'released', label: 'Релиз' }
  ];

  const optionsRating = [
    { value: '', label: 'Не выбрано' },
    { value: 'none', label: 'Нет рейтинга' },
    { value: 'g', label: 'G - Всех возрастов' },
    { value: 'pg', label: 'PG - Дети' },
    { value: 'pg_13', label: 'PG-13 - Подростки от 13 лет и старше' },
    { value: 'r', label: 'Рекомендуется r–R - 17+ (насилие и ненормативная лексика' },
    { value: 'r_plus', label: 'R+ - Легкая обнаженность (может также содержать насилие и ненормативную лексику)' },
    { value: 'rx', label: 'Rx - Хентай (экстремальный сексуальный контент/обнаженная натура)' },
  ];

  const optionOrder = [
    { value: '', label: 'Не выбрано' },
    { value: 'id', label: 'по идентификатору' },
    { value: 'ranked', label: 'по рангу' },
    { value: 'kind', label: 'по типу' },
    { value: 'popularity', label: 'по популярности' },
    { value: 'name', label: 'в алфавитном порядке' },
    { value: 'aired_on', label: 'по дате выпуска' },
    { value: 'episodes', label: 'по количеству эпизодов' },
    { value: 'status', label: 'по статусу' },
    { value: 'random', label: 'случайным образом' }
  ];

  const onchange = (e: BaseSyntheticEvent, type: "status" | "rating" | "order") => {
    dispatch(setParams({ [type]: e.currentTarget.value ?? null }))
  }

  return (
    <Container filterOpen={true} style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <BlockSelect>
        <Select options={optionsRating} onChange={(e) => onchange(e, "rating")} />
        <Select options={optionOrder} onChange={(e) => onchange(e, "order")} />
        <Select options={optionsStatus} onChange={(e) => onchange(e, "status")} />
      </BlockSelect>
      <BlockFilters>
        {genresList?.map((genre: any) => {
          return (
            <BlockFilter key={genre.id}>
              <label>
                <input type="checkbox" onChange={() => onCheckedHandler(genre)} checked={genreState.find((el: any) => el === genre.id)} />
                {genre.russian}
              </label>
            </BlockFilter>
          )
        })}
      </BlockFilters>
    </Container>
  )
}

export default Filter;