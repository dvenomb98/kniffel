import useMobileWidth from '@/hooks/useMobile';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import React, { FC } from 'react';

interface CustomDialogTitleProps {
  title: string;
  toggle: () => void;
}

const CustomDialogTitle: FC<CustomDialogTitleProps> = ({ title, toggle }) => {
  return (
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {title}
      <IconButton onClick={toggle} sx={{ ml: 'auto' }}>
        <XMarkIcon className="w-5 h-5" />
      </IconButton>
    </DialogTitle>
  );
};

interface CustomDialogProps extends DialogProps {
  toggle: () => void;
  children: React.ReactNode;
  title: string;
  desktopWidth?: string | number;
  mobileWidth?: string | number;
}

const CustomDialog: FC<CustomDialogProps> = ({
  toggle,
  children,
  title,
  desktopWidth,
  mobileWidth,
  ...props
}) => {
  const { isMobile } = useMobileWidth();

  return (
    <Dialog
      PaperProps={{
        sx: {
          background: '#18181b',
          width: isMobile
            ? mobileWidth
              ? mobileWidth
              : '80%'
            : desktopWidth
            ? desktopWidth
            : '600px',
        },
      }}
      onClose={toggle}
      {...props}
      fullWidth
    >
      <CustomDialogTitle toggle={toggle} title={title} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
