import { Puff } from '@agney/react-loading';
import styled from 'styled-components/macro';

const dimension = '60px';

// @ts-ignore → Somehow Typescript types of Rings prop are not valid
const Indicator = styled(Puff)`
    width: ${dimension};
    height: ${dimension};
`;

const Container = styled.div`
    text-align: center;
`;

const output = {
    Indicator,
    Container,
};

export default output;
