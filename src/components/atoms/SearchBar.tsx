import { LuSearch } from "react-icons/lu";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    background-color: #191919;
    padding: 0.25rem;
    gap: 0.5rem;
    border-radius: 6.1875rem;
    flex-grow: 1;

    input {
        background: none;
        border: none;
        font-size: 1rem;
        color: #eeeeee;
        flex: 1;

        &::placeholder {
            color: #313131;
        }

        &:focus {
            outline: 0;
        }
    }

    button {
        display: flex;
        padding: 0.75rem;
        justify-content: center;
        align-items: center;
        background-color: #232323;
        border-radius: 50%;
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #eeeeee;
    }
`;

export default function SearchBar({
    onTextChange,
    onSearchClicked,
}: {
    onTextChange: (d: string) => void;
    onSearchClicked: () => void;
}) {
    return (
        <Container>
            <button onClick={onSearchClicked}>
                <LuSearch />
            </button>
            <input
                type="text"
                placeholder="Pesquisar..."
                onChange={(e) => onTextChange(e.target.value)}
            />
        </Container>
    );
}
