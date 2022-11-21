import React, { useCallback, useMemo, useState } from "react";
import Layout from "../../Layout";
import TaskForm from "../../Components/TaskForm";
import Driver from "driver.js";
import {
  HStack,
  Box,
  Text,
  VStack,
  Checkbox,
  Select,
  Input,
  useToast,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/button";
import { useLocation } from "react-router-dom";
import { updateCard, updateTask } from "../../store/slices/card";
import {
  cardCommandDescription,
  cardPageDescription,
  tasksDescription,
} from "../../tutorial";

export default function CardPage() {
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
      },
    };

    driver.defineSteps([
      {
        element: "#step-1",
        popover: {
          title: "Página do cartão",
          description: cardPageDescription,
          position: "bottom",
          ...defaultOptions?.popover,
        },
      },
      {
        element: "#step-2",
        popover: {
          title: "Tasks",
          description: tasksDescription,
          position: "bottom",
          ...defaultOptions?.popover,
        },
      },
      {
        element: "#step-3",
        popover: {
          title: "Painel do cartão",
          description: cardCommandDescription,
          position: "left",
          ...defaultOptions?.popover,
        },
      },
    ]);

    driver.start();

    setTutorial(false);
  }, [driver, tutorial]);

  const toast = useToast();

  const [userId, setUserId] = useState("");
  const [priority, setPriority] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [blocked, setBlocked] = useState(false);

  const { cards, tasks } = useSelector((state) => state.card);
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const disclosure = useDisclosure();

  const { onOpen } = disclosure;
  const { pathname } = location;

  const handleTask = useCallback(
    (task) => {
      dispatch(updateTask({ ...task, done: !task.done }));
    },
    [dispatch]
  );

  const handleUpdateCard = useCallback(
    (c) => {
      dispatch(
        updateCard({
          ...c,
          priority,
          releaseDate,
          blocked,
          userId: userId,
        })
      );
      toast({
        title: "Card atualizado com sucesso!.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    [blocked, dispatch, priority, releaseDate, toast, userId]
  );

  const card = useMemo(() => {
    if (cards.length > 0) {
      const innerCard = cards.find((el) => el.id === Number(cardId));
      setPriority(innerCard.priority || "");
      setReleaseDate(innerCard.releaseDate || "");
      setBlocked(innerCard.blocked || false);
      setUserId(innerCard.userId || false);
      return innerCard;
    }
    return {};
  }, [cardId, cards]);

  const cardTasks = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.filter((el) => el.cardId === Number(cardId));
    }
    return [];
  }, [cardId, tasks]);

  const user = useMemo(() => {
    if (users.length > 0) {
      return users.find((el) => el.id === Number(userId));
    }
    return {};
  }, [userId, users]);

  const cardId = useMemo(() => {
    return pathname.split("/")[2];
  }, [pathname]);

  return (
    <Layout>
      <TaskForm disclosure={disclosure} card={card} />
      <HStack
        width="95%"
        maxWidth={1300}
        display="grid"
        gridTemplateColumns="4fr 1fr"
        alignItems="flex-start"
      >
        <VStack align="start" spacing={100} pr={2}>
          <div id="step-1">
            <HStack>
              {user ? (
                <Image
                  boxSize="65px"
                  src={user.photo}
                  alt={user.name}
                  borderRadius="50%"
                  mr={10}
                />
              ) : (
                <Box
                  p={8}
                  borderRadius="50%"
                  backgroundColor="#636161"
                  mr={10}
                />
              )}
              <VStack align="start" spacing={-2}>
                <Text
                  fontSize="4xl"
                  lineHeight="95%"
                  mb={3}
                  color="#385898"
                  fontWeight="700"
                >
                  {card.title}
                </Text>
                <Text fontSize="md" color="#636161" fontWeight="700">
                  Item criado dia {card.createdAt}
                </Text>
              </VStack>
            </HStack>
            <Text mt={3}>{card.description}</Text>
          </div>

          <div style={{ width: "60%" }} id="step-2">
            <VStack align="center" spacing={5}>
              <Text fontSize="xl" fontWeight={700} width="100%">
                Atividades
              </Text>
              <VStack width="100%" align="start">
                {cardTasks.map((task) => {
                  return (
                    <Checkbox
                      onChange={() => handleTask(task)}
                      isChecked={task.done}
                      key={task.id}
                    >
                      {task.description}
                    </Checkbox>
                  );
                })}
              </VStack>
              <Button
                colorScheme="facebook"
                width="60%"
                maxWidth={233}
                onClick={onOpen}
                fontSize="1.5rem"
                fontWeight={700}
                height={50}
              >
                adicionar
              </Button>
            </VStack>
          </div>
        </VStack>

        <VStack
          align="start"
          justifyContent="flex-end"
          maxWidth={233}
          style={{ marginLeft: "auto" }}
          id="step-3"
        >
          <Button
            colorScheme="facebook"
            width="100%"
            onClick={() => handleUpdateCard(card)}
          >
            Salvar
          </Button>
          <Select
            placeholder="Usuário"
            size="md"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            {users.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Prioridade"
            size="md"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </Select>
          <Input
            placeholder="Data de entrega"
            colorScheme="facebook"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <Checkbox isChecked={blocked} onChange={() => setBlocked(!blocked)}>
            Está bloqueado?
          </Checkbox>
        </VStack>
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
