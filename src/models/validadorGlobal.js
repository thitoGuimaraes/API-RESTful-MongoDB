import mongoose from 'mongoose';

//o método trim() remove qualquer espaços em branco no início e no final da string
mongoose.Schema.Types.String.set('validate', {
  validator: valor => valor.trim() !== '',
  message: ({ path }) => `O campo '${path}' foi fornecido em branco.`,
});
