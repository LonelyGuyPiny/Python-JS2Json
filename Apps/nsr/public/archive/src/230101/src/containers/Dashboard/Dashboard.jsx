import React from 'react';
import { VerifyAuthentication } from '../../components';
import DashboardJSX from './DashboardJSX';

export default function Dahsboard () {
  return (
    <VerifyAuthentication>
      <DashboardJSX />
    </VerifyAuthentication>
  )
}