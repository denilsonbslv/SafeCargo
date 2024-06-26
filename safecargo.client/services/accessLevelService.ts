import apiClient from './apiClient';
import { AccessLevelDTO } from '../types/types';

export const getAccessLevels = async (): Promise<AccessLevelDTO[]> => {
  const response = await apiClient.get('/accessLevel');
  return response.data;
};

export const getAccessLevelByCod = async (
  codLevel: string
): Promise<AccessLevelDTO> => {
  const response = await apiClient.get(`/accessLevel/${codLevel}`);
  return response.data;
};

export const saveAccessLevel = async (
  accessLevel: AccessLevelDTO
): Promise<void> => {
  if (accessLevel.codLevel) {
    await apiClient.put('/accessLevel', accessLevel);
  } else {
    await apiClient.post('/accessLevel', accessLevel);
  }
};

export const deleteAccessLevel = async (codLevel: string): Promise<void> => {
  await apiClient.delete(`/accessLevel/${codLevel}`);
};
