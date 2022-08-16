import React, { useMemo } from "react";
import Layout from "../../Layout";
import data from "../../data";
import { Box, HStack, Text } from "@chakra-ui/layout";
import Card from "../Card";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/react";

import CardForm from "../CardForm";

export default function Column({
    title,
    type,
    cards = [],
    hasCardBtn = false,
    hasLimit = false,
    limit = 3,
    id,
}) {
    const disclosure = useDisclosure();
    const { onOpen } = disclosure;

    const sectionStyle = {
        backgroundColor: "#5B8ADA",
        padding: "1rem",
        boxShadow: "1px 2px 3px #35353550",
        borderRadius: "1rem",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "white",
        justifyContent: "space-between",
        height: "4.5rem",
        width: "99%",
    };

    const idObject = React.useMemo(() => {
        return !!id ? { id } : {};
    }, [id]);

    const enableCreateCard = useMemo(() => {
        if (type !== "backlog" || cards.length >= limit) {
            return false;
        }
        return true;
    }, [cards.length, limit, type]);

    return (
        <>
            <CardForm disclosure={disclosure} />
            <Box {...idObject}>
                <HStack {...sectionStyle}>
                    <Text>{title}</Text>
                    {hasCardBtn && (
                        <Button
                            onClick={onOpen}
                            color="#5B8ADA"
                            disabled={!enableCreateCard}
                        >
                            Novo Cartão
                        </Button>
                    )}
                    {hasLimit && (
                        <Text>
                            {cards?.length}/{limit}
                        </Text>
                    )}
                </HStack>
                <Box>
                    {cards.map((data, index) => {
                        return (
                            <Card
                                data={data}
                                key={index}
                                id={index === 0 ? "step-2" : null}
                            />
                        );
                    })}
                </Box>
            </Box>
        </>
    );
}
