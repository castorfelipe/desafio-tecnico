import animations from "@/utils/animations";
import { motion } from "framer-motion";
import styled from "styled-components";
import ReactLoading from "react-loading";

const Container = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px) grayscale(0.3);
    z-index: 2;
`;

const Icon = styled(motion.div)`
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background-color: #eeeeee57;
`;

export const LoadingSmall = ({
    size,
    solid,
}: {
    size: number;
    solid?: boolean;
}) => {
    return (
        <Container
            {...animations.fadeInOut(0.2)}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: solid ? "#121212" : "#12121269" }}
        >
            <ReactLoading
                type={"spin"}
                color={"#eeeeee90"}
                height={`${size}rem`}
                width={`${size}rem`}
            />
        </Container>
    );
};
