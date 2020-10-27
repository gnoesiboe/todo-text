import { keyframes } from 'styled-components';

const wobble = keyframes`
   0% { transform: rotate(0deg); }
   15% { transform: rotate(-20deg); }
   30% { transform: rotate(12deg); }
   45% { transform: rotate(-12deg); }
   60% { transform: rotate(8deg); }
   75% { transform: rotate(-4deg); }
   100% { transform: rotate(0deg); }
`;

export default wobble;
