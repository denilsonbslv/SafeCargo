import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from './AccessLevelForm.styles';
import Alert from '../Alert/Alert';

const AccessLevelForm = ({ level, onSave, onCancel }) => {
  const [codLevel, setCodLevel] = useState(level ? level.codLevel : '');
  const [descLevel, setDescLevel] = useState(level ? level.descLevel : '');
  const [description, setDescription] = useState(level ? level.description : '');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setCodLevel(level ? level.codLevel : '');
    setDescLevel(level ? level.descLevel : '');
    setDescription(level ? level.description : '');
  }, [level]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codLevel || !descLevel || !description) {
      setAlertMessage('Todos os campos são obrigatórios.');
      setShowAlert(true);
      return;
    }
    onSave({ codLevel, descLevel, description });
  };

  return (
    <>
      {showAlert && (
        <Alert
          type="error"
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          duration={5}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Código do Nível de Acesso</Label>
          <Input
            type="text"
            value={codLevel}
            onChange={(e) => setCodLevel(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nome do Nível de Acesso</Label>
          <Input
            type="text"
            value={descLevel}
            onChange={(e) => setDescLevel(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Descrição</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Salvar</Button>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
      </Form>
    </>
  );
};

AccessLevelForm.propTypes = {
  level: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AccessLevelForm;
