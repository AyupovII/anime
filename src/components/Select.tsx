import { BaseSyntheticEvent } from "react";
import { styled } from "styled-components";

const BlockSelect = styled.select`
  height: 40px;
  width: 100%;
  cursor: pointer;
`;

export interface SelectI {
  value: string,
  label: string
}
const Select = ({ options, onChange }: { options: SelectI[], onChange: (e: BaseSyntheticEvent, type?: string) => void }) => {
  return (
    <BlockSelect onChange={onChange}>
      {options.map((option, index) => {
        return (<option key={index} value={option.value}>{option.label}</option>)
      })}
    </BlockSelect>
  )
}
export default Select