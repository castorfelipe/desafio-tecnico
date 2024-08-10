import styled from "styled-components";
import RaterLogo from "../../../assets/rater-logo.svg";
import SearchBar from "../../atoms/SearchBar";
import { LuSlidersHorizontal } from "react-icons/lu";
import { RoundButton } from "@/components/atoms/RoundButton";

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .invisible {
        opacity: 0;
    }

    .center-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 0.75rem;
    }
`;

export default function Navbar() {
    return (
        <Container>
            <img src={RaterLogo} />
            <div className="center-wrapper">
                <SearchBar />
                <RoundButton className="filter-button">
                    <LuSlidersHorizontal />
                </RoundButton>
            </div>
            <img src={RaterLogo} className="invisible" />
        </Container>
    );
}
