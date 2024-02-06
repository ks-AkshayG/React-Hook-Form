import { Drawer } from '@mantine/core';
// import { MantineComponent } from '@mantine/core';

type DrawerProps = {
    opened: boolean
    onClose: () => void
    position?: "left" | "top" | "right" | "bottom"
    size?: string
    children: React.ReactNode
}

// type MantineDrawerType = MantineComponent<any> & DrawerProps

const MantineDrawer = ({opened, onClose, position, size, children}: DrawerProps) => {
  return (
    <Drawer opened={opened} onClose={onClose} position={position} size={size} >
        {children}
    </Drawer>
  )
}

export default MantineDrawer