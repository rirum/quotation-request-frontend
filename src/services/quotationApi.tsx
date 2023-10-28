import api from './api';

interface QuotationData {
  userId?: number;
  client_name: string;
  client_email?: string;
  client_address?: string;
  quotation_description?: string;
  project_preview?: string;
  quotation_total_amount: string;
  quotation_method_payment?: string;
}

export async function postQuotation(data: QuotationData, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await api.post('/quotation', data, { headers });
  return response.data;
}

export async function getLastQuotationNumber() {
  const response = await api.get('/quotation');
  return response;
}
