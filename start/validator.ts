import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'O campo {{ field }} é obrigatório',
  'string': 'O valor do campo {{ field }} deve ser uma string',
  'number': 'O valor do campo {{ field }} deve ser um número',
  'array': 'O valor do campo {{ field }} deve ser um array',
  'email': 'O valor do email não é um email válido',
  'mobile': 'O valor do telefone não é um número de telefone válido',
  'min': 'O valor de {{ field }} deve ser maior que 0',
  'senha.minLength': 'Sua senha deve ter pelo menos 6 caracteres',

  'cpf.fixedLength': 'O valor de {{ field }} deve ser um {{ field }} válido',
  'cep.fixedLength': 'O valor de {{ field }} deve ser um {{ field }} válido',
})
