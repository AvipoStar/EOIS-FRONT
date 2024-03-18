import React, { ReactNode } from 'react';
import '../styles/InfoBlock.css';

interface InfoBlockProps {
  title: string;
  children: ReactNode;
}

export const InfoBlock = (params: InfoBlockProps) => {
  return (
    <div className="InfoBlock">
      <div className="InfoBlock__title">{params.title}</div>
      <div className="InfoBlock__content">{params.children}</div>
    </div>
  );
};