import React, { useMemo } from "react";
import Layout from "../../Layout";
import data from "../../data";
import Column from "../../Components/Column";
import Driver from "driver.js";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { backlogDescription, cardDescription } from "../../tutorial";

export default function MainPage() {
  const { cards } = useSelector((state) => state.card);

  const driver = React.useMemo(() => {
    return new Driver();
  }, []);

  const doingCards = useMemo(() => {
    return cards.filter((card) => card.status === "doing");
  }, [cards]);

  const qaCards = useMemo(() => {
    return cards.filter((card) => card.status === "qa");
  }, [cards]);

  const finishedCards = useMemo(() => {
    return cards.filter((card) => card.status === "finished");
  }, [cards]);

  const backlogCards = useMemo(() => {
    return cards.filter((card) => card.status === "backlog");
  }, [cards]);

  const [tutorial, setTutorial] = React.useState(true);

  React.useEffect(() => {
    if (!tutorial) return;

    const defaultOptions = {
      popover: {
        nextBtnText: "Próximo",
        prevBtnText: "Anterior",
        closeBtnText: "Fechar",
        doneBtnText: "Finalizar",
        position: "right",
      },
    };

    driver.defineSteps([
      {
        element: "#step-1",
        popover: {
          title: "Backlog",
          description: backlogDescription,
          ...defaultOptions?.popover,
        },
      },
      {
        element: "#step-2",
        popover: {
          title: "Cartão",
          description: cardDescription,
          ...defaultOptions?.popover,
        },
      },
    ]);

    driver.start();

    setTutorial(false);
  }, [driver, tutorial]);

  const buildSectionStyle = {
    backgroundColor: "#5B8ADA",
    padding: "1rem",
    boxShadow: "1px 2px 3px #35353550",
    borderRadius: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    justifyContent: "space-between",
    height: "4.5rem",
    width: "99.5%",
  };

  return (
    <Layout title="Quadro Loja de Produtos">
      <HStack
        overflow="scroll"
        spacing={5}
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        alignItems="start"
        width="100%"
        maxWidth={1300}
      >
        <Column
          id="step-1"
          title={data["backlog"].name}
          hasCardBtn={true}
          cards={backlogCards}
          type="backlog"
        />

        <Box mr={4} id="step-1">
          <HStack {...buildSectionStyle}>
            <Text>Desenvolvimento</Text>
          </HStack>
          <HStack
            mt={4}
            display="grid"
            gridTemplateColumns="1fr 1fr"
            alignItems="start"
            limit={3}
          >
            <Column
              title="Doing"
              cards={doingCards}
              hasLimit
              limit={3}
              type="doing"
            />
            <Column
              title="Ready to QA"
              cards={qaCards}
              type="QA"
              hasLimit
              limit={3}
            />
          </HStack>
        </Box>

        <Column
          title={data["finished"].name}
          cards={finishedCards}
          type="finished"
        />
      </HStack>
      <Box position="fixed" right="4" bottom="2rem">
        <Box
          p={8}
          cursor="pointer"
          bg="#314E9A"
          color="white"
          w="2rem"
          height="2rem"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          fontSize="2rem"
          justifyContent="center"
          boxShadow="1px 2px 3px #ccc"
          onClick={() => setTutorial(true)}
        >
          ?
        </Box>
      </Box>
    </Layout>
  );
}
