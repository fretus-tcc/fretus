SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
/* SET time_zone = "+00:00"; */

CREATE DATABASE fretus;
USE fretus;

CREATE TABLE duvidas (
  id_duvida int(11) AUTO_INCREMENT NOT NULL,
  titulo_duvida varchar(125) NOT NULL,
  conteudo_duvida text NOT NULL,
  data_duvida timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id_duvida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE duvidas 
  ADD slug_duvida VARCHAR(150) NOT NULL AFTER data_duvida;

INSERT INTO duvidas (titulo_duvida, conteudo_duvida, slug_duvida) VALUES
('Como faço para me cadastrar como entregador?', ' 1. *Acesse o Nosso Site:\r\n\r\n    Visite nosso site [clicando aqui](/) e vá para a seção de cadastro de motoristas/entregadores. Você encontrará um link de \"Cadastro\" em nossa página inicial.\r\n\r\n 2. **Preencha o Formulário de Cadastro:\r\n\r\n    Ao clicar na opção de cadastro, você será redirecionado para um formulário de inscrição. Este formulário é projetado para coletar informações essenciais, como seu nome, endereço de e-mail, CPF e etc.\r\n\r\n 3. **Forneça Documentos Necessários:\r\n\r\n    Em seguida, você precisará fornecer cópias de documentos obrigatórios, como sua carteira de motorista válida, registro do veículo (se aplicável), e outros documentos que possam ser exigidos pela legislação local ou pela nossa empresa.\r\n\r\n 4. **Verificação e Avaliação:\r\n\r\n    Após o envio dos documentos, nossa equipe de suporte revisará suas informações e realizará uma avaliação inicial. Isso pode incluir verificações de antecedentes, histórico de condução e outros critérios estabelecidos pela empresa.\r\n\r\n 5. **Aprovação e Ativação:\r\n\r\n    Após a conclusão bem-sucedida do processo de cadastro, você receberá uma notificação de aprovação. Isso ativará sua conta como motorista/entregador em nossa plataforma.\r\n\r\n 6. **Comece a Aceitar Pedidos:*\r\n\r\n    Parabéns! Agora você está pronto para começar a receber e aceitar pedidos de entrega. Use nossa plataforma online para ficar disponível para pedidos.', 'como-faco-para-me-cadastrar-como-entregador'),
('O que fazer em caso de problemas durante a entrega?', 'Entendemos que, ocasionalmente, podem ocorrer problemas durante o processo de entrega. Estamos comprometidos em oferecer a você a melhor experiência possível e estamos aqui para ajudar a resolver qualquer contratempo que possa surgir. Se você enfrentar problemas durante a entrega, siga estas etapas para garantir uma resolução eficaz:\r\n\r\n1. *Entre em Contato Conosco Imediatamente:\r\n\r\n    Assim que identificar um problema, entre em contato conosco imediatamente. Nossa equipe de suporte ao cliente está disponível para ajudar a solucionar suas preocupações.\r\n\r\n2. **Forneça Detalhes Precisos:\r\n\r\n    Ao entrar em contato conosco, seja o mais detalhado possível ao descrever o problema. Isso inclui fornecer informações como o número de rastreamento da entrega, a data e a hora da ocorrência do problema, e uma descrição completa da situação.\r\n\r\n3. **Documente o Problema:*\r\n\r\n    Fotografe ou grave vídeos para documentar o estado dos produtos ou da embalagem. Isso pode ser valioso para avaliar o dano e acelerar o processo de resolução.\r\n\r\nSeja qual for o problema, nossa equipe está à disposição para ajudar e trabalhar em conjunto para encontrar a melhor solução. Sua satisfação é fundamental para nós, e estamos comprometidos em superar suas expectativas sempre que possível.', 'o-que-fazer-em-caso-de-problemas-durante-a-entrega'),
('Como funciona o pagamento para os entregadores?', 'O sistema de pagamento para nossos entregadores é uma parte essencial do nosso compromisso em manter uma parceria justa e transparente. Entendemos que a clareza e a confiabilidade no pagamento são fundamentais para a satisfação de nossos entregadores. Portanto, gostaríamos de explicar detalhadamente como funciona o pagamento em nossa plataforma:\r\n\r\n1. *Recebimento de Pedidos:\r\n\r\n    O processo começa quando você, como entregador, aceita um pedido por meio de nossa plataforma. Cada pedido terá um valor de pagamento associado, que pode variar com base em diversos fatores, como a distância, a complexidade da entrega e a demanda atual, ou com o que você combinou com o cliente (não nos responsabilizamos por essa parte).\r\n\r\n2. **Pagamento Regular:\r\n\r\n    Os pagamentos aos entregadores geralmente são feitos regularmente, de acordo com uma programação definida. Isso pode ser semanal ou quinzenal. Os valores são transferidos para a conta bancária fornecida por você durante o processo de cadastro.\r\n\r\n3. **Transparência e Comprovantes:*\r\n \r\n    Fornecemos comprovantes detalhados de cada transação para garantir total transparência no processo de pagamento. Você pode acessar esses comprovantes em sua conta na plataforma.\r\n\r\nEntendemos que você confia em nós para fornecer uma plataforma justa e confiável para ganhar a vida como entregador. Estamos comprometidos em garantir que você seja devidamente compensado por seu trabalho e que todo o processo de pagamento seja transparente e eficiente. Estamos aqui para ajudar a garantir que sua experiência como entregador seja positiva e recompensadora.', 'como-funciona-o-pagamento-para-os-entregadores'),
('Existe um limite de peso ou tamanho para os itens que posso enviar?', 'Sim, em nossa plataforma, há geralmente limites de peso e tamanho para os itens que você pode enviar. Estes limites são estabelecidos pelo veículo escolhido para fazer a entrega. Entender esses limites é importante para garantir que suas entregas ocorram sem problemas. Abaixo, detalhamos como esses limites funcionam:\r\n\r\n## Limites de Peso:\r\n\r\n- *Peso Máximo:\r\n    \r\n    Geralmente, temos um peso máximo permitido para cada tipo de veículo. Por exemplo, em entregas de moto ou carro, o peso máximo permitido é menor do que em entregas feitas por veículos maiores (van e caminhão).\r\n    \r\n- **Verificação de Peso:*\r\n    \r\n    Os entregadores são instruídos a verificar o peso das encomendas antes da coleta. Isso ajuda a garantir que os itens estejam dentro dos limites estabelecidos. Se um item exceder o peso máximo permitido, o entregador pode recusar a entrega ou solicitar assistência adicional.\r\n    \r\n\r\n## Verificação durante o Processo de Solicitação:\r\n\r\nDurante o processo de solicitação em nossa plataforma, você receberá informações claras sobre os limites de peso, ao escolher o veículo da entrega. Isso ajuda a garantir que você esteja ciente das restrições ao selecionar seus itens para entrega.\r\n\r\nEntender e respeitar os limites de peso e tamanho é importante para garantir uma experiência de entrega tranquila e eficaz.', 'existe-um-limite-de-peso-ou-tamanho-para-os-itens-que-posso-enviar'),
('Posso agendar uma entrega para um horário específico?', 'Sim, oferecemos a opção de agendar entregas para horários específicos em nossa plataforma. Entendemos que a conveniência é fundamental para nossos clientes, e agendar uma entrega é uma maneira eficaz de garantir que ela ocorra no momento mais adequado para você.\r\n\r\n1. *Selecione a Opção de Agendamento:\r\n    \r\n    Durante o processo de solicitação, você terá a opção de escolher o horário e a data desejados para a entrega. Essa opção está disponível após os detalhes da entrega (Local de partida e de destino).\r\n    \r\n2. **Escolha o Horário Conveniente:\r\n    \r\n    Você poderá selecionar um dia e horário específico para a entrega.\r\n    \r\n\r\n## Benefícios do Agendamento de Entrega:\r\n\r\n-   **Conveniência:* O agendamento de entrega permite que você escolha o momento mais conveniente para receber sua encomenda, evitando a necessidade de esperar em casa durante longos períodos.\r\n-   *Planejamento:* É útil para planejar entregas em datas específicas, como aniversários, eventos ou ocasiões especiais, garantindo que suas encomendas cheguem no momento certo.\r\n-   *Flexibilidade:* Você tem a flexibilidade de escolher entre diferentes horários de entrega com base em sua agenda e preferências pessoais.', 'posso-agendar-uma-entrega-para-um-horario-especifico'),
('É possível adicionar instruções especiais para a entrega?', 'Sim, é absolutamente possível adicionar instruções especiais para suas entregas em nossa plataforma. Entendemos que cada entrega pode ter suas particularidades e que você pode ter necessidades específicas para garantir que a entrega seja realizada da maneira desejada.\r\n\r\n## Como Adicionar Instruções Especiais:\r\n\r\n1. *Durante o Processo de Solicitação:\r\n    \r\n    Após solicitar uma entrega em nossa plataforma, poderá combinar a entrega com o entregador, pelo chat. Também é possível deixar uma observação ao motorista, na página de pagamento.\r\n    \r\n2. **Clareza e Detalhes:\r\n    \r\n    Ao fornecer instruções especiais, é fundamental ser claro e detalhado. Quanto mais informações você fornecer, melhor o entregador poderá atender às suas expectativas.\r\n    \r\n3. **Garantia de Privacidade e Segurança:*\r\n    \r\n    Suas instruções especiais são tratadas com sigilo e respeito à sua privacidade. Elas são destinadas exclusivamente ao entregador responsável pela sua entrega.\r\n    \r\n\r\nEsteja à vontade para adicionar instruções especiais sempre que necessário durante o processo de solicitação. Estamos aqui para atender às suas necessidades individuais e garantir que suas entregas sejam realizadas conforme suas preferências.', 'e-possivel-adicionar-instrucoes-especiais-para-a-entrega'),
('Informações detalhadas sobre pesos e dimensões das cargas', '## Como identificar uma carga pequena?\r\n- **Peso:** Até 11,5 kg\r\n- **Dimensões:** Até 20 x 10 cm\r\n- As cargas pequenas são ideais para itens leves e compactos. Se a sua carga se encaixa nesses critérios, ela é considerada pequena e geralmente requer menos cuidado especial durante o transporte.\r\n- **Exemplos:**\r\nPequenos pacotes de documentos ou acessórios eletrônicos, como carregadores e fones de ouvido.\r\nProdutos de beleza em frascos pequenos, como cremes ou perfumes.\r\nLivros ou catálogos de tamanho reduzido.\r\n\r\n##\r\n## Como identificar uma carga média?\r\n\r\n- **Peso:** De 11,5 kg a 80 kg\r\n- **Dimensões:** De 20 x 10 cm até 60 x 70 cm\r\n- Cargas médias são um pouco mais pesadas e volumosas, sendo adequadas para itens de tamanho intermediário e peso moderado. Certifique-se de que a embalagem e o suporte são adequados para o peso e o tamanho para garantir um transporte seguro.\r\n- **Exemplos:**\r\nAcervos de roupas ou calçados.\r\nEquipamentos eletrônicos de tamanho médio, como impressoras ou pequenos eletrodomésticos.\r\nMóveis desmontados, como cadeiras ou mesas pequenas.\r\n\r\n##\r\n## Como identificar uma carga grande?\r\n\r\n- **Peso:** Acima de 80 kg\r\n- **Dimensões:** Acima de 60 x 70 cm\r\n- Cargas grandes são aquelas que são bastante pesadas ou volumosas. É importante considerar que essas cargas podem exigir equipamentos especiais para o manuseio e transporte, além de um planejamento detalhado para garantir a segurança e a integridade dos itens durante o deslocamento.\r\n- **Exemplos:**\r\nMóveis grandes, como sofás, mesas de jantar ou armários.\r\nEquipamentos pesados, como máquinas de lavar ou geladeiras.\r\nPaletes de mercadorias ou grandes volumes de produtos em caixas.\r\n', 'informacoes-detalhadas-sobre-pesos-e-dimensoes-das-cargas');


-- -
/* Tabelas cadastros  Não mexer Alex está organizando isso */----------------------------------------------------
-- Table 
-- -----------------------------------------------------

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FRETUS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FRETUS
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS FRETUS /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE FRETUS;
-- -----------------------------------------------------
-- Table FRETUS.USUARIOS
-- -----------------------------------------------------

-- Table structure for table tipo_usuario

DROP TABLE IF EXISTS tipo_usuario;
CREATE TABLE tipo_usuario (
  id_tipo_usuario int NOT NULL AUTO_INCREMENT,
  tipo_usuario varchar(25) DEFAULT NULL,
  descricao_usuario varchar(155) DEFAULT NULL,
  status_tipo_usuario int DEFAULT '1',
  PRIMARY KEY (id_tipo_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES tipo_usuario WRITE;
/*!40000 ALTER TABLE tipo_usuario DISABLE KEYS */;
INSERT INTO tipo_usuario VALUES (1,'Comum','Usuário cadastrado no sistema',1),(2,'Encarregado','Usuário com acesso a consultas na área administrativa',1),(3,'ADM','Usuário com acesso a consultas e edições na área administrativa',1);
/*!40000 ALTER TABLE tipo_usuario ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id_usuario int NOT NULL AUTO_INCREMENT,
  /* nome_usuario varchar(45) DEFAULT NULL, */
  nome_usuario varchar(45) NOT NULL,
  /* user_usuario varchar(45) NULL, */
  /* senha_usuario char(60) DEFAULT NULL, */
  senha_usuario char(60) NOT NULL,
  /* email_usuario varchar(45) DEFAULT NULL, */
  email_usuario varchar(45) NOT NULL,
  /* fone_usuario varchar(11) NULL, */
  tipo_usuario int NOT NULL DEFAULT '1',
  status_usuario int DEFAULT '1',
  /* cpf_usuario CHAR(14) DEFAULT NULL, */
  cpf_usuario CHAR(14) NOT NULL,
  /* telefone CHAR(11) NULL, */
  telefone_usuario CHAR(15) NOT NULL,
  /* data_usuario DATE NULL, */
  data_usuario DATE NOT NULL,
  descricao_usuario TEXT NULL,
  /* foto_de_perfil VARCHAR(255) NULL, */
  foto_de_perfil MEDIUMBLOB NULL,
  /* cod_tipo_usuario INT NULL, */
  notificacao_sms_estado INT NULL,
  notificacao_email_estado INT NULL,
  /* desr_tipo_usuario VARCHAR(45) NULL, */
  PRIMARY KEY (id_usuario),
  KEY fk_usuario_tipo_usuario_idx (tipo_usuario),
  UNIQUE INDEX idUSUARIOS_UNIQUE (id_usuario ASC) VISIBLE,
  UNIQUE INDEX email_usuario_UNIQUE (email_usuario ASC) VISIBLE,
  UNIQUE INDEX telefone_UNIQUE (telefone_usuario ASC) VISIBLE,
  UNIQUE INDEX cpf_usuario_UNIQUE (cpf_usuario ASC) VISIBLE, 
  CONSTRAINT fk_usuario_tipo_usuario FOREIGN KEY (tipo_usuario) REFERENCES tipo_usuario (id_tipo_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO usuario (nome_usuario, cpf_usuario, telefone_usuario, data_usuario, email_usuario, senha_usuario, tipo_usuario)
VALUES ('Admin', '347.090.530-49', '(65) 97369-0035', '2022-01-01', 'admin@admin.com', '$2a$10$OzE7w2Ra1alz9aP5w.bhEOjNRV7Jq1/4TslgKS4KLEIcEmMA6bh..', '3');

-- -----------------------------------------------------
-- Table FRETUS.DETALHAMENTO_ENTREGADOR
-- -----------------------------------------------------
DROP TABLE IF EXISTS detalhamento_entregador;
CREATE TABLE IF NOT EXISTS FRETUS.detalhamento_entregador (
  id_usuario INT NOT NULL,
  id_entregador INT NOT NULL AUTO_INCREMENT,
  raio_de_atuacao FLOAT NOT NULL,
  status_disponivel INT NOT NULL DEFAULT '2',
  data_disponivel DATETIME NULL,
  status_aprovacao INT NOT NULL DEFAULT '0',
  /* cnh_entregador VARCHAR(255) NOT NULL, */
  cnh_entregador MEDIUMBLOB NOT NULL,
  crvl_entregador VARCHAR(255) NULL,
  ipva_entregador VARCHAR(255) NULL,
  qtn_visualizacoes_perfil INT NULL DEFAULT '0',
  qtn_cupons_ativos INT NULL DEFAULT '0',
  qtn_entregas_aceitas INT NULL DEFAULT '0',
  qtn_entregas_canceladas INT NULL DEFAULT '0',
  qtn_entregas_recusadas INT NULL DEFAULT '0',
  disponivel_inicio TIME NULL,
  disponivel_final TIME NULL,
  qtn_entregas_solicitadas INT NULL DEFAULT '0',
  INDEX fk_ESPECIFICA_ENTREGADOR_USUARIOS1_idx (id_usuario ASC) VISIBLE,
  PRIMARY KEY (id_entregador),
  UNIQUE INDEX id_entregador_UNIQUE (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_ESPECIFICA_ENTREGADOR_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create a trigger that will update the data_disponivel column if status_disponivel changes.
drop trigger if exists upd_disponivel;
delimiter //
create trigger upd_disponivel BEFORE UPDATE ON detalhamento_entregador
FOR EACH ROW
BEGIN
  IF (  (old.status_disponivel is not null and new.status_disponivel is not null and old.status_disponivel <> new.status_disponivel)
      OR (old.status_disponivel is null and new.status_disponivel is not null)
      OR (old.status_disponivel is not null and new.status_disponivel is null)  ) THEN
    SET NEW.data_disponivel = CURRENT_TIMESTAMP();
  END IF;
END;//
delimiter ;

INSERT INTO usuario (nome_usuario, cpf_usuario, telefone_usuario, data_usuario, email_usuario, senha_usuario, tipo_usuario, foto_de_perfil, descricao_usuario)
VALUES ('Cliente', '536.131.950-38', '(22) 96656-1935', '2006-01-01', 'teste1@teste.com', '$2a$10$pcfJQWXoSsasBNM2HrLMLeEhB3I9t9RElpMarZB6kPWUqgoTQ/oJS', '1', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082', 'Cliente necessitando de entregas');

-- -----------------------------------------------------
-- Table FRETUS.VEICULOS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.veiculos (
  id_veiculo INT NOT NULL AUTO_INCREMENT,
  tipo_veiculo VARCHAR(45) NOT NULL,
  placa CHAR(9) NOT NULL,
  modelo_veiculo VARCHAR(45) NOT NULL,
  id_entregador INT NOT NULL,
  tipo_bauleto VARCHAR(45) NULL,
  /* foto_veiculo VARCHAR(255) NOT NULL, */
  foto_veiculo MEDIUMBLOB NOT NULL,
  PRIMARY KEY (id_veiculo),
  UNIQUE INDEX placa_UNIQUE (placa ASC) VISIBLE,
  INDEX fk_VEICULOS_DETALHAMENTO_ENTREGADOR1_idx (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_VEICULOS_DETALHAMENTO_ENTREGADOR1
    FOREIGN KEY (id_entregador)
    REFERENCES FRETUS.DETALHAMENTO_ENTREGADOR (id_entregador)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO usuario (nome_usuario, cpf_usuario, telefone_usuario, data_usuario, email_usuario, senha_usuario, tipo_usuario, foto_de_perfil, descricao_usuario)
VALUES ('Entregador', '506.101.180-56', '(46) 96399-7271', '2006-01-01', 'teste2@teste.com', '$2a$10$I.loNVPUL4l7sfU3sSkFUeXlioyh8pUiDy7UpOOgjm3q0ia4b12Ma', '2', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082', 'Entregador rápido e confiável');
INSERT INTO detalhamento_entregador (id_usuario, raio_de_atuacao, cnh_entregador, status_aprovacao)
VALUES ('3', '30', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082', '2');
INSERT INTO veiculos (tipo_veiculo, placa, modelo_veiculo, id_entregador, foto_veiculo) 
VALUES ('moto', 'test-0100', 'xj6', '1', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082');

INSERT INTO usuario (nome_usuario, cpf_usuario, telefone_usuario, data_usuario, email_usuario, senha_usuario, tipo_usuario, foto_de_perfil, descricao_usuario)
VALUES ('Entregador 2', '956.126.680-66', '(27) 97568-1527', '2006-01-01', 'teste22@teste.com', '$2a$10$I.loNVPUL4l7sfU3sSkFUeXlioyh8pUiDy7UpOOgjm3q0ia4b12Ma', '2', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082', 'Entregador rápido e confiável');
INSERT INTO detalhamento_entregador (id_usuario, raio_de_atuacao, cnh_entregador, status_aprovacao)
VALUES ('4', '30', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082', '2');
INSERT INTO veiculos (tipo_veiculo, placa, modelo_veiculo, id_entregador, foto_veiculo) 
VALUES ('moto', 'test-0110', 'bis', '2', x'89504E470D0A1A0A0000000D494844520000001000000010080200000090916836000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000001E49444154384F6350DAE843126220493550F1A80662426C349406472801006AC91F1040F796BD0000000049454E44AE426082');

-- -----------------------------------------------------
-- Table FRETUS.CEP
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.CEP (
  id_cep INT NOT NULL AUTO_INCREMENT,
  complemento VARCHAR(45) NOT NULL,
  num INT NOT NULL,
  cep CHAR(8) NOT NULL,
  iid_usuario INT NOT NULL,
  PRIMARY KEY (id_cep),
  UNIQUE INDEX IDENDERECO_UNIQUE (id_cep ASC) VISIBLE,
  INDEX fk_CEP_USUARIOS1_idx (iid_usuario ASC) VISIBLE,
  CONSTRAINT fk_CEP_USUARIOS1
    FOREIGN KEY (iid_usuario)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


/* -- -----------------------------------------------------
-- Table FRETUS.DETALHAMENTO_ENTREGADOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.DETALHAMENTO_ENTREGADOR (
  raio_de_atuacao FLOAT NOT NULL,
  id_usuario INT NOT NULL,
  id_entregador INT NOT NULL AUTO_INCREMENT,
  qtn_visualizacoes_perfil INT NOT NULL,
  qtn_cupons_ativos INT NOT NULL,
  qtn_entregas_aceitas INT NOT NULL,
  qtn_entregas_canceladas INT NOT NULL,
  qtn_entregas_recusadas INT NOT NULL,
  disponivel_inicio TIME NULL,
  disponivel_final TIME NULL,
  qtn_entregas_solicitadas INT NOT NULL,
  INDEX fk_ESPECIFICA_ENTREGADOR_USUARIOS1_idx (id_usuario ASC) VISIBLE,
  PRIMARY KEY (id_entregador),
  UNIQUE INDEX id_entregador_UNIQUE (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_ESPECIFICA_ENTREGADOR_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */


-- -----------------------------------------------------
-- Table FRETUS.PEDIDOS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.pedidos (
  id_pedido INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_entregador INT NULL,
  partida_pedido VARCHAR(400) NOT NULL,
  destino_pedido VARCHAR(400) NOT NULL,
  latitude_partida DECIMAL(8,6) NOT NULL,
  longitude_partida DECIMAL(9,6) NOT NULL,
  latitude_destino DECIMAL(8,6) NOT NULL,
  longitude_destino DECIMAL(9,6) NOT NULL,
  agendamento INT NOT NULL,
  data_agendamento DATETIME NULL,
  horario_agendamento DATETIME NULL,
  cod_carga ENUM('P', 'M', 'G') NOT NULL,
  veiculo_pedido VARCHAR(45) NOT NULL,
  /* preco_sugerido_pedido DECIMAL(10,2) NOT NULL, */
  preco_pedido DECIMAL(10,2) NOT NULL,
  data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  /* id_usuario_cliente INT NOT NULL,
  data_agendada DATETIME NULL,
  id_entregador INT NOT NULL, */
  PRIMARY KEY (id_pedido), 
  UNIQUE INDEX IDPEDIDO_UNIQUE (id_pedido ASC) VISIBLE,
  INDEX fk_PEDIDOS_USUARIOS1_idx (id_cliente ASC) VISIBLE,
  INDEX fk_PEDIDOS_DETALHAMENTO_ENTREGADOR1_idx (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_PEDIDOS_USUARIOS1
    FOREIGN KEY (id_cliente)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PEDIDOS_DETALHAMENTO_ENTREGADOR1
    FOREIGN KEY (id_entregador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.entregadores_pedidos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.entregadores_pedidos (
  id_pedido INT NOT NULL,
  id_entregador INT NOT NULL,
  status_resposta ENUM('ACEITO', 'NEGADO') NULL,
  PRIMARY KEY (id_pedido, id_entregador),
  INDEX fk_PEDIDOS_ENTREGADORES1_idx (id_pedido ASC) VISIBLE,
  INDEX fk_ENTREGADORES_PEDIDOS1_idx (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_PEDIDOS_ENTREGADORES1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.pedidos (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ENTREGADORES_PEDIDOS1
    FOREIGN KEY (id_entregador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.status_entrega
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.status_entrega (
  id_status INT NOT NULL AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  status_entrega INT NOT NULL,
  data_status DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_status), 
  UNIQUE INDEX IDSTATUS_UNIQUE (id_status ASC) VISIBLE,
  INDEX fk_PEDIDOS_STATUS1_idx (id_pedido ASC) VISIBLE,
  CONSTRAINT fk_PEDIDOS_STATUS1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.pedidos (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

/* -- -----------------------------------------------------
-- Table FRETUS.historico
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.historico (
  id_entrega INT NOT NULL AUTO_INCREMENT,
  data_realizada DATETIME NOT NULL,
  tempo_realizada_horas INT NOT NULL,
  id_pedido INT NOT NULL,
  id_entrega_registrada INT NOT NULL,
  cep_entrega CHAR(8) NOT NULL,
  complemento_entrega VARCHAR(45) NOT NULL,
  num_entrega INT NOT NULL,
  tempo_realizada_minutos INT NOT NULL,
  observacao_cliente TEXT(200) NULL,
  terminio_entrega DATETIME NOT NULL,
  id_pagamento INT NOT NULL,
  PRIMARY KEY (id_entrega),
  INDEX fk_ENTREGA_REALIZADA_PEDIDOS1_idx (id_pedido ASC) VISIBLE,
  INDEX fk_historico_PAGAMENTOS1_idx (id_pagamento ASC) VISIBLE,
  CONSTRAINT fk_ENTREGA_REALIZADA_PEDIDOS1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.PEDIDOS (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_historico_PAGAMENTOS1
    FOREIGN KEY (id_pagamento)
    REFERENCES FRETUS.PAGAMENTOS (id_pagamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */


/* -- -----------------------------------------------------
-- Table FRETUS.PRODUTOS_ENTREGA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.PRODUTOS_ENTREGA (
  id_produto INT NOT NULL AUTO_INCREMENT,
  peso FLOAT NULL,
  id_pedido INT NOT NULL,
  tamanho_produto VARCHAR(45) NOT NULL,
  tipo_veiculo_solicitado VARCHAR(45) NOT NULL,
  cod_tamanho INT NOT NULL,
  altura_produto FLOAT NULL,
  comprimento_produto FLOAT NULL,
  PRIMARY KEY (id_produto),
  INDEX fk_PRODUTOS_ENTREGA_PEDIDOS1_idx (id_pedido ASC) VISIBLE,
  CONSTRAINT fk_PRODUTOS_ENTREGA_PEDIDOS1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.PEDIDOS (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */


-- -----------------------------------------------------
-- Table FRETUS.AC_ENTREGA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.AC_ENTREGA (
  id_ac INT NOT NULL,
  nome_ac VARCHAR(45) NOT NULL,
  cpf_ac CHAR(11) NOT NULL,
  endereco_ac VARCHAR(45) NOT NULL,
  /* id_entrega INT NOT NULL, */
  PRIMARY KEY (id_ac),
  UNIQUE INDEX cpf_ac_UNIQUE (cpf_ac ASC) VISIBLE
  /* INDEX fk_AC_ENTREGA_ENTREGA_REALIZADA1_idx (id_entrega ASC) VISIBLE,
  CONSTRAINT fk_AC_ENTREGA_ENTREGA_REALIZADA1
    FOREIGN KEY (id_entrega)
    REFERENCES FRETUS.historico (id_entrega)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION */)
ENGINE = InnoDB;

/* -- -----------------------------------------------------
-- Table FRETUS.DESTINO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.DESTINO (
  id_coleta_entrega INT NOT NULL AUTO_INCREMENT,
  endereco VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_coleta_entrega),
  UNIQUE INDEX IDENTREGAS_UNIQUE (id_coleta_entrega ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.COLETA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.COLETA (
  id_coleta INT NOT NULL,
  endereco_coleta VARCHAR(45) NOT NULL,
  cep_colerta CHAR(8) NOT NULL,
  id_pedido INT NOT NULL,
  PRIMARY KEY (id_coleta),
  UNIQUE INDEX cep_colerta_UNIQUE (cep_colerta ASC) VISIBLE,
  INDEX fk_COLETA_PEDIDOS1_idx (id_pedido ASC) VISIBLE,
  CONSTRAINT fk_COLETA_PEDIDOS1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.PEDIDOS (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.COLETA_has_DESTINO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.COLETA_has_DESTINO (
  COLETA_id_coleta INT NOT NULL,
  DESTINO_id_coleta_entrega INT NOT NULL,
  PRIMARY KEY (COLETA_id_coleta, DESTINO_id_coleta_entrega),
  INDEX fk_COLETA_has_DESTINO_DESTINO1_idx (DESTINO_id_coleta_entrega ASC) VISIBLE,
  INDEX fk_COLETA_has_DESTINO_COLETA1_idx (COLETA_id_coleta ASC) VISIBLE,
  CONSTRAINT fk_COLETA_has_DESTINO_COLETA1
    FOREIGN KEY (COLETA_id_coleta)
    REFERENCES FRETUS.COLETA (id_coleta)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_COLETA_has_DESTINO_DESTINO1
    FOREIGN KEY (DESTINO_id_coleta_entrega)
    REFERENCES FRETUS.DESTINO (id_coleta_entrega)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */

-- -----------------------------------------------------
-- Table FRETUS.CUPONS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.cupons (
  id_cupom INT NOT NULL AUTO_INCREMENT,
  tipo_cupom ENUM('1', '2') NOT NULL,
  codigo_cupom VARCHAR(45) NOT NULL,
  porcentagem_cupom INT NOT NULL,
  /* prazo_cupon DATETIME NOT NULL, */
  uso_restante_cupom INT NULL,
  status_cupom INT NOT NULL DEFAULT '1',
  id_criador INT NULL,
  id_compartilhado INT NULL,
  /* id_usuario_utilizador INT NOT NULL, */
  PRIMARY KEY (id_cupom),
  UNIQUE INDEX IDCUPON_UNIQUE (id_cupom ASC) VISIBLE,
  UNIQUE INDEX CODIGOCUPON_UNIQUE (codigo_cupom ASC) VISIBLE,
  INDEX fk_CUPONS_USUARIOS1_idx (id_criador ASC) VISIBLE,
  /* INDEX fk_CUPONS_USUARIOS2_idx (id_usuario_utilizador ASC) VISIBLE, */
  CONSTRAINT fk_CUPONS_USUARIOS1
    FOREIGN KEY (id_criador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_CUPONS_USUARIOS2
    FOREIGN KEY (id_compartilhado)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION /* ,
  CONSTRAINT fk_CUPONS_USUARIOS2
    FOREIGN KEY (id_usuario_utilizador)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION */)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.USUARIOS_has_CUPONS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.usuario_cupons (
  id_usuario INT NOT NULL,
  id_cupom INT NOT NULL,
  estado_cupom ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (id_usuario, id_cupom),
  INDEX fk_USUARIOS_has_CUPONS_CUPONS1_idx (id_cupom ASC) VISIBLE,
  INDEX fk_USUARIOS_has_CUPONS_USUARIOS1_idx (id_usuario ASC) VISIBLE,
  CONSTRAINT fk_USUARIOS_has_CUPONS_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_USUARIOS_has_CUPONS_CUPONS1
    FOREIGN KEY (id_cupom)
    REFERENCES FRETUS.cupons (id_cupom)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

/* -- -----------------------------------------------------
-- Table FRETUS.RAKING
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.RAKING (
  id_posicao INT NOT NULL,
  qnt_entregas INT NOT NULL,
  media_avaliacao FLOAT NOT NULL,
  id_usuario INT NOT NULL,
  media_final FLOAT NOT NULL,
  meida_semanal FLOAT NOT NULL,
  media_mensal FLOAT NOT NULL,
  PRIMARY KEY (id_posicao),
  INDEX fk_RAKING_USUARIOS1_idx (id_usuario ASC) VISIBLE,
  CONSTRAINT fk_RAKING_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */

-- -----------------------------------------------------
-- Table FRETUS.favoritados
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.favoritados (
  id INT NOT NULL AUTO_INCREMENT,
  id_favoritou INT NOT NULL,
  id_favoritado INT NOT NULL,
  /* id_usuario INT NOT NULL,
  id_usuario_favoritou INT NOT NULL,
  id_usuario_favoritado INT NOT NULL, */
  PRIMARY KEY (id),
  UNIQUE (id_favoritou, id_favoritado),
  /* INDEX fk_FAVORITADOS_USUARIOS1_idx (id_usuario ASC) VISIBLE, */
  INDEX fk_FAVORITADOS_USUARIOS2_idx (id_favoritou ASC) VISIBLE,
  INDEX fk_FAVORITADOS_USUARIOS3_idx (id_favoritado ASC) VISIBLE,
  /* CONSTRAINT fk_FAVORITADOS_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION, */
  CONSTRAINT fk_FAVORITADOS_USUARIOS2
    FOREIGN KEY (id_favoritou)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_FAVORITADOS_USUARIOS3
    FOREIGN KEY (id_favoritado)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table FRETUS.pagamentos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.pagamentos (
  id_pagamento INT NOT NULL AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  /* data_transicao DATETIME NOT NULL, */
  /* valor_pago DECIMAL(10,2) NOT NULL, */
  /* preco_sugerido DECIMAL(10,2) NOT NULL, */
  /* metodo_pagamento VARCHAR(45) NOT NULL, */
  estado_pagamento ENUM('aprovado', 'pendente') NOT NULL DEFAULT 'pendente',
  /* id_usuario_pagador INT NOT NULL, */
  /* id_usuario_recebidor INT NOT NULL, */
  id_preferencia_mp VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_pagamento),
  UNIQUE INDEX id_pedido_pagamento_UNIQUE (id_pedido ASC) VISIBLE,
  INDEX fk_PAGAMENTOS_USUARIOS1_idx (id_pedido ASC) VISIBLE,
  CONSTRAINT fk_PAGAMENTOS_USUARIOS1
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.pedidos (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  /* INDEX fk_PAGAMENTOS_USUARIOS1_idx (id_usuario_pagador ASC) VISIBLE,
  INDEX fk_PAGAMENTOS_USUARIOS2_idx (id_usuario_recebidor ASC) VISIBLE,
  CONSTRAINT fk_PAGAMENTOS_USUARIOS1
    FOREIGN KEY (id_usuario_pagador)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PAGAMENTOS_USUARIOS2
    FOREIGN KEY (id_usuario_recebidor)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION */)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table FRETUS.CHAT
-- -----------------------------------------------------
/* CREATE TABLE IF NOT EXISTS FRETUS.CHAT (
  id_mensagem INT NOT NULL,
  conteudo_mensagem TEXT(1500) NOT NULL,
  id_conversa INT NOT NULL AUTO_INCREMENT,
  tipo_mensagem VARCHAR(45) NOT NULL,
  data DATETIME NOT NULL,
  id_usuario INT NOT NULL,
  id_usuario_destinatario INT NOT NULL,
  id_usuario_rementente INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_conversa),
  UNIQUE INDEX id_conversa_UNIQUE (id_conversa ASC) VISIBLE,
  INDEX fk_CHAT_USUARIOS1_idx (id_usuario ASC) VISIBLE,
  INDEX fk_CHAT_USUARIOS2_idx (id_usuario_destinatario ASC) VISIBLE,
  INDEX fk_CHAT_USUARIOS3_idx (id_usuario_rementente ASC) VISIBLE,
  CONSTRAINT fk_CHAT_USUARIOS1
    FOREIGN KEY (id_usuario)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_CHAT_USUARIOS2
    FOREIGN KEY (id_usuario_destinatario)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_CHAT_USUARIOS3
    FOREIGN KEY (id_usuario_rementente)
    REFERENCES FRETUS.USUARIOS (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; */

/* CREATE TABLE IF NOT EXISTS FRETUS.chat (
  id_mensagem INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  tipo_mensagem VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuario(id_usuario), 
  PRIMARY KEY (id_mensagem)
); */

CREATE TABLE IF NOT EXISTS FRETUS.conversas (
  id_conversa INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_entregador INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_conversa),
  UNIQUE (id_cliente, id_entregador),
  FOREIGN KEY (id_cliente) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_entregador) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS FRETUS.mensagens (
  id_mensagem INT NOT NULL AUTO_INCREMENT,
  id_conversa INT NOT NULL,
  id_usuario INT NOT NULL,
  mensagem TEXT NOT NULL,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_mensagem),
  FOREIGN KEY (id_conversa) REFERENCES conversas(id_conversa),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

ALTER TABLE mensagens CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO conversas (id_cliente, id_entregador) VALUES (2, 3);
INSERT INTO conversas (id_cliente, id_entregador) VALUES (2, 4);
INSERT INTO mensagens (id_conversa, id_usuario, mensagem) VALUES (1, 3, 'Olá!');
 
-- -----------------------------------------------------
-- Table FRETUS.avaliacoes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.avaliacoes (
  id_avaliacao INT NOT NULL AUTO_INCREMENT,
  /* qnt_estrelas INT NOT NULL, */
  id_pedido INT NOT NULL,
  id_entregador INT NOT NULL,
  id_avaliador INT NOT NULL,
  feedback_avaliacao VARCHAR(200) NOT NULL,
  /* RAKING_id_posicao INT NOT NULL, */
  PRIMARY KEY (id_avaliacao),
  UNIQUE (id_pedido),
  INDEX fk_avaliacoes_USUARIOS1_idx (id_entregador ASC) VISIBLE,
  INDEX fk_avaliacoes_USUARIOS2_idx (id_avaliador ASC) VISIBLE,
  INDEX fk_avaliacoes_USUARIOS3_idx (id_pedido ASC) VISIBLE,
  /* INDEX fk_avaliacoes_RAKING1_idx (RAKING_id_posicao ASC) VISIBLE, */
  CONSTRAINT fk_avaliacoes_USUARIOS1
    FOREIGN KEY (id_entregador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_avaliacoes_USUARIOS2
    FOREIGN KEY (id_avaliador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_avaliacoes_USUARIOS3
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.pedidos (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION/* ,
  CONSTRAINT fk_avaliacoes_RAKING1
    FOREIGN KEY (RAKING_id_posicao)
    REFERENCES FRETUS.RAKING (id_posicao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION */)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table FRETUS.DENUNCIAS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.denuncias (
  id_denuncia INT NOT NULL AUTO_INCREMENT,
  id_pedido INT NULL,
  id_denunciador INT NOT NULL,
  id_denunciado INT NOT NULL,
  foto_denuncia MEDIUMBLOB NULL,
  motivo_denuncia VARCHAR(75) NOT NULL,
  outros_motivos VARCHAR(255) NULL,
  data_denuncia DATETIME NOT NULL,
  descricao_denuncia TEXT NOT NULL,
  PRIMARY KEY (id_denuncia),
  UNIQUE (id_pedido),
  INDEX fk_DENUNCIAS_USUARIOS1_idx (id_denunciador ASC) VISIBLE,
  INDEX fk_DENUNCIAS_USUARIOS2_idx (id_denunciado ASC) VISIBLE,
  INDEX fk_DENUNCIAS_USUARIOS3_idx (id_pedido ASC) VISIBLE,
  CONSTRAINT fk_DENUNCIAS_USUARIOS1
    FOREIGN KEY (id_denunciador)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_DENUNCIAS_USUARIOS2
    FOREIGN KEY (id_denunciado)
    REFERENCES FRETUS.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_DENUNCIAS_USUARIOS3
    FOREIGN KEY (id_pedido)
    REFERENCES FRETUS.pedidos (id_pedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table FRETUS.FALE_CONOSCO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FaleConosco (
  id_solicitacao INT NOT NULL AUTO_INCREMENT,
  tipo_usuario varchar(10) NOT NULL,
  nome_usuario varchar(45) NOT NULL,
  email_usuario varchar(45) NOT NULL,
  cpf_usuario CHAR(14) NOT NULL,
  assunto VARCHAR(45) NOT NULL,
  mensagem TEXT(300) NOT NULL,
    PRIMARY KEY (id_solicitacao)
)  
ENGINE = InnoDB;

INSERT INTO FaleConosco (tipo_usuario, nome_usuario, email_usuario, cpf_usuario, assunto, mensagem)
VALUES
('1', 'Cliente1', 'cliente1@example.com', '123.456.789-00', 'Problemas com Navegação',
 'Estou escrevendo para relatar um problema que encontrei ao usar o seu site. A navegação parece confusa e alguns links importantes não estão funcionando corretamente. Isso está tornando difícil encontrar as informações que estou procurando e está afetando a minha experiência geral.\nSugiro uma revisão das seções e links do site para garantir que todos estejam funcionando corretamente e que a navegação seja mais intuitiva. Acredito que isso ajudará a melhorar a usabilidade e a satisfação dos visitantes.\nAgradeço pela atenção e estou à disposição para fornecer mais detalhes se necessário.');

INSERT INTO FaleConosco (tipo_usuario, nome_usuario, email_usuario, cpf_usuario, assunto, mensagem)VALUES
('2', 'Cliente2', 'cleinete2@example.com', '987.654.321-00', 'Conteúdo Desatualizado',
 'Gostaria de informar que alguns conteúdos no seu site parecem estar desatualizados. Encontrei informações que não correspondem mais à realidade ou que não foram atualizadas há algum tempo. Isso pode causar confusão e desinformação para os visitantes.\nSugiro que revisem e atualizem o conteúdo regularmente para garantir que todas as informações no site estejam corretas e relevantes. Isso pode ajudar a melhorar a credibilidade e a confiança dos usuários no seu site.\nObrigado pela atenção a esta questão.');

INSERT INTO FaleConosco (tipo_usuario, nome_usuario, email_usuario, cpf_usuario, assunto, mensagem)VALUES
('1', 'cliente3', 'cliente3@example.com', '321.654.987-00', 'Otimização do Site',
 'Gostaria de expressar minha preocupação em relação à otimização do seu site. Percebi que ele está carregando lentamente e que a navegação pode ser um pouco difícil em dispositivos móveis. Isso está afetando a minha experiência e, possivelmente, a de outros visitantes.\nEntendo que questões técnicas podem surgir, mas gostaria de sugerir que revisem a performance e a usabilidade do site para melhorar a experiência do usuário. Acredito que essas melhorias podem fazer uma grande diferença na satisfação dos visitantes e na eficiência geral do site.\nAgradeço pela atenção e espero que estas questões possam ser resolvidas em breve.');

/*
-- -----------------------------------------------------
-- Table FRETUS.documentos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS FRETUS.documentos (
  id_documento INT NOT NULL AUTO_INCREMENT,
  cnh VARCHAR(255) NULL,
  crvl VARCHAR(255) NULL,
  ipva VARCHAR(255) NULL,
  id_entregador INT NOT NULL,
  PRIMARY KEY (id_documento),
  INDEX fk_documentos_DETALHAMENTO_ENTREGADOR1_idx (id_entregador ASC) VISIBLE,
  CONSTRAINT fk_documentos_DETALHAMENTO_ENTREGADOR1
    FOREIGN KEY (id_entregador)
    REFERENCES FRETUS.DETALHAMENTO_ENTREGADOR (id_entregador)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- -----------------------------------------------------
-- 
-- -----------------------------------------------------
*/