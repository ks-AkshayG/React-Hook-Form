import { Modal, Button } from '@mantine/core';

type propType = {
    title: string
    opened: boolean
    onClose: () => void
    onClick: () => void
}

const MantineConfirmMenu = ({title, opened, onClose, onClick}: propType) => {

  return (
    <Modal opened={opened} onClose={onClose} title={title} >
        <Button onClick={onClick}>Confirm</Button>
    </Modal>
  )
}

export default MantineConfirmMenu