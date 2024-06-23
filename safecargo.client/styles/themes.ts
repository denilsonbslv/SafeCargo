// Tipo Theme para definir as propriedades dos temas
export type Theme = {
  background: string;
  boxBackground: string;
  textColor: string;
  buttonBackground: string;
  buttonHoverBackground: string;
  inputBackground: string;
  inputBorder: string;
  placeholderColor: string;
  logoShadowColor: string;
  disabledBackground: string;
  disabledTextColor: string;
  tableHeaderBackground: string;
  tableHeaderTextColor: string;
  tableRowEvenBackground: string;
  tableRowOddBackground: string;
  tableRowHoverBackground: string;
  tableBorderColor: string;
  tooltipBackground: string;
  tooltipTextColor: string;
};

// Definição do tema escuro
export const darkTheme: Theme = {
  background: '#1e1e1e',
  boxBackground: '#333',
  textColor: '#fff',
  buttonBackground: '#10a89e',
  buttonHoverBackground: '#0e8f87',
  inputBackground: '#555',
  inputBorder: '#777',
  placeholderColor: '#bbb',
  logoShadowColor: '#fff',
  disabledBackground: '#343a40',
  disabledTextColor: '#6c757d',
  tableHeaderBackground: '#444',
  tableHeaderTextColor: '#fff',
  tableRowEvenBackground: '#333',
  tableRowOddBackground: '#3a3a3a',
  tableRowHoverBackground: '#555',
  tableBorderColor: '#777',
  tooltipBackground: '#000',
  tooltipTextColor: '#fff',
};

// Definição do tema claro
export const lightTheme: Theme = {
  background: '#f0f2f5',
  boxBackground: '#fff',
  textColor: '#000',
  buttonBackground: '#10a89e',
  buttonHoverBackground: '#0e8f87',
  inputBackground: '#fff',
  inputBorder: '#ccc',
  placeholderColor: '#888',
  logoShadowColor: '#00000000',
  disabledBackground: '#e9ecef',
  disabledTextColor: '#6c757d',
  tableHeaderBackground: '#ddd',
  tableHeaderTextColor: '#000',
  tableRowEvenBackground: '#fff',
  tableRowOddBackground: '#f7f7f7',
  tableRowHoverBackground: '#e9ecef',
  tableBorderColor: '#ccc',
  tooltipBackground: '#000',
  tooltipTextColor: '#fff',
};
