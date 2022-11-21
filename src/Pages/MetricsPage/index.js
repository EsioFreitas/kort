import React, { useMemo } from "react";
import Layout from "../../Layout";
import Driver from "driver.js";
import { useSelector } from "react-redux";
import { formatDate, lastDays } from "../../utils/date";
import { Box, Text, Heading } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import {
  leadTimeDescription,
  throughputDescription,
  wipDescription,
  wipTableDescription,
} from "../../tutorial";

export default function MetricsPage() {
  const { cards } = useSelector((state) => state.card);
  const { wips } = useSelector((state) => state.wip);
  const { date: today } = useSelector((state) => state.date);
  const driver = React.useMemo(() => {
    return new Driver();
  }, []);

  const [tutorial, setTutorial] = React.useState(true);

  React.useEffect(() => {
    if (!tutorial) return;

    const defaultOptions = {
      popover: {
        nextBtnText: "Próximo",
        prevBtnText: "Anterior",
        closeBtnText: "Fechar",
        doneBtnText: "Finalizar",
        position: "top",
      },
    };

    driver.defineSteps([
      {
        element: "#step-1",
        popover: {
          title: "WIP",
          description: wipDescription,
          ...defaultOptions?.popover,
          position: "bottom",
        },
      },
      {
        element: "#step-2",
        popover: {
          title: "Throughput",
          description: throughputDescription,
          ...defaultOptions?.popover,
          position: "bottom",
        },
      },
      {
        element: "#step-3",
        popover: {
          title: "Lead",
          description: leadTimeDescription,
          ...defaultOptions?.popover,
        },
      },
      {
        element: "#step-4",
        popover: {
          title: "Tabela WIP",
          description: wipTableDescription,
          ...defaultOptions?.popover,
        },
      },
    ]);

    driver.start();

    setTutorial(false);
  }, [driver, tutorial]);

  const weekDays = useMemo(() => lastDays(today, 15).reverse(), [today]);

  const WIPData = useMemo(() => {
    return wips.filter((wip) => weekDays.includes(wip.date));
  }, [weekDays, wips]);

  const throughputData = useMemo(() => {
    return weekDays.map((date) => {
      const result = { name: date, value: 0 };
      cards.forEach((card) => {
        let finishDate = card.finishDate;
        if (finishDate) {
          finishDate = formatDate(finishDate);
          if (finishDate === date) {
            result.value++;
          }
        }
      });
      return result;
    });
  }, [cards, weekDays]);

  const leadTimeData = useMemo(() => {
    return cards.filter((card) => weekDays.includes(card.createdAt));
  }, [cards, weekDays]);

  const todayWIP = useMemo(() => {
    const doingCards = cards.filter((card) => card.status === "doing");
    return doingCards.length;
  }, [cards]);

  const chartProps = {
    width: 600,
    height: 400,
  };

  return (
    <Layout title="Métricas">
      <SimpleGrid columns={2} spacing={10} paddingBottom={150}>
        <Box
          id="step-1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading mb={4}>WIP</Heading>
          <Text fontSize="5xl" color="#314E9A" stroke>
            {todayWIP} cards
          </Text>
          <Text fontSize="xl">estão em andamento</Text>
        </Box>
        <Box id="step-2">
          <ResponsiveContainer {...chartProps}>
            <BarChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Brush dataKey="name" stroke="#8884d8" />
              <Bar dataKey="value" name="Cards entregues" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box id="step-3">
          <ResponsiveContainer {...chartProps}>
            <BarChart data={leadTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Legend />
              <Brush dataKey="name" stroke="#8884d8" />
              <Bar
                dataKey="backlogDays"
                name="Backlog"
                stackId="a"
                fill="#8884d8"
              />
              <Bar
                dataKey="doingDays"
                name="Doing"
                stackId="a"
                fill="#8824d1"
              />
              <Bar dataKey="qaDays" name="QA" stackId="a" fill="#2723d8" />
              <Bar
                dataKey="finishDays"
                name="Finished"
                stackId="a"
                fill="#1384d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box id="step-4">
          <ResponsiveContainer {...chartProps}>
            <BarChart data={WIPData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Brush dataKey="date" stroke="#8884d8" />
              <Bar dataKey="wip" name="WIP" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
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
