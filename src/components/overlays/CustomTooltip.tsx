import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import React, { FC, ReactElement } from 'react';

interface CustomTooltipProps extends TooltipProps {
  children: ReactElement<any, any>;
  title: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ children, title, ...props }) => {
  return (
    <Tooltip
      componentsProps={{ tooltip: { sx: { background: '#121212', p: 2 } } }}
      title={title}
      {...props}
    >
      <IconButton>{children}</IconButton>
    </Tooltip>
  );
};

export default CustomTooltip;
