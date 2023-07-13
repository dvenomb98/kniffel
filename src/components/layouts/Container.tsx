import React, { FC } from 'react';
import { CONTAINER } from './PageLayout';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => <div className={CONTAINER}>{children}</div>;

export default Container;
