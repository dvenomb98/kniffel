import { Drawer, DrawerProps } from '@mui/material';
import React, { FC } from 'react';
import THEME from "../../themes/mui"

interface CustomDrawerProps extends DrawerProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const CustomDrawer: FC<CustomDrawerProps> = ({ isOpen, toggle, children, ...props }) => {
  return (
    <Drawer open={isOpen} sx={styles} onClose={toggle} {...props}>
      {children}
    </Drawer>
  );
};

const styles = {
  '& .MuiDrawer-paper': {
    background: '#18181b',
    width: 250,
    [THEME.breakpoints.up('desktop')]: {
      width: 400,
    },
  },
};

export default CustomDrawer;
