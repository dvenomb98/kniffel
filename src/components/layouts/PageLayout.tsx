import classNames from 'classnames';
import React, { FC } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const CONTAINER = 'container mx-auto px-5';

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <div className={classNames('flex flex-col gap-24 py-12', CONTAINER)}>{children}</div>;
};

export default PageLayout;
