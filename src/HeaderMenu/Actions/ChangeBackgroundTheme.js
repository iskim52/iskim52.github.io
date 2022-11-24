import useStore from "../../store.tsx"



export default function ChangeBackgroundFunction(value) {
  const {changeBackgroundTheme} = useStore();
  changeBackgroundTheme(value)
}