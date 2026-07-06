CREATE DATABASE ConectaEPT;
USE ConectaEPT;

CREATE TABLE users(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha_hash VARCHAR(255) NOT NULL,
tipo ENUM('ALUNO', 'DOCENTE', 'EMPRESA', 'ADMIN')  NOT NULL,
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP );

CREATE TABLE empresas( 
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL UNIQUE,
nome_fantasia VARCHAR(100) NOT NULL,
cnpj VARCHAR(14) UNIQUE,
setor VARCHAR(50) NOT NULL,
descricao VARCHAR (255),
ativo BOOLEAN DEFAULT TRUE,
FOREIGN KEY (user_id) REFERENCES users(id) );

CREATE TABLE turmas(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
docente_id INT NOT NULL,
nome VARCHAR(100) NOT NULL,
area_formativa VARCHAR(100) NOT NULL,
instituicao VARCHAR(100) NOT NULL,
ano_semestre  VARCHAR(10) NOT NULL,
FOREIGN KEY (docente_id) REFERENCES users(id) );

CREATE TABLE alunos_turmas(
aluno_id INT NOT NULL,
turma_id INT NOT NULL,

PRIMARY KEY (aluno_id, turma_id),

FOREIGN KEY (aluno_id) REFERENCES users(id),
FOREIGN KEY (turma_id) REFERENCES turmas(id) );

CREATE TABLE desafios(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
empresa_id INT NOT NULL,
titulo VARCHAR(100) NOT NULL,
descricao VARCHAR(255) NOT NULL,
area VARCHAR(100),
prazo DATE,
recursos TEXT, 
status ENUM('PENDENTE', 'ABERTO', 'ENCERRADO') DEFAULT 'ABERTO',
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (empresa_id) REFERENCES empresas(id) ); 

CREATE TABLE desafio_turmas(
desafio_id INT NOT NULL,
turma_id INT NOT NULL,

PRIMARY KEY (desafio_id, turma_id),

FOREIGN KEY (desafio_id) REFERENCES desafios(id), 
FOREIGN KEY (turma_id) REFERENCES turmas(id) );

CREATE TABLE equipes(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
desafio_id INT NOT NULL,
nome VARCHAR (100) NOT NULL,
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (desafio_id) REFERENCES desafios(id) );

CREATE TABLE equipes_membros(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
equipe_id  INT NOT NULL,
aluno_id INT NOT NULL,

FOREIGN KEY (equipe_id) REFERENCES equipes(id),
FOREIGN KEY (aluno_id) REFERENCES users(id),

UNIQUE( equipe_id, aluno_id) );

CREATE TABLE projetos(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
equipe_id INT NOT NULL UNIQUE,
status ENUM ('EM_ANDAMENTO', 'SUBMETIDO', 'AVALIADO') DEFAULT 'EM_ANDAMENTO',
submetido_em DATETIME,

FOREIGN KEY (equipe_id) REFERENCES equipes(id) );

CREATE TABLE projeto_arquivos(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
projeto_id INT NOT NULL,
nome_original VARCHAR(255) NOT NULL,
caminho_arquivo VARCHAR(255) NOT NULL,
tipo VARCHAR(50),
tamanho BIGINT,
enviado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (projeto_id) REFERENCES projetos(id) );

CREATE TABLE diario_bordo(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
projeto_id INT NOT NULL,
aluno_id INT NOT NULL,
conteudo TEXT NOT NULL,
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (projeto_id) REFERENCES projetos(id),
FOREIGN KEY (aluno_id) REFERENCES users(id) );

CREATE TABLE avaliacoes(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
projeto_id INT NOT NULL,
avaliador_id INT NOT NULL,
tipo_avaliador ENUM ('EMPRESA', 'DOCENTE') ,
criatividade INT,
autonomia INT,
integracao_tp INT,
impacto INT,
comentario TEXT,
avaliado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (projeto_id) REFERENCES projetos(id),
FOREIGN KEY (avaliador_id) REFERENCES users(id) );

CREATE TABLE certificados(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
projeto_id INT NOT NULL,
aluno_id INT NOT NULL,
caminho_pdf VARCHAR(255) NOT NULL,
gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (projeto_id) REFERENCES projetos(id),
FOREIGN KEY (aluno_id) REFERENCES users(id),

UNIQUE (projeto_id, aluno_id) );

INSERT INTO users (nome, email, senha_hash, tipo)
VALUES ('Amanda', 'amanda@email.com', '123456', 'ALUNO');






