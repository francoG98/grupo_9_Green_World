-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-10-2022 a las 01:51:37
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
(15, 'product-image-1662043127888-552389870.jpeg'),
(17, 'image_id-1662054538775-954088958.jpg'),
(18, 'weed-pipes.jpg'),
(19, 'celulosa.jpg'),
(20, 'aceite-500mg-30ml-Caja-Front-copia.jpg'),
(21, 'Cannabis-Power-Skin-Control-50g-Front.jpg'),
(22, 'Aceite-DnSelva-30ml-Caja-Frontal.jpg'),
(23, 'COCOB-300x300.png'),
(24, 'Go-nitro-300x300.png'),
(25, 'GO-WORMS-300x300.png'),
(26, 'TERRAFERTIL-TURBA-20L.png'),
(27, 'Lightmix-10.png'),
(28, 'VERMICULITA-GO-GREEN.png'),
(29, 'FILTRO-6-COOLER-B1.png'),
(30, 'TOBERA-COOLER-4a4.png'),
(31, 'MALLA-SCROG-SEGURIDAD-B.png'),
(32, 'image_id-1663535700100-581360151.jfif'),
(33, 'image_id-1663535778646-843299933.jfif'),
(34, 'image_id-1663612733033-151232062.jfif'),
(35, 'image_id-1663639387772-738064049.jfif'),
(36, 'image_id-1664652728247-982614596.jfif'),
(37, 'image_id-1664689777155-383901123.jfif'),
(38, 'avatar-1664696428122-596860618.jpg'),
(39, 'avatar-1664696796578-579988858.jfif'),
(40, 'image_id-1664778102314-370162511.jpg'),
(41, 'image_id-1664778289174-424162161.jfif'),
(42, 'image_id-1664779070137-818417655.jfif');

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

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `description`, `image_id`, `category_id`, `user_id`, `color`, `price`) VALUES
(5, 'prueba', 'prueba', 17, 3, NULL, 'prueba', 12345),
(6, 'Pipas de cristal', 'La Pipa de Cristal Champ High de 11 cm está fabricada en cristal de borosilicato de uso médico con alta resistencia térmica para conseguir una calada fresca y limpia. Cuenta con carb (carburador) para vaciar la pipa. Su forma redondeada resulta perfecta para llevar en un bolsillo.Disponible en colores azul, rosa, transparente y verde.', 18, 4, NULL, 'Dorado', 800),
(7, 'Celulosa', 'Papel de celulosa Zeus de color naranja es un papel naranja fabricado a partir de celulosa 100% natural. Esta presentación de celulosa Zeus no produce ceniza ni tampoco necesita pegamento, ya que humedeciendo uno de sus extremos, el cigarrillo queda prolijamente cerrado. Las celulosas vienen de color Naranja lo que le da un toque estético único.', 19, 4, NULL, NULL, 300),
(8, 'Aceite Cannabico', 'Aceite hidratante corporal que ayuda a la relajación.', 20, 3, NULL, NULL, 3500),
(9, 'Crema de cannabis Kif Skin Control', 'Este es un producto que cuenta con todas las propiedades cosméticas del cannabis ya que contiene extracto de la flor, y por ende es un producto de última tendencia en el mercado nacional. Es una novedosa formulación cosmética con todos los beneficios del cannabis (CBD) y la caléndula para el cuidado de la piel, con propiedades antioxidantes, ayuda a combatir las manchas y marcas producidas por el acné para obtener una piel más sana y lúcida.\r\nPeso: 60grs', 21, 3, NULL, NULL, 1500),
(10, 'Aceite Cannabico 30ml', 'El aceite de cannabis es a base de oliva extravirgen con extracto de cannabis full spectrum, contiene aproximadamente entre 2.75% de CBD y menos del 1% de THC.', 22, 3, NULL, NULL, 5000),
(11, 'Top Veg', 'Top Crop es un fertilizante líquido completo rico en ácidos húmicos y fúlvicos así como en macro y micronutrientes solubles en agua.', 23, 2, NULL, NULL, 1000),
(12, 'Go-nitro-300x300', 'Go Green Argentina es un bio-fertilizante totalmente orgánico y natural indicado para el periodo vegetativo de tus plantas, que representa una estable e inigualable fuente de nitrógeno «saludable».', 24, 2, NULL, NULL, 1000),
(13, 'GO-WORMS-300x300', 'Go Green Argentina es un bio-fertilizante totalmente orgánico y natural indicado para el periodo vegetativo de tus plantas, que representa una estable e inigualable fuente de nitrógeno «saludable».', 25, 2, NULL, NULL, 1000),
(14, 'Turba Musgo Sphagnum', 'La Turba de Musgo Sphagnum Fueguina de la empresa Terrafertil ofrece una buena retención de agua lo cual favorece la rápida absorción de los elementos nutricionales necesarios y el desarrollo radicular de las plantas. Aporta porosidad y baja el pH.', 26, 5, NULL, NULL, 2000),
(15, 'LightMix', 'Nuestro Sustrato Premium LightMix de Go Green Argentina es un tipo de suelo de origen natural y orgánico que aporta todos los elementos necesarios a nuestras plantas y semillas para obtener resultados de alta calidad.', 27, 5, NULL, NULL, 2500),
(16, 'Vermiculita', 'La Vermiculita de Go Green Argentina es un sustrato ideal para mezclas con turba, compost, fertilizantes orgánicos, fibra de coco, etc. Constituye un componente principal en el medio del cultivo para obtener un sustrato equilibrado con el fin de lograr una planta sana.', 28, 5, NULL, NULL, 2000),
(17, 'Filtros Para Extractores Hydra', 'Filtro de carbón activado Go Green Argentina para reducción de olor de 6 Pulgadas, usados generalmente en armarios y carpas. Incluye una capa de carbón que reduce considerablemente los olores orgánicos. Diseñado para ser usados con extractores marca Hydra o similares de 6 pulgadas.', 29, 1, NULL, NULL, 800),
(18, 'Toberas', 'Presenta esta tobera/ adaptador, diseñada especialmente y a medida para su utilización en coolers de 120. Este producto se encuentra preparado para ser conectado a conductos de 4 pulgadas con la finalidad de realizar extracción o intracción de aire.', 30, 1, NULL, NULL, 800),
(19, 'Red Plástica Para Scrog', 'Malla apta RED SCROG Naranja/ Seguridad y Señalización – Una solución Super Económica!', 31, 1, NULL, NULL, 1500);

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
(11, 'Gon', 'Freecs', 'gfreecs@gworld.com', 'indoor', '$2a$10$8.igHy/jRNQER23wCelt1eL80NXUGnFY6S6SgO34X7jL8wc/G5cVK', 35, 1, NULL),
(12, 'Killua', 'Zoldyck', 'kzoldyck@hxh.com', 'outdoor', '$2a$10$PcWbVB/hp72OEHG9lUeKKe2XNVhMQSmgl87KS4h4FoNERv9bnyq/2', 36, 0, NULL),
(13, 'Justin', 'Bieber', 'justin@bieber.com', 'ninguna', '$2a$10$7rCkKLerHHPHVbUMx3N9yeFPMMsq0y6lYQ95mh9L/Gt3Af58TAsem', 37, 0, NULL),
(14, 'Ramita', 'Superheroe', 'ramita@gworld.com', 'outdoor', '$2a$10$rE7rpmS71I.D4TYjLnz1vuUIOE4uXbcRMaAQp6H8VUaa83yCx33Im', 38, 1, NULL),
(15, 'Mike', 'Tyson', 'mtyson@gworld.com', 'hidro', '$2a$10$7JUIoGsrOK4qwDAcGd6YwuAHQlAlOWlW6hDal/qzY.Fkc/l/uWqk6', 39, 1, NULL),
(16, 'Snoop', 'Dogg', 'calvincb@g.com', 'indoor', '$2a$10$GN64lEWC1LehKGoxadZB2eoSIvsA92r4261//iGSHehbfv71074Ka', 40, 0, NULL),
(17, 'Inosuke', 'Hashibira', 'ihashibira@gworld.com', 'outdoor', '$2a$10$kt4B2TscteNveSsA3FoCAeJOqLqZJxiJRWMjiR57swHNPnirKu4WG', 41, 1, NULL),
(18, 'Andy', 'Chango', 'afejerman@hotmail.com', 'hidro', '$2a$10$fI/.DlZ8HK21YfGLcvkHlO/Itct4oJagqBH1BV7pFlBx8xw9zFsiS', 42, 0, NULL);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
