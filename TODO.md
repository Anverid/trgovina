# Things to do

- [x] Košarica
  - [x] User interfacem (CENE izdelkov)
    - [x] Gumb ki te vrže na pregled košarice
    - [x] Pregled košarice
      - [x] Stvari ki jih boš kupil
        - [x] Možnost odstranjevanja izdelka iz košarice
      - [x] Tvoj naslov (je na naročilu več ne rabiš)
      - [x] Gumb potrdi
        - [x] Pretvori košarico v naročilo
        - [x] Vrže na pregled naročil
    - [x] Vprašaj po količini izdelka ki ga želiš dodati v košarico
  - [x] Shrani stvari na session
    - [x] Uporabi MySQL za session namesto memory?
- [x] Naročila
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
    - [x] Če še ni bilo odposlano / plačano, pokaži ob naročilu podatke za TRR?
- [x] Izdelki
	- [x] Prikaži ceno (na 100g)
- [ ] Admin routi avtorizacija
  - [x] Middleware
  - [ ] Naročila
  - [x] Seznam uporabnikov? ne potrebujem urejanja samo pregled
  - [ ] Urejanje produktov?
- [ ] GDPR / cookie popup?         https://openbase.com/js/react-cookie-consent 

