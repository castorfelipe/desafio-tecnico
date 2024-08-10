import styled from "styled-components";

export const MovieItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
    flex: 1;
    padding: 0.75rem;
    gap: 0.75rem;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 100%
    );

    h2.movie-name {
        color: #eee;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.4rem;
        text-shadow: 0px 0px 15px #00000092;
    }

    p.description {
        color: #eee;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.4rem;
        width: 100%;
        max-width: 40rem;
        text-wrap: balance;
    }

    .statistics-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        span {
            color: #b4b4b4;
            font-size: 1rem;
            font-weight: 500;
        }

        .simple-rating {
            background: none;
        }
    }

    .row {
        display: flex;
        align-items: center;
    }

    .row-divider {
        background-color: #b4b4b4;
        width: 0.375rem;
        height: 0.375rem;
        flex-shrink: 0;
        margin: 0 0.75rem;
        border-radius: 50%;
    }

    &.main-item {
        justify-content: flex-end;
        padding: 3rem;

        h2.movie-name {
            color: #fff;
            font-size: 2.5rem;
            line-height: normal;
        }

        button.watch-trailer {
            margin-top: 2rem;
            color: var(--colors-secondary-accessible-text-12, #eee);
            font-family: Inter;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
`;

export const MovieItemRating = styled.div`
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem 0.4rem;
    align-items: center;

    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(6px);
    margin-bottom: auto;

    font-size: 1.25rem;
    font-weight: 600;
    color: #eeeeee;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #eab308;
        fill: #eab308;
    }

    &.no-margin {
        margin: 0;
    }
`;

export const MovieItemHighlightTag = styled(MovieItemRating)`
    padding: 0.5rem;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #eeeeee;
        fill: none;
    }
`;
