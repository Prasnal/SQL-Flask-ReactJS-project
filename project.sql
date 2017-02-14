
CREATE TABLE Rodzina (
                Rodzina_ID INTEGER NOT NULL,
                Nazwisko VARCHAR NOT NULL,
                Haslo VARCHAR NOT NULL,
                Login VARCHAR NOT NULL,
                CONSTRAINT rodzina_id PRIMARY KEY (Rodzina_ID)
);


CREATE TABLE Wydatki_jednorazowe (
                wydatek_j_ID INTEGER NOT NULL,
                Rodzina_ID INTEGER NOT NULL,
                Cena REAL NOT NULL,
                Nazwa_wydatku VARCHAR NOT NULL,
                Data_zaplaty DATE NOT NULL,
                CONSTRAINT wydatki_jednorazowe_pk PRIMARY KEY (wydatek_j_ID, Rodzina_ID)
);


CREATE TABLE Wydatki_stale (
                wydatek_s_ID INTEGER NOT NULL,
                Rodzina_ID INTEGER NOT NULL,
                Cena REAL NOT NULL,
                Data_platnosci DATE NOT NULL,
                Nazwa_wydatku VARCHAR NOT NULL,
                Data_zaplaty DATE NOT NULL,
                CONSTRAINT wydatki_stale_pk PRIMARY KEY (wydatek_s_ID, Rodzina_ID)
);


CREATE TABLE Uzytkownik (
                Uzytkownik_ID INTEGER NOT NULL,
                Rodzina_ID INTEGER NOT NULL,
                Nazwisko VARCHAR NOT NULL,
                Imie VARCHAR NOT NULL,
                Mail VARCHAR NOT NULL,
                Czy_Admin BOOLEAN NOT NULL,
                Nick VARCHAR NOT NULL,
                Haslo VARCHAR NOT NULL,
                CONSTRAINT uzytkownik_id PRIMARY KEY (Uzytkownik_ID)
);


CREATE TABLE Dochod (
                Dochod_ID INTEGER NOT NULL,
                Rodzina_ID INTEGER NOT NULL,
                Uzytkownik_ID INTEGER NOT NULL,
                Ile REAL NOT NULL,
                Data DATE NOT NULL,
                CONSTRAINT dochod_pk PRIMARY KEY (Dochod_ID)
);


CREATE TABLE Zakupy (
                Zakupy_ID INTEGER NOT NULL,
                Uzytkownik_ID INTEGER NOT NULL,
                Data_zakupow DATE,
                Cena_zakupow REAL,
                CONSTRAINT zakupy_id PRIMARY KEY (Zakupy_ID)
);


CREATE TABLE Sklep (
                Sklep_ID INTEGER NOT NULL,
                Zakupy_ID INTEGER NOT NULL,
                Nazwa VARCHAR NOT NULL,
                Miejscowosc VARCHAR NOT NULL,
                Kod_pocztowy VARCHAR,
                Numer INTEGER,
                Ulica VARCHAR,
                CONSTRAINT sklep_id PRIMARY KEY (Sklep_ID)
);


CREATE TABLE Przedmiot (
                Przedmiot_ID INTEGER NOT NULL,
                Zakupy_ID INTEGER NOT NULL,
                Nazwa VARCHAR NOT NULL,
                Cena REAL NOT NULL,
                Ilosc INTEGER DEFAULT 1 NOT NULL,
                CONSTRAINT przedmiot_id PRIMARY KEY (Przedmiot_ID)
);


CREATE TABLE Gwarancja (
                Gwarancja_ID INTEGER NOT NULL,
                Przedmiot_ID INTEGER NOT NULL,
                Data_zakupu DATE NOT NULL,
                Data_konca DATE NOT NULL,
                CONSTRAINT gwarancja_id PRIMARY KEY (Gwarancja_ID, Przedmiot_ID)
);


CREATE TABLE Tag (
                Tag_ID VARCHAR NOT NULL,
                Przedmiot_ID INTEGER NOT NULL,
                Tag_name VARCHAR NOT NULL,
                CONSTRAINT tag_id PRIMARY KEY (Tag_ID)
);


ALTER TABLE Uzytkownik ADD CONSTRAINT rodzina_u_ytkownik_fk
FOREIGN KEY (Rodzina_ID)
REFERENCES Rodzina (Rodzina_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Wydatki_stale ADD CONSTRAINT rodzina_wydatki_stale_fk
FOREIGN KEY (Rodzina_ID)
REFERENCES Rodzina (Rodzina_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Wydatki_jednorazowe ADD CONSTRAINT rodzina_wydatki_jednorazowe_fk
FOREIGN KEY (Rodzina_ID)
REFERENCES Rodzina (Rodzina_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Dochod ADD CONSTRAINT rodzina_dochod_fk
FOREIGN KEY (Rodzina_ID)
REFERENCES Rodzina (Rodzina_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Zakupy ADD CONSTRAINT u_ytkownik_zakupy_fk
FOREIGN KEY (Uzytkownik_ID)
REFERENCES Uzytkownik (Uzytkownik_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Dochod ADD CONSTRAINT uzytkownik_dochod_fk
FOREIGN KEY (Uzytkownik_ID)
REFERENCES Uzytkownik (Uzytkownik_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Przedmiot ADD CONSTRAINT zakupy_przedmiot_fk
FOREIGN KEY (Zakupy_ID)
REFERENCES Zakupy (Zakupy_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Sklep ADD CONSTRAINT zakupy_sklep_fk
FOREIGN KEY (Zakupy_ID)
REFERENCES Zakupy (Zakupy_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Tag ADD CONSTRAINT przedmiot_tag_fk
FOREIGN KEY (Przedmiot_ID)
REFERENCES Przedmiot (Przedmiot_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Gwarancja ADD CONSTRAINT przedmiot_gwarancja_fk
FOREIGN KEY (Przedmiot_ID)
REFERENCES Przedmiot (Przedmiot_ID)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

drop sequence if exists gwarancjaS; CREATE SEQUENCE gwarancjaS START 1;
drop sequence if exists rodzinaS; CREATE SEQUENCE rodzinaS START 1;
drop sequence if exists wydatkijs; CREATE SEQUENCE wydatkijS START 1;
drop sequence if exists wydatkiS; CREATE SEQUENCE wydatkisS START 1;
drop sequence if exists uzytkownikS; CREATE SEQUENCE uzytkownikS START 1;
drop sequence if exists dochodS; CREATE SEQUENCE dochodS START 1;
drop sequence if exists zakupyS; CREATE SEQUENCE zakupyS START 1;
drop sequence if exists sklepS; CREATE SEQUENCE sklepS START 1;
drop sequence if exists przedmiotS; CREATE SEQUENCE przedmiotS START 1;
drop sequence if exists tagS; CREATE SEQUENCE tagS START 1;
