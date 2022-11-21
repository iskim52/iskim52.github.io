
import Select from 'react-select';

const fontSize = [8,9,10,11,12,14,18,24,30,36,48,60,72,96]
const fontSizeObj = fontSize.map(fontSize => {
  return {label:fontSize, value:fontSize}
});

export default function FontSize() { 
  return(
    <Select 
    options={fontSizeObj} 
    placeholder="8"
    defaultValue={8} //set default value to selected font
    // onChange={selectOption}
    // isSearchable={true}
    styles={{
      control: (provided, state) => ({
        ...provided,
        // borderColor: state.isFocused ? 'grey' : 'red',
      }),
      option: (provided, state) => ({
        ...provided,
        color: 'black',
        fontFamily: state.data.label,
      }),
      singleValue: (provided, state) => ({
        ...provided,
        fontFamily: state.data.label,
        width:'10vw',
        color: 'white',
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        width:'5vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),
      selectContainer: (provided, state) => ({
        ...provided,
        width:'10vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),
      placeholder: (provided, state) => ({
        ...provided,
        width:'10vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),        
    }}
    />
  )
};