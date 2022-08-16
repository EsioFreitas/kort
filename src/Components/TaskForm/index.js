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
  FormLabel
} from "@chakra-ui/react";
import { addTask } from "../../store/slices/card";
import { useDispatch, useSelector } from 'react-redux'


export default function TaskForm({ disclosure, card }) {
  const dispatch = useDispatch();
  const { lastTaskId } = useSelector((state) => state.card)

  const [description, setDescription] = useState("");

  const { isOpen, onClose } = disclosure;

  const initialRef = React.useRef()
  const finalRef = React.useRef()


  const createTask = useCallback((event) => {
    event.preventDefault()
    dispatch(addTask({
      id: lastTaskId,
      description,
      done: false,
      cardId: card.id
    }))

    setDescription("")
    onClose();
  }, [card.id, description, dispatch, onClose, lastTaskId]);

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
          <ModalHeader>Criar nova task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createTask}>
            <ModalBody pb={6}>
              <FormControl mt={4} isRequired>
                <FormLabel>Descrição</FormLabel>
                <Input
                  placeholder='Descrição'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Criar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
