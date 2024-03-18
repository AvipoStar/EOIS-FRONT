import React from 'react';
import { ReactNode } from 'react'
import '../styles/MyLabel.css'
export const MyLabel = ({ children }: { children: ReactNode[] | ReactNode }) => {

  return(
    <div className="MyLabel">
      {children}
    </div>
  )
}