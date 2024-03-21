SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE fretus;
USE fretus;

CREATE TABLE `duvidas` (
  `id_duvida` int(11) AUTO_INCREMENT NOT NULL,
  `titulo_duvida` varchar(125) NOT NULL,
  `conteudo_duvida` text NOT NULL,
  `data_duvida` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id_duvida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `duvidas` 
  ADD `slug_duvida` VARCHAR(150) NOT NULL AFTER `data_duvida`;

INSERT INTO `duvidas` (`titulo_duvida`, `conteudo_duvida`, `slug_duvida`) VALUES
('Como faço para me cadastrar como entregador?', ' 1. **Acesse o Nosso Site:**\r\n\r\n    Visite nosso site [clicando aqui](/) e vá para a seção de cadastro de motoristas/entregadores. Você encontrará um link de \"Cadastro\" em nossa página inicial.\r\n\r\n 2. **Preencha o Formulário de Cadastro:**\r\n\r\n    Ao clicar na opção de cadastro, você será redirecionado para um formulário de inscrição. Este formulário é projetado para coletar informações essenciais, como seu nome, endereço de e-mail, CPF e etc.\r\n\r\n 3. **Forneça Documentos Necessários:**\r\n\r\n    Em seguida, você precisará fornecer cópias de documentos obrigatórios, como sua carteira de motorista válida, registro do veículo (se aplicável), e outros documentos que possam ser exigidos pela legislação local ou pela nossa empresa.\r\n\r\n 4. **Verificação e Avaliação:**\r\n\r\n    Após o envio dos documentos, nossa equipe de suporte revisará suas informações e realizará uma avaliação inicial. Isso pode incluir verificações de antecedentes, histórico de condução e outros critérios estabelecidos pela empresa.\r\n\r\n 5. **Aprovação e Ativação:**\r\n\r\n    Após a conclusão bem-sucedida do processo de cadastro, você receberá uma notificação de aprovação. Isso ativará sua conta como motorista/entregador em nossa plataforma.\r\n\r\n 6. **Comece a Aceitar Pedidos:**\r\n\r\n    Parabéns! Agora você está pronto para começar a receber e aceitar pedidos de entrega. Use nossa plataforma online para ficar disponível para pedidos.', 'como-faco-para-me-cadastrar-como-entregador'),
('O que fazer em caso de problemas durante a entrega?', 'Entendemos que, ocasionalmente, podem ocorrer problemas durante o processo de entrega. Estamos comprometidos em oferecer a você a melhor experiência possível e estamos aqui para ajudar a resolver qualquer contratempo que possa surgir. Se você enfrentar problemas durante a entrega, siga estas etapas para garantir uma resolução eficaz:\r\n\r\n1. **Entre em Contato Conosco Imediatamente:**\r\n\r\n    Assim que identificar um problema, entre em contato conosco imediatamente. Nossa equipe de suporte ao cliente está disponível para ajudar a solucionar suas preocupações.\r\n\r\n2. **Forneça Detalhes Precisos:**\r\n\r\n    Ao entrar em contato conosco, seja o mais detalhado possível ao descrever o problema. Isso inclui fornecer informações como o número de rastreamento da entrega, a data e a hora da ocorrência do problema, e uma descrição completa da situação.\r\n\r\n3. **Documente o Problema:**\r\n\r\n    Fotografe ou grave vídeos para documentar o estado dos produtos ou da embalagem. Isso pode ser valioso para avaliar o dano e acelerar o processo de resolução.\r\n\r\nSeja qual for o problema, nossa equipe está à disposição para ajudar e trabalhar em conjunto para encontrar a melhor solução. Sua satisfação é fundamental para nós, e estamos comprometidos em superar suas expectativas sempre que possível.', 'o-que-fazer-em-caso-de-problemas-durante-a-entrega'),
('Como funciona o pagamento para os entregadores?', 'O sistema de pagamento para nossos entregadores é uma parte essencial do nosso compromisso em manter uma parceria justa e transparente. Entendemos que a clareza e a confiabilidade no pagamento são fundamentais para a satisfação de nossos entregadores. Portanto, gostaríamos de explicar detalhadamente como funciona o pagamento em nossa plataforma:\r\n\r\n1. **Recebimento de Pedidos:**\r\n\r\n    O processo começa quando você, como entregador, aceita um pedido por meio de nossa plataforma. Cada pedido terá um valor de pagamento associado, que pode variar com base em diversos fatores, como a distância, a complexidade da entrega e a demanda atual, ou com o que você combinou com o cliente (não nos responsabilizamos por essa parte).\r\n\r\n2. **Pagamento Regular:**\r\n\r\n    Os pagamentos aos entregadores geralmente são feitos regularmente, de acordo com uma programação definida. Isso pode ser semanal ou quinzenal. Os valores são transferidos para a conta bancária fornecida por você durante o processo de cadastro.\r\n\r\n3. **Transparência e Comprovantes:**\r\n \r\n    Fornecemos comprovantes detalhados de cada transação para garantir total transparência no processo de pagamento. Você pode acessar esses comprovantes em sua conta na plataforma.\r\n\r\nEntendemos que você confia em nós para fornecer uma plataforma justa e confiável para ganhar a vida como entregador. Estamos comprometidos em garantir que você seja devidamente compensado por seu trabalho e que todo o processo de pagamento seja transparente e eficiente. Estamos aqui para ajudar a garantir que sua experiência como entregador seja positiva e recompensadora.', 'como-funciona-o-pagamento-para-os-entregadores'),
('Existe um limite de peso ou tamanho para os itens que posso enviar?', 'Sim, em nossa plataforma, há geralmente limites de peso e tamanho para os itens que você pode enviar. Estes limites são estabelecidos pelo veículo escolhido para fazer a entrega. Entender esses limites é importante para garantir que suas entregas ocorram sem problemas. Abaixo, detalhamos como esses limites funcionam:\r\n\r\n## Limites de Peso:\r\n\r\n- **Peso Máximo:**\r\n    \r\n    Geralmente, temos um peso máximo permitido para cada tipo de veículo. Por exemplo, em entregas de moto ou carro, o peso máximo permitido é menor do que em entregas feitas por veículos maiores (van e caminhão).\r\n    \r\n- **Verificação de Peso:**\r\n    \r\n    Os entregadores são instruídos a verificar o peso das encomendas antes da coleta. Isso ajuda a garantir que os itens estejam dentro dos limites estabelecidos. Se um item exceder o peso máximo permitido, o entregador pode recusar a entrega ou solicitar assistência adicional.\r\n    \r\n\r\n## Verificação durante o Processo de Solicitação:\r\n\r\nDurante o processo de solicitação em nossa plataforma, você receberá informações claras sobre os limites de peso, ao escolher o veículo da entrega. Isso ajuda a garantir que você esteja ciente das restrições ao selecionar seus itens para entrega.\r\n\r\nEntender e respeitar os limites de peso e tamanho é importante para garantir uma experiência de entrega tranquila e eficaz.', 'existe-um-limite-de-peso-ou-tamanho-para-os-itens-que-posso-enviar'),
('Posso agendar uma entrega para um horário específico?', 'Sim, oferecemos a opção de agendar entregas para horários específicos em nossa plataforma. Entendemos que a conveniência é fundamental para nossos clientes, e agendar uma entrega é uma maneira eficaz de garantir que ela ocorra no momento mais adequado para você.\r\n\r\n1. **Selecione a Opção de Agendamento:**\r\n    \r\n    Durante o processo de solicitação, você terá a opção de escolher o horário e a data desejados para a entrega. Essa opção está disponível após os detalhes da entrega (Local de partida e de destino).\r\n    \r\n2. **Escolha o Horário Conveniente:**\r\n    \r\n    Você poderá selecionar um dia e horário específico para a entrega.\r\n    \r\n\r\n## Benefícios do Agendamento de Entrega:\r\n\r\n-   **Conveniência:** O agendamento de entrega permite que você escolha o momento mais conveniente para receber sua encomenda, evitando a necessidade de esperar em casa durante longos períodos.\r\n-   **Planejamento:** É útil para planejar entregas em datas específicas, como aniversários, eventos ou ocasiões especiais, garantindo que suas encomendas cheguem no momento certo.\r\n-   **Flexibilidade:** Você tem a flexibilidade de escolher entre diferentes horários de entrega com base em sua agenda e preferências pessoais.', 'posso-agendar-uma-entrega-para-um-horario-especifico'),
('É possível adicionar instruções especiais para a entrega?', 'Sim, é absolutamente possível adicionar instruções especiais para suas entregas em nossa plataforma. Entendemos que cada entrega pode ter suas particularidades e que você pode ter necessidades específicas para garantir que a entrega seja realizada da maneira desejada.\r\n\r\n## Como Adicionar Instruções Especiais:\r\n\r\n1. **Durante o Processo de Solicitação:**\r\n    \r\n    Após solicitar uma entrega em nossa plataforma, poderá combinar a entrega com o entregador, pelo chat. Também é possível deixar uma observação ao motorista, na página de pagamento.\r\n    \r\n2. **Clareza e Detalhes:**\r\n    \r\n    Ao fornecer instruções especiais, é fundamental ser claro e detalhado. Quanto mais informações você fornecer, melhor o entregador poderá atender às suas expectativas.\r\n    \r\n3. **Garantia de Privacidade e Segurança:**\r\n    \r\n    Suas instruções especiais são tratadas com sigilo e respeito à sua privacidade. Elas são destinadas exclusivamente ao entregador responsável pela sua entrega.\r\n    \r\n\r\nEsteja à vontade para adicionar instruções especiais sempre que necessário durante o processo de solicitação. Estamos aqui para atender às suas necessidades individuais e garantir que suas entregas sejam realizadas conforme suas preferências.', 'e-possivel-adicionar-instrucoes-especiais-para-a-entrega');

/* Tabelas cadastros  Não mexer Alex está organizando isso */

-- -----------------------------------------------------
-- Table `FRETUS`.`USUARIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FRETUS`.`USUARIOS` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `senha_usuario` VARCHAR(45) NOT NULL,
  `nome_usuario` VARCHAR(45) NOT NULL,
  `cpf_usuario` CHAR(11) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telefone` CHAR(11) NOT NULL,
  `data_usuario` DATE NOT NULL,
  `tipo_usuario` VARCHAR(45) NOT NULL,
  `descricao_usuario` VARCHAR(45) NULL,
  `desr_tipo_usuario` VARCHAR(45) NOT NULL,
  `cod_tipo_usuario` INT NOT NULL,
  `foto_de_perfil_usuario` BINARY NULL,
  `notificacao_sms_estado` VARCHAR(45) NOT NULL,
  `notificacao_email_estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `idUSUARIOS_UNIQUE` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `cpf_usuario_UNIQUE` (`cpf_usuario` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS Login (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT NOT NULL,
    TipoUsuario ENUM('tipo_usuario') NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Senha VARCHAR(100) NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES Cliente(ID) ON DELETE CASCADE,
    FOREIGN KEY (UsuarioID) REFERENCES Entregador(ID) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `FRETUS`.`USUARIOS` , `login` 
-- -----------------------------------------------------