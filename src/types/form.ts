export interface FormData {
  nome: string;
  nomeMae: string;
  documento: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
}

export const initialFormData: FormData = {
  nome: '',
  nomeMae: '',
  documento: '',
  cidade: '',
  estado: '',
  telefone: '',
  email: '',
  cep: '',
  logradouro: '',
  bairro: '',
  numero: '',
  complemento: '',
};
