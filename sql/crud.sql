-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 13/06/2022 às 23:19
-- Versão do servidor: 5.5.62-log
-- Versão do PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crud`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `senha` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `software` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `validade` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `hwid` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `vendedor` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Despejando dados para a tabela `personas`
--

INSERT INTO `personas` (`id`, `senha`, `email`, `software`, `validade`, `hwid`, `vendedor`) VALUES
(49, '$2b$12$DzddjFwA7BBdzo7QdiMDAeTDRM5Ga3mAGLZEEIuv6nGkzEe/nkK7q', 'kencaldas@hotmail.com', 'C', '2022-06-26', '', 'Henrique'),
(50, '$2b$12$QEsdINQcRhPG5/jjv8Ucju1NYHmkOTZeHKIxeSvJrFwxVwrgLQxBe', 'smartchaincity@gmail.com', 'B', '2022-06-29', '6e4a85ce7526ef8fc701a67cbc725518be1f7f64', 'Henrique');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `admin` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `admin`) VALUES
(14, 'Anderson', 'abc123', 'sim'),
(19, 'Henrique', 'feba93758f696af62d33a74640170202', 'sim');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
