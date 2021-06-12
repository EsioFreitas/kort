import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, HStack, VStack } from "@chakra-ui/layout";
import {
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
} from "@chakra-ui/slider";
import { addLeadingZero } from "../../utils/number";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../../store/slices/card";
import { Image } from "@chakra-ui/react";

export default function Card({ data, id }) {
    const idObject = React.useMemo(() => {
        return !!id ? { id } : {};
    }, [id]);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { cards, tasks } = useSelector((state) => state.card);
    const { users } = useSelector((state) => state.user);
    const { date: today } = useSelector((state) => state.date);

    const doingCards = useMemo(() => {
        return cards.filter((card) => card.status === "doing");
    }, [cards]);

    const { id: cardId, title, description, status, blocked, userId } = data;

    const cardTasks = useMemo(() => {
        if (tasks.length > 0) {
            return tasks.filter((el) => el.cardId === Number(cardId));
        }
        return [];
    }, [cardId, tasks]);

    const donePercentage = useMemo(() => {
        if (!cardTasks) {
            return 0;
        } else {
            const doneCards = cardTasks.filter((el) => el.done).length;
            return ~~((100 / cardTasks.length) * doneCards);
        }
    }, [cardTasks]);

    const user = useMemo(() => {
        if (users.length > 0) {
            return users.find((el) => el.id === Number(userId));
        }
        return {};
    }, [userId, users]);

    const nextIcon = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23.0607 13.0607C23.6464 12.4749 23.6464 11.5251 23.0607 10.9393L13.5147 1.3934C12.9289 0.807613 11.9792 0.807613 11.3934 1.3934C10.8076 1.97919 10.8076 2.92893 11.3934 3.51472L19.8787 12L11.3934 20.4853C10.8076 21.0711 10.8076 22.0208 11.3934 22.6066C11.9792 23.1924 12.9289 23.1924 13.5147 22.6066L23.0607 13.0607ZM-1.31134e-07 13.5L22 13.5L22 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
                fill="#314E9A"
            />
        </svg>
    );

    const handleNextColumn = useCallback(() => {
        let newStatus = status;
        let dateField = null;

        switch (status) {
            case "backlog":
                newStatus = "doing";
                dateField = "doingDate";
                break;
            case "doing":
                if (donePercentage === 100) {
                    newStatus = "qa";
                    dateField = "qaDate";
                }
                break;
            case "qa":
                newStatus = "finished";
                dateField = "finishDate";
                break;
            default:
                break;
        }

        dispatch(
            updateCard({ ...data, status: newStatus, [dateField]: today })
        );
    }, [data, dispatch, donePercentage, status, today]);

    const finished = useMemo(() => status === "finished", [status]);

    return (
        <Box
            backgroundColor={blocked ? "#FEDADA" : "white"}
            p={4}
            my={4}
            boxShadow="1px 2px 3px #35353550"
            borderRadius="1rem"
            width="99%"
            {...idObject}
        >
            <HStack justifyContent="space-between" alignItems="flex-start">
                <Text
                    fontWeight="bold"
                    fontSize="xl"
                    color="#314E9A"
                    onClick={() => navigate(`/card/${cardId}`)}
                    cursor="pointer"
                    noOfLines={2}
                >
                    {title}
                </Text>
                <Text fontWeight="bold" fontSize="l" color="#999">
                    {`#${addLeadingZero(cardId, 4)}`}
                </Text>
            </HStack>

            <Text my={4} noOfLines={2} fontSize="sm">
                {description}
            </Text>
            {cardTasks.length > 0 && (
                <VStack>
                    <HStack justifyContent="space-between" w="100%">
                        <Text m={0} fontSize="xs">
                            Progresso
                        </Text>
                        <Text m={0} fontSize="xs">
                            {donePercentage}%
                        </Text>
                    </HStack>
                    <RangeSlider
                        defaultValue={[0, donePercentage]}
                        min={0}
                        max={100}
                        step={1}
                        isDisabled
                    >
                        <RangeSliderTrack bg="green">
                            <RangeSliderFilledTrack bg="green" />
                        </RangeSliderTrack>
                    </RangeSlider>
                </VStack>
            )}
            <HStack justifyContent="space-between" w="100%" mt={4}>
                {!!user && (
                    <Image
                        boxSize="30px"
                        src={user.photo}
                        alt={user.name}
                        borderRadius="50%"
                        mr={10}
                    />
                )}
                {!finished &&
                    !blocked &&
                    (status !== "backlog" || doingCards.length < 3) &&
                    !!user && (
                        <Box
                            onClick={handleNextColumn}
                            cursor="pointer"
                            marginLeft="auto"
                        >
                            {nextIcon}
                        </Box>
                    )}
            </HStack>
        </Box>
    );
}
