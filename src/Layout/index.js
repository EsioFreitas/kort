import React, { useCallback, useMemo } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDay } from "../store/slices/date";
import { formatDate } from "../utils/date";
import { updateCard } from "../store/slices/card";
import { addWip } from "../store/slices/wip";

export default function Layout({ children, title }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { date: today } = useSelector((state) => state.date);
    const { cards } = useSelector((state) => state.card);

    const todayWIP = useMemo(() => {
        const doingCards = cards.filter((card) => card.status === "doing");
        return doingCards.length;
    }, [cards]);

    const handleNextDay = useCallback(() => {
        cards.forEach((card) => {
            const cardCopy = { ...card };
            if (cardCopy.status === "backlog") {
                cardCopy.backlogDays++;
            } else if (cardCopy.status === "doing") {
                cardCopy.doingDays++;
            } else if (cardCopy.status === "qa") {
                cardCopy.qaDays++;
            } else if (cardCopy.status === "finish") {
                cardCopy.finishDays++;
            }

            dispatch(updateCard(cardCopy));
        });
        dispatch(
            addWip({
                date: formatDate(today),
                wip: todayWIP,
            })
        );
        dispatch(addDay());
    }, [cards, dispatch, today, todayWIP]);

    return (
        <>
            <Box
                bg="#314E9A"
                py={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    w="95%"
                    color="white"
                    fontWeight="bold"
                    fontSize="2rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    maxWidth={1300}
                >
                    <Box onClick={() => navigate("/main-page")} cursor="pointer">
                        Kort
                    </Box>
                    <Box>{formatDate(today)}</Box>
                    <Button bg="white" color="#314E9A" onClick={handleNextDay}>
                        Próximo dia
                    </Button>
                    <Button
                        bg="white"
                        color="#314E9A"
                        onClick={() => navigate("/metrics")}
                    >
                        Ver métricas
                    </Button>
                </Box>
            </Box>
            <Box
                py={8}
                backgroundColor="#f7f7f7"
                h="calc(100vh - 72px)"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
            >
                {title && (
                    <Heading pb={8} maxWidth={1300} width="100%">
                        {title}
                    </Heading>
                )}
                {children}
            </Box>
        </>
    );
}
