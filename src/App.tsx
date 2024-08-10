import styled from "styled-components";
import Navbar from "./components/molecules/Navbar";
import "./global.css";
import MovieItem, { MainMovieItem } from "@/components/molecules/MovieItem";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;

    section {
        display: flex;
        height: calc(100vh - 6rem);
        gap: 1rem;
        padding-top: 1rem;

        /* .main-image-wrapper {
            width: 75%;
            overflow: hidden;
            aspect-ratio: 1/1;
            border-radius: 1.5rem;
            height: 100%;
            img {
                height: 100%;
                width: 100%;
                aspect-ratio: 1/1;
                object-fit: cover;
            }
        } */

        .column {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            gap: 1rem;

            .column-title {
                position: relative;
                color: #eee;
                font-size: 1.5rem;
                font-weight: 600;
                line-height: 1.8rem;
                padding-left: 0.75rem;

                &::before {
                    position: absolute;
                    content: "";
                    inset: 0;

                    height: 100%;
                    width: 0.25rem;
                    background: #eee;
                    border-radius: 0.56rem;
                }
            }
        }
    }
`;

function App() {
    return (
        <Container>
            <Navbar />
            <section>
                <MainMovieItem url="https://i.nuuls.com/y7tQF.png" />
                <div className="column">
                    <h2 className="column-title">Destaques também</h2>
                    <MovieItem url="https://i.nuuls.com/TVTbI.png" />
                    <MovieItem url="https://i.nuuls.com/TVTbI.png" />
                    <MovieItem url="https://i.nuuls.com/TVTbI.png" />
                </div>
            </section>
        </Container>
    );
}

export default App;
