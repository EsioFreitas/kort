import React, { useCallback, useState } from "react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { create } from "../../store/slices/card";
import { formatDate } from "../../utils/date"
import { useDispatch, useSelector } from "react-redux";

export default function CardForm({ disclosure }) {
  const dispatch = useDispatch();
  const { lastId } = useSelector((state) => state.card);
  const { date: today } = useSelector((state) => state.date);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onClose } = disclosure;

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const createCard = useCallback(
    (event) => {
      event.preventDefault();

      dispatch(
        create({
          id: lastId,
          title,
          description,
          status: "backlog",
          priority: null,
          blocked: false,
          tasks: [],
          userId: null,
          releaseDate: null,
          createdAt: formatDate(today),
          backlogDate: today,
          doingDate: null,
          qaDate: null,
          finishDate: null,
          backlogDays: 1,
          doingDays: 0,
          qaDays: 0,
          finishDays: 0
        })
      );

      setDescription("");
      setTitle("");
      onClose();
    },
    [description, dispatch, lastId, onClose, title, today]
  );

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar novo card</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createCard}>
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Descrição</FormLabel>
                <Input
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Criar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
