import styled from 'styled-components';

const Button = styled.button`
    border-radius: 50%;
    border: none;
    padding: 10px;
    background: #fff;
    border: 1px solid #aaa;
    text-align: center;
    text-decoration: none;
    display: block;
    width: 40px;
    height: 40px;
    opacity: 0.8;
    transition: 0.3s;
    color: #999;

    &:hover {
        border-color: ${({ theme }) => theme.colors.fourth};
        color: #333;
        transform: scale(1.3);
    }
`;

export default Button;
