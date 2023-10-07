import api from './api';

interface QuotationData {
  client_name: string;
  client_email?: string;
  client_address?: string;
  quotation_description?: string;
  project_preview?: string;
  quotation_total_amount: string;
  quotation_method_payment?: string;
}

export async function postQuotation(data: QuotationData) {
  const response = await api.post('/quotation', data);
  return response.data;
}
