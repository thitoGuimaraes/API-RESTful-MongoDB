import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, 'O título do livro é obrigatório'],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'Vincular um(a) autor(a) é obrigatório'],
    autopopulate: true,
    //autopopulate: { select: 'nome' } // Com a propriedade select, é possível configurar a autopopulação. Assim, o padrão do plugin será autopopular o campo de autor apenas com o seu nome.
  },
  editora: {
    type: String,
    required: [true, 'A Editora é obrigatória'],
    //NOTE: uma forma de criar essa validação é com o "enum" nativo do mongoose, mas não aceita interpolação de string (placeholder)
    // enum: {
    //   values: ['Abril', 'Casa do Código', 'Alura'],
    //   message: 'A editora fornecida não é um valor permitido'
    // }
    validate: {
      validator: function (value) {
        return ['Abril', 'Casa do Código', 'Alura'].includes(value);
      },
      message: props => `A editora '${props.value}' não é um valor permitido.`,
    },
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: valor => {
        return valor >= 10 && valor <= 5000;
      },
      message:
        'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}.',
    },
    //NOTE: uma forma de criar essa validação é com o min e max, nativos do mongoose. O {VALUE} é um recurso interno do mongoose para fornecer o valor indicado pelo usuário.
    // min: [10, 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],
    // max: [5000, 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],
  },
});

livroSchema.plugin(autopopulate);

const livros = mongoose.model('livros', livroSchema);

export default livros;
