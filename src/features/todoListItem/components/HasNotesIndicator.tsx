import styled from 'styled-components/macro';
import { ChevronDownIcon } from '@primer/octicons-react';

type Props = {
    reverse: boolean;
};

const Wrapper = styled.span<Props>`
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0.3;
    transition: all 0.3s linear;

    ${({ reverse }) => reverse && `transform: rotate(180deg);`};
`;

const HasNotesIndicator: React.FC<Props> = (props) => (
    <Wrapper {...props}>
        <ChevronDownIcon />
    </Wrapper>
);

export default HasNotesIndicator;
