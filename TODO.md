# Things to do

- [ ] Košarica
  - [ ] User interfacem CENE izdelkov
    - [x] Gumb ki te vrže na pregled košarice
    - [ ] Pregled košarice
      - [ ] Stvari ki jih boš kupil
        - [x] Možnost odstranjevanja izdelka iz košarice
      - [ ] Tvoj naslov
      - [x] Gumb potrdi
        - [x] Pretvori košarico v naročilo
        - [x] Vrže na pregled naročil
    - [x] Vprašaj po količini izdelka ki ga želiš dodati v košarico
  - [x] Shrani stvari na session
    - [x] Uporabi MySQL za session namesto memory?
- [ ] Naročila
  - [x] Tabela v bazi
    ```
    narocila(id, id_narocnik, cena, je_placano, je_odposlano)
    narocila_izdelki(id_narocilo, id_izdelek, kolicina)
    ```
    - [x] Kreiranje tabel
    - [x] Foreign keyi
  - [ ] Pregled naročil za odpremljanje za admina
    - [ ] Export naročila za espremnico
  - [x] Pregled oddanih naročil / statusa za uporabnika
    - [ ] Če še ni bilo odposlano / plačano, pokaži ob naročilu podatke za TRR?
- [ ] Izdelki
	- [ ] Prikaži ceno (na 100g)
- [ ] Admin routi avtorizacija
  - [x] Middleware
  - [ ] Naročila
  - [ ] Seznam uporabnikov?
  - [ ] Urejanje produktov?
- [ ] GDPR / cookie popup?         https://openbase.com/js/react-cookie-consent 

