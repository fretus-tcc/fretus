-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/01/2024 às 01:36
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `fretus`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `duvidas`
--

CREATE TABLE `duvidas` (
  `id_duvida` int(11) NOT NULL,
  `titulo_duvida` varchar(125) NOT NULL,
  `conteudo_duvida` text NOT NULL,
  `data_duvida` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `duvidas`
--

INSERT INTO `duvidas` (`id_duvida`, `titulo_duvida`, `conteudo_duvida`, `data_duvida`) VALUES
(1, 'TITULO', 'conteudo', '2024-01-04 00:34:14');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `duvidas`
--
ALTER TABLE `duvidas`
  ADD PRIMARY KEY (`id_duvida`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `duvidas`
--
ALTER TABLE `duvidas`
  MODIFY `id_duvida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `duvidas` 
  ADD `slug_duvida` VARCHAR(150) NOT NULL AFTER `data_duvida`,
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;