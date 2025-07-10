'use client'

import React from 'react';
import PropTypes from 'prop-types';
import { useUserStore } from '../store/userStore';

const HasPermission = ({  permissionName, children }) => {
    const {user} = useUserStore();

    const permissions = user?.all_permissions || [];

  // Verificar si el permiso existe en el array de permisos
  const hasPermission = permissions.some(
    permission => permission.name === permissionName
  );  

  // Si no tiene el permiso, retornar null o false según lo necesites
  if (!hasPermission) {
    return false; // o return null; según tu caso de uso
  }

  // Si tiene el permiso, renderizar los children
  return children || true;
};

HasPermission.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      display_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  permissionName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default HasPermission;