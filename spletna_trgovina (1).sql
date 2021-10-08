-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gostitelj: 127.0.0.1
-- Čas nastanka: 08. okt 2021 ob 12.49
-- Različica strežnika: 10.4.20-MariaDB
-- Različica PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Zbirka podatkov: `spletna_trgovina`
--

-- --------------------------------------------------------

--
-- Struktura tabele `narocila`
--

CREATE TABLE `narocila` (
  `id` int(11) NOT NULL,
  `id_narocnik` int(11) NOT NULL,
  `cena` float NOT NULL,
  `datum_narocila` date NOT NULL,
  `datum_placila` date DEFAULT NULL,
  `datum_odprema` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `narocila`
--

INSERT INTO `narocila` (`id`, `id_narocnik`, `cena`, `datum_narocila`, `datum_placila`, `datum_odprema`) VALUES
(2, 40, 20, '2021-09-22', NULL, NULL),
(3, 43, 8, '2021-09-21', NULL, NULL),
(4, 43, 4, '2021-09-22', NULL, NULL),
(5, 43, 8, '2021-09-21', NULL, NULL),
(6, 43, 4, '2021-09-23', NULL, NULL),
(7, 40, 28, '2021-09-24', NULL, NULL),
(8, 40, 20, '2021-09-28', NULL, NULL),
(9, 40, 44, '2021-10-05', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabele `narocila_izdelki`
--

CREATE TABLE `narocila_izdelki` (
  `id_narocilo` int(11) NOT NULL,
  `id_izdelek` int(11) NOT NULL,
  `kolicina` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `narocila_izdelki`
--

INSERT INTO `narocila_izdelki` (`id_narocilo`, `id_izdelek`, `kolicina`, `id`) VALUES
(2, 3, 1, 1),
(2, 3, 1, 2),
(2, 3, 1, 3),
(2, 4, 1, 4),
(2, 6, 1, 5),
(3, 3, 1, 6),
(3, 4, 1, 7),
(4, 3, 1, 8),
(5, 2, 1, 9),
(5, 3, 1, 10),
(6, 3, 1, 11),
(7, 3, 5, 12),
(7, 4, 1, 13),
(7, 6, 1, 14),
(8, 4, 5, 15),
(9, 14, 1, 16),
(9, 17, 1, 17),
(9, 8, 4, 18),
(9, 9, 5, 19);

-- --------------------------------------------------------

--
-- Struktura tabele `produkt`
--

CREATE TABLE `produkt` (
  `id` int(11) NOT NULL,
  `ime_produkta` varchar(45) NOT NULL,
  `id_produkt_kat` int(11) NOT NULL,
  `cena_na_100g_prod` float NOT NULL,
  `opis_produkta` text NOT NULL,
  `slika_produkta` text NOT NULL,
  `zaloga_produkta` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `produkt`
--

INSERT INTO `produkt` (`id`, `ime_produkta`, `id_produkt_kat`, `cena_na_100g_prod`, `opis_produkta`, `slika_produkta`, `zaloga_produkta`) VALUES
(2, 'Paradižnik', 1, 5, 'Paradižnik', 'paradiznik.jpg', 10),
(3, 'Paradižnik mali', 1, 4, 'Paradižnik v grozdih', 'paradiznik_mali.jpg', 10),
(4, 'Zelje belo', 1, 2, 'Glava zelja', 'zelje_belo.jpg', 10),
(6, 'Korenje', 1, 4, 'Domače korenje', 'korenje.jpg', 10),
(7, 'Paprika Rdeča', 1, 5, 'Rdeča Paprika', 'paprika_rdeča.jpg', 10),
(8, 'Paprika Rumena', 1, 4, 'Rumena Paprika', 'paprika_rumena.png', 10),
(9, 'Paprika Zelena', 1, 4, 'Zelena Paprika', 'paprika_zelena.jpg', 10),
(10, 'Jalapenjo', 1, 9, 'Zelen Čili', 'jalapenjo.jpg', 10),
(11, 'Fižol', 1, 1, 'Fižol v zrnju', 'fižol.jpg', 10),
(12, 'Peteršilj Sveži', 4, 3, 'Svež peteršilj', 'peteršilj_sveži.jpg', 10),
(13, 'Bučke', 1, 4, 'Slovenske bučke', 'bucke.jpg', 0),
(14, 'Jabolko Rdeče', 2, 4, 'Rdeče Jabolko', 'jabolko_rdece.jpg', 0),
(16, 'Borovnice', 2, 6, 'Borovnice', 'borovnice.jpg', 0),
(17, 'Hruška', 2, 4, 'Hruška', 'hruška.jpg', 0),
(19, 'Dolga Rdeča Paprika', 1, 2, 'Dolga rdeča paprika', 'paprika_rdeca2.jpg', 0),
(20, 'Krompir', 1, 3, 'Bel Krompir', 'krompir_beli.png', 7),
(21, 'Peteršilj posušen', 4, 5, 'Posušen peteršilj', 'peteršilj_suhi.png', 6),
(22, 'Zelenjavni zabojček', 3, 20, 'Zabojček s sezonsko zelenjavo', 'zabojcek_zelenjava.png', 3),
(23, 'Kumara', 1, 3, 'Domače kumare', 'kumara.png', 3),
(24, 'Češnjev kompot', 6, 7, 'Domači kompot iz češenj', 'kompot_češnje.png', 3),
(25, 'Slivova marmelada', 5, 5, 'Domača marmelada iz sliv', 'marmelada_slive.png', 5),
(26, 'Ribezov sok', 6, 7, 'Sok iz ribeza', 'sok_ribez.png', 2),
(27, 'Vložene gobe', 7, 8, 'Vložene gobe', 'vlozene_gobe.png', 6);

-- --------------------------------------------------------

--
-- Struktura tabele `produkt_kategorija`
--

CREATE TABLE `produkt_kategorija` (
  `id_produkt_kat` int(11) NOT NULL,
  `ime_kategorija` varchar(45) NOT NULL,
  `slika_kategorija` varchar(45) NOT NULL,
  `opis_kategorija` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `produkt_kategorija`
--

INSERT INTO `produkt_kategorija` (`id_produkt_kat`, `ime_kategorija`, `slika_kategorija`, `opis_kategorija`) VALUES
(1, 'Zelenjava', 'zelenjava_kat.png', 'Izbira sveže zelenjave'),
(2, 'Sadje', 'slikatrenutnoninavoljo.png', 'Izbira svežega sadja.'),
(3, 'Zabojčki', 'zabojcek2.png', 'Že sestavljeni zabojčki'),
(4, 'Začimbe', 'zacimbe_kat.png', 'Suhe in sveže začimbe na voljo'),
(5, 'Namazi', 'slikatrenutnoninavoljo.png', 'Zelenjavni, čokoladni, med'),
(6, 'Pijače', 'slikatrenutnoninavoljo.png', 'Sokovi in druge pijače'),
(7, 'Drugo', 'slikatrenutnoninavoljo.png', 'Druge kategorije');

-- --------------------------------------------------------

--
-- Struktura tabele `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('ncVW185ya3Eb2xhu2GH1B-NHEh5rtYUb', 1633776247, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"user\":{\"id\":43,\"ime\":\"Edward\",\"priimek\":\"Elric\",\"email\":\"ed.ed@test.si\",\"naslov\":\"qwe\",\"pošta\":\"qwe\",\"poštna_številka\":1234,\"ime_država\":\"Slovenija\",\"admin\":1}}');

-- --------------------------------------------------------

--
-- Struktura tabele `uporabnik`
--

CREATE TABLE `uporabnik` (
  `id` int(11) NOT NULL,
  `ime` varchar(45) NOT NULL,
  `priimek` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `gesloHash` varchar(255) NOT NULL,
  `naslov` varchar(45) NOT NULL,
  `pošta` varchar(45) NOT NULL,
  `poštna_številka` int(11) NOT NULL,
  `ime_država` varchar(45) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Odloži podatke za tabelo `uporabnik`
--

INSERT INTO `uporabnik` (`id`, `ime`, `priimek`, `email`, `gesloHash`, `naslov`, `pošta`, `poštna_številka`, `ime_država`, `admin`) VALUES
(1, 'Anze', 'Verbic', 'anze.verbic@gmail.com', '$2b$10$ZG1VzWif5EQyrkkCQTDyKu5wRuKaZKPiiqpCoIK6slZgXjmRrJmRa', 'Dvorje 16', 'Cerklje na Gorenjskem', 4207, 'Slovenija', 1),
(40, 'qwe', 'qwe', 'jo.jo@jo.com', '$2b$10$ZG1VzWif5EQyrkkCQTDyKu5wRuKaZKPiiqpCoIK6slZgXjmRrJmRa', 'qwe', 'qwre', 1234, 'Slovenija', 0),
(41, 'test', 'Verbic', 'ver@a.com', '$2b$10$yx6Iv9m62ME5VCrMHKuW.ONkWrrKQxSDWcnoaH', 'qwe', 'Cerklje na Gorenjskem', 1234, 'Slovenija', 0),
(42, 'test', 'ert', 'anzea@gmail.com', '$2b$10$KrgifZ1y.m3YFDYFpcxANuNx8YtojsxR.UefYN/LJ9SWeonuGTp1S', 'qwe', 'qwe', 1234, 'Slovenija', 0),
(43, 'Edward', 'Elric', 'ed.ed@test.si', '$2b$10$ZG1VzWif5EQyrkkCQTDyKu5wRuKaZKPiiqpCoIK6slZgXjmRrJmRa', 'qwe', 'qwe', 1234, 'Slovenija', 1),
(44, 'david', 'test', 'david@test.si', '$2b$10$EERqbCw9HGXz6kw1HF2.reN8bMZR9HBK4ebpKto02eliinZHQzhZi', 'hello 123', 'Ljubljana', 1000, 'Slovenija', 0);

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `narocila`
--
ALTER TABLE `narocila`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_narocnik` (`id_narocnik`);

--
-- Indeksi tabele `narocila_izdelki`
--
ALTER TABLE `narocila_izdelki`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_narocilo` (`id_narocilo`,`id_izdelek`),
  ADD KEY `id_izdelek` (`id_izdelek`);

--
-- Indeksi tabele `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_produkt_kat` (`id_produkt_kat`);

--
-- Indeksi tabele `produkt_kategorija`
--
ALTER TABLE `produkt_kategorija`
  ADD PRIMARY KEY (`id_produkt_kat`);

--
-- Indeksi tabele `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indeksi tabele `uporabnik`
--
ALTER TABLE `uporabnik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `narocila`
--
ALTER TABLE `narocila`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT tabele `narocila_izdelki`
--
ALTER TABLE `narocila_izdelki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT tabele `produkt`
--
ALTER TABLE `produkt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT tabele `produkt_kategorija`
--
ALTER TABLE `produkt_kategorija`
  MODIFY `id_produkt_kat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT tabele `uporabnik`
--
ALTER TABLE `uporabnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Omejitve tabel za povzetek stanja
--

--
-- Omejitve za tabelo `narocila`
--
ALTER TABLE `narocila`
  ADD CONSTRAINT `id_narocnik` FOREIGN KEY (`id_narocnik`) REFERENCES `uporabnik` (`id`);

--
-- Omejitve za tabelo `narocila_izdelki`
--
ALTER TABLE `narocila_izdelki`
  ADD CONSTRAINT `id_izdelek` FOREIGN KEY (`id_izdelek`) REFERENCES `produkt` (`id`),
  ADD CONSTRAINT `id_narocilo` FOREIGN KEY (`id_narocilo`) REFERENCES `narocila` (`id`);

--
-- Omejitve za tabelo `produkt`
--
ALTER TABLE `produkt`
  ADD CONSTRAINT `produkt_katFK` FOREIGN KEY (`id_produkt_kat`) REFERENCES `produkt_kategorija` (`id_produkt_kat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
