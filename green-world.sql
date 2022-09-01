-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-09-2022 a las 19:26:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `green-world`
--
CREATE DATABASE IF NOT EXISTS `green-world` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `green-world`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `image_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `name`, `description`, `image_id`) VALUES
(1, 'accesorios', 'Todo lo necesario para indoor y outdoor, como macetas, platos, tijeras, carpas, luces, coolers, timmers y más...', 1),
(2, 'aditivos', 'Tenemos los nutrientes ideales para que a tus plantas no les falte nada en su crecimiento. Encontrá productos para germinación, vegetación, floración y más...', 2),
(3, 'medicinal', 'Aceites y cremas a base de CBD que te ayudaran a rejalar y aliviar dolores', 3),
(4, 'parafernalia', 'Para disfrutar de la cosecha, acá vas a encontar los modelos más cancheros de bongs, pipas, bandejas, picadores, sedas y más...', 4),
(5, 'sustratos', 'Superficie en la que vivirán tus cultivos. Compralo preparado o llevate para armarlo a tu gusto, contamos con turba, perlita, humus, fibra de coco y más...', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(10) UNSIGNED NOT NULL,
  `path` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `path`) VALUES
(1, 'accesorios-unsplash.jpg'),
(2, 'aditivos-unsplash.jpg'),
(3, 'medicinal-unsplash.jpg'),
(4, 'parafernalia-unsplash-2.jpg'),
(5, 'sustratos-unsplash.jpg'),
(6, 'default-image.jpg'),
(7, 'avatar-1659939057487-970811873.jpg'),
(8, 'producto-sin-imagen.png'),
(9, 'image_id-1661968877114-42958700.jpeg'),
(10, 'image_id-1661970028770-490509761.jpeg'),
(11, 'image_id-1662042081069-570011053.jpeg'),
(14, 'image_id-1662043114616-548302625.jpg'),
(15, 'product-image-1662043127888-552389870.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_id` int(11) UNSIGNED NOT NULL,
  `category_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cultivo` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image_id` int(11) UNSIGNED NOT NULL,
  `admin` tinyint(11) NOT NULL,
  `product_id` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `lastname`, `email`, `cultivo`, `password`, `image_id`, `admin`, `product_id`) VALUES
(1, 'Inosuke', 'Hashibira', 'ihashibira@gworld.com', 'outdoor', '$2a$10$dwIiGPKgYnE1VwscsmSCQeMUX2lDWkngpHns1fEp7WZj7vPgzrMye', 7, 1, NULL),
(2, 'Eric', 'Zatel', 'ezatel@gworld.com', 'ninguna', '$2a$10$dwIiGPKgYnE1VwscsmSCQeMUX2lDWkngpHns1fEp7WZj7vPgzrMye', 6, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosproductos`
--

CREATE TABLE `usuariosproductos` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `image_id_2` (`image_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `usuariosproductos`
--
ALTER TABLE `usuariosproductos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuariosproductos`
--
ALTER TABLE `usuariosproductos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `imagenes` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `imagenes` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `imagenes` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `usuariosproductos`
--
ALTER TABLE `usuariosproductos`
  ADD CONSTRAINT `usuariosproductos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuariosproductos_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
