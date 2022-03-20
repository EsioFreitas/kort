import React from "react";
import { Box, VStack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/react";

export default function WelcomePage() {
  let navigate = useNavigate();

  const description = `
  O Método Kanban propõe um olhar mais ativo e construtivo para a resolução 
  de tarefas e administração de demandas. Atualmente, essa abordagem pode ser 
  aplicada atravez de aplicações web que facilita o seu uso. No entanto, 
  essa abordagem evoluiu com o tempo ao ponto de virar uma métodologia, 
  assim, tendo suas próprias práticas e métricas. Essa ferramenta, 
  baseada nas práticas e métricas da Metodologia Kanban, 
  tem o intuito de apresentar como essas mecánicas acontecem.
`;
  const title = `
  Kort: Ferramenta Educacional para Gestão de Fluxo de Trabalho Orientada 
  à Metodologia Kanban.
  `;

  return (
    <Box height="100vh" width="100vw">
      <Center height="100vh" width="100vw">
        <VStack
          overflow="scroll"
          spacing={100}
          align="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Text textAlign="center" fontSize="6xl">
            {title}
          </Text>
          <Text textAlign="center" fontSize="lg" width="70%">
            {description}
          </Text>
          <Button
            colorScheme="facebook"
            width="60%"
            maxWidth={233}
            onClick={() => navigate(`/main-page`)}
            fontSize="1.5rem"
            fontWeight={700}
            height={50}
          >
            Começar
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
