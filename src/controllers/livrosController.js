import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autores, livros } from '../models/index.js';

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id, {}, { autopopulate: false })
        .populate('autor', 'nome');
      //Dessa forma, desativamos a autopopulação padrão e aplicamos a nossa própria.

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado !== null) {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do livro não localizado para atualização.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: 'Livro removido com sucesso' });
      } else {
        next(new NaoEncontrado('Id do livro não localizado para exclusão.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  //  const regex = new RegExp(titulo, 'i'); -> essa opção usa javascript puro
  let busca = {};

  if (editora) busca.editora = editora;
  // if (titulo) busca.titulo = regex; -> esse if funciona com o regex no javascript puro

  if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }; // esse é um operador de busca do mongoDB que usa o regex no filtro.

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  // $gte é um operador do mongoDB que significa "Greater Than or Equal", "maior ou igual que" e o $lte significa "Less Than or Equal", "menor ou igual que", ambos podem ser usados como filtro de busca. Para buscas por intervalos (maior, menor, entre), o MongoDB exige operadores como $gte e $lte, que precisam ser objetos, não valores simples.

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      const autorId = autor._id;
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
