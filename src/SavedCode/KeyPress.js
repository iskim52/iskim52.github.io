// import {useEffect, useState} from 'react';
// import { useKeyPress } from 'reactflow';

// function KeyLogger(props) {
//   const delPressed = useKeyPress('Delete');

//   const useActiveElement = () => {
//     const [active, setActive] = useState(document.activeElement);
    
//     const handleFocusIn = (e) => {
//       setActive(document.activeElement);
//     }
    
//     useEffect(() => {
//       document.addEventListener('focusin', handleFocusIn)
//       return () => {
//         document.removeEventListener('focusin', handleFocusIn)
//     };
//     }, [])
    
//     return active;
//   };
//   let active = useActiveElement();

//   useEffect(() => {
//     if (delPressed) {
//       // console.log(active.getAttribute('data-id'));
//       // console.log('delete pressed', delPressed);
//     }
//   }, [delPressed, active]);

//   return null;
// }

// export default KeyLogger;