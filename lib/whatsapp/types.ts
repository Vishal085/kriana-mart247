export type MetaTemplateLanguage = {
  code: string; // e.g. "en", "hi"
};

export type MetaTemplateComponentParameter =
  | { type: 'text'; text: string }
  | { type: 'currency'; currency: { fallback_value: string; code: string; amount_1000: number } }
  | { type: 'date_time'; date_time: { fallback_value: string } };

export type MetaTemplateComponent = {
  type: 'header' | 'body' | 'button';
  sub_type?: 'url' | 'quick_reply';
  index?: number;
  parameters: MetaTemplateComponentParameter[];
};

export type MetaTemplateMessagePayload = {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string; // digits e.g. "919876543210"
  type: 'template';
  template: {
    name: string;
    language: MetaTemplateLanguage;
    components?: MetaTemplateComponent[];
  };
};

export type MetaTextMessagePayload = {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: 'text';
  text: {
    preview_url?: boolean;
    body: string;
  };
};

export type MetaSendResponse = {
  messaging_product: 'whatsapp';
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
};

export type MetaApiError = {
  message: string;
  type: string;
  code: number;
  error_subcode?: number;
  fbtrace_id?: string;
};

// Webhook payload structures
export type MetaWebhookStatus = {
  id: string; // Meta message ID e.g. "wamid.HBg..."
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id: string;
  errors?: Array<{ code: number; title: string; message?: string }>;
};

export type MetaWebhookMessage = {
  from: string; // customer phone
  id: string;
  timestamp: string;
  type: 'text' | 'image' | 'button' | 'interactive';
  text?: { body: string };
};

export type MetaWebhookEntry = {
  id: string;
  changes: Array<{
    value: {
      messaging_product: 'whatsapp';
      metadata: {
        display_phone_number: string;
        phone_number_id: string;
      };
      contacts?: Array<{ profile: { name: string }; wa_id: string }>;
      messages?: MetaWebhookMessage[];
      statuses?: MetaWebhookStatus[];
    };
    field: 'messages';
  }>;
};

export type MetaWebhookPayload = {
  object: 'whatsapp_business_account';
  entry: MetaWebhookEntry[];
};
