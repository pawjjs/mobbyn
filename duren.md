# Duren The Game

## MVP
1. konfiguracja gry 
2. dołaczanie ludzi do stolu przez kod
3. standard (bez mayhem / bullet)
4. system samej gry + TASOWANIE KART
5. podsumowanie gry (tabela / grid)

## MVP 2.0
1. profil (rejestracja, logowanie itp.)
2. znajomi (dodawanie, usuwanie itp.)
3. inne tryby gry takie jak bullet mayhem 
4. lista dostępnych stołów

## MVP 3.0
1. System rankingowy !!! 
2. chat w stole

## MVP 4.0 (jak bedzie czas)
1. odznaki
2. czapeczka durnia
3. belmondziak
4. customizacja rewersów kart, stołu ????



## Tryby gry

1. Standard - jedna talia, max 6 graczy (6 kart na rece) rank.    CZAS RUNDY: 1m
2. Bullet - 1/2 talii, max 4 graczy (4 karty na rece) rank.       CZAS RUNDY: 8s
3. Mayhem - 3-4 talii, 15 osób (12 kart na start, 8 atak) rank.   CZAS RUNDY: nieogr.
 --W sytuacji gdy uzytkownik nie robi ruchu przez 2min - wyswietla sie komunikat o afk, Jezeli TAK - zostaje w grze, jezeli nie odpowie to wyskakuje 15 sek timer ktory go po tym czasie wyjebie sam automatycznie

4. Niestandardowy - wlasna konfiguracja (bez rankedow)

## Rozwiązanie



## Widoki

- Strona główna 
- Konfiguracja gry / stołu 
- Poczekalnia
- Gra 
- dostępne stoły
- Zasady ikonka "?"

- Znajomi (sidebar globalny)
- Rejestracja / Logowanie
- Profil uzytkownika
- Ranking / Ranking Durnia (złoty dureń)


## Funkcjonalności


### 1. Poczekalnia

- 1.1. Zaproszenie do gry przez kod
- 1.2. Zaproszenie do gry przez znajomego
- 1.3. Usunięcie gracza z poczekalni
- 1.4. Opuszczenie stołu (jeżeli gospodarz wyjdzie, stół sie zamyka)
- 1.5. Gospodarz rozpoczyna ( zwykly tryb ), rankedy (auto. jak w cs)
- 1.6. Edycja stołu (niest.)
- 1.7. Tworzenie prywatnych stołow i publicznych 

### 2. Gra 
- 2.1. Pobicie karty
- 2.2. Wzięcie karty do ręki (obrona nieudana)
- 2.3. Przesunięcie kart do drugiego gracza 
- 2.4. chat w grze trzymany w sesji
- 2.5. Informacja po grze o ilosci punktow elo w przypadku rankingów
- 2.6. Przejście w tryb obserwatora
- 2.7. dobieranie do pełnej reki 
- 2.8. Obsługa wygranej 

- tasowanie kart (wlasny jakis wzor / algorytm)
- ostatnia karta jest kozyrem



### 3. Ogólne
- 3.1. Dodanie kogoś do listy znajomych po nickname (unikalny)
- 3.2. Akceptowanie / Odrzucanie zaproszeń do znajomych
- 3.3. Obserwowanie gry znajomego (widzisz karty znajomego, a znajomy widzi ze obserwujesz) ??????
- 3.4. Stworzenie konta / Usunięcie konta
- 3.5. Zmiana danych w profilu (nick, zdjecie prof. itp)
- 3.6. Jeżeli jestes durniem to masz czapeczke DURNIA i dopoki nie przestaniesz nim byc to ja masz i ch0j
- 3.7. pre-definiowany tutorial po rejestracji (do wyboru mozna skip)
- 3.8. gra jako gość (tylko nie ranked)

## Mechanika gry
1.system automatycznie wybiera osobe z najnizszym kozyrem i ustawia ja na ATAKUJACY, osoba na lewo zostaje BRONIACY
System dzialalby na 2 tablicach atakujacej i broniacej

## Features



### 1. Odznaki

Gracz może zbierać różne odznaki podczas grania na platformie. Przykładowe odznaki:

1. Nietykalny / Niepowstrzymany / Niepokonany - 10/25/50 partii durnia bez przegranej.
2. Ostatni Taniec - pobij wszystkie karty i skoncz gre bez dobierania kolejnej.
3. Bezkozyrny - wygraj 3 gry nie dobierając żadnego kozyra.
4. DUREŃ- przegraj 3 razy pod rząd gre jako dureń

### 2. Ranking 

Cotygodniowy ranking wylaniajacy top 3 graczy z ogólnej listy graczy, wyliczający 1,2,3 miejsce na podstawie ELO. Rankedy na stala liczbe osob dla uproszczenia.
Gracze mogą spojrzeć na ranking klikając na ikonke rankingu w widoku głównym. 
Wyliczanie punktow w zaleznosci od miejsca w grze

rankedy tylko standard (6 osob)
wzór elo: (ilosc osob / miejsce ) * współ.
wyjątek dureń - minusowe punkty 




### Przypadki brzegowe
 
 1. Podczas wzięcia kart BIORĘ druga osoba w tym samym czasie dorzuci karte do bicia.
 2. Atak dwóch graczy naraz (dorzucenie) w tym samym czasie, w sytuacji gdy np. jest 5 kart juz na stole i dwie osoby chca dorzucic w tej samej sek
 3. KOLEJNOSC DOBIERANIA KART!!!


