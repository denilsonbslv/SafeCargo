import styled from 'styled-components';

export const containerStyle = (theme: { background: any; textColor: any }) => ({
  backgroundColor: theme.background,
  color: theme.textColor,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  flexDirection: 'column',
});

export const logoStyle = (theme: { logoShadowColor: any }) => ({
  filter: `drop-shadow(0 0 5px ${theme.logoShadowColor})`,
});

export const spinnerStyle = (theme: { buttonBackground: any }) => ({
  color: theme.buttonBackground,
});

export const messageStyle = (theme: { textColor: any }) => ({
  color: theme.textColor,
  marginTop: '16px',
  fontSize: '1.125rem',
});
