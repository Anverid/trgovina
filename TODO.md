# Things to do

- [ ] Košarica
  - [ ] User interface
    - [x] Gumb ki te vrže na pregled košarice
    - [ ] Pregled košarice
      - [ ] Stvari ki jih boš kupil
        - [x] Možnost odstranjevanja izdelka iz košarice
      - [ ] Tvoj naslov
      - [ ] Gumb potrdi
        - [ ] Pretvori košarico v naročilo
        - [ ] Vrže na pregled naročil
    - [x] Vprašaj po količini izdelka ki ga želiš dodati v košarico
  - [x] Shrani stvari na session
    - [x] Uporabi MySQL za session namesto memory?
- [ ] Naročila
  - [ ] Tabela v bazi
    ```
    narocila(id, id_narocnik, cena, je_placano, je_odposlano)
    narocila_izdelki(id_narocilo, id_izdelek, kolicina)
    ```
    - [ ] Kreiranje tabel
    - [ ] Foreign keyi
  - [ ] Pregled naročil za odpremljanje za admina
    - [ ] Export naročila za espremnico
  - [ ] Pregled oddanih naročil / statusa za uporabnika
    - [ ] Če še ni bilo odposlano / plačano, pokaži ob naročilu podatke za TRR?
- [ ] Izdelki
	- [ ] Prikaži ceno (na 100g)
- [ ] Admin routi avtorizacija
  - [x] Middleware
  - [ ] Naročila
  - [ ] Seznam uporabnikov?
  - [ ] Urejanje produktov?
- [ ] GDPR / cookie popup?

