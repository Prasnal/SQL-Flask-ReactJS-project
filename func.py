import psycopg2
import datetime
import os
import urlparse

#Funkcje zwracajace dane z bazy
def wypiszRodzine():
    cur.execute("SELECT * FROM Rodzina;")
    return(cur.fetchall())

def wypiszWydatkij():
    cur.execute("SELECT * FROM Wydatki_jednorazowe;")
    return(cur.fetchall())

def wypiszWydatkis():
    cur.execute("SELECT * FROM Wydatki_stale;")
    return(cur.fetchall())

def wypiszUzytkownika2():
    cur.execute("SELECT * FROM Uzytkownik;")
    return(cur.fetchall())

def wypiszDochod():
    cur.execute("SELECT * FROM Dochod;")
    return(cur.fetchall())

def wypiszZakupy():
    cur.execute("SELECT * FROM Zakupy;")
    return(cur.fetchall())

def wypiszSklep():
    cur.execute("SELECT * FROM Sklep;")
    return(cur.fetchall())

def wypiszPrzedmiot():
    try:
        cur.execute("SELECT * FROM Przedmiot;")
    except:
        print("OCB?")
    return(cur.fetchall())

def wypiszGwarancje():
    cur.execute("SELECT * FROM Gwarancja;")
    return(cur.fetchall())

def wypiszTag():
    cur.execute("SELECT * FROM Tag;")
    return(cur.fetchall())


#Tworzenie widoku w bazie

def wypiszUzytkownika(Rodzina_ID):
    try:
        cur.execute("DROP VIEW  IF EXISTS uzytkownikzrodziny2; CREATE VIEW uzytkownikzrodziny2 AS SELECT * FROM Uzytkownik WHERE rodzina_id=%s;",(str(Rodzina_ID)))
    except:
        print("10")
    conn.commit()
    cur.execute("SELECT * FROM uzytkownikzrodziny2;")
    return(cur.fetchall())

# Usuwanie tabel
def delall():
    cur.execute("drop table if exists gwarancja cascade;")
    cur.execute("drop table if exists rodzina cascade;")
    cur.execute("drop table if exists wydatki_jednorazowe cascade;")
    cur.execute("drop table if exists wydatki_stale cascade;")
    cur.execute("drop table if exists uzytkownik cascade;")
    cur.execute("drop table if exists dochod cascade;")
    cur.execute("drop table if exists zakupy cascade;")
    cur.execute("drop table if exists sklep cascade;")
    cur.execute("drop table if exists przedmiot cascade;")
    cur.execute("drop table if exists tag cascade;")
    #cur.execute("drop view uzytkownikzrodziny2")

#----------------------------------

#Tworzenie widokow i wykorzystanie ich
def uzytkownik_tab(dane="Uzytkownik_ID",kol=" "):
    kolejnosc=0
    if kol=="Z":
        kolejnosc="DESC"
    elif kol=="A":
        kolejnosc=" "


    cur.execute("DROP VIEW  IF EXISTS uzytkownik_tab; CREATE VIEW uzytkownik_tab AS SELECT Uzytkownik_ID,Nazwisko,Imie,Nick,Mail FROM Uzytkownik;")
    cur.execute("SELECT * FROM uzytkownik_tab ORDER BY "+dane+" "+kolejnosc+";")
    return(cur.fetchall())


def gwarancje_tab(Rodzina_ID,dane="Gwarancja.Data_konca",kol=" "):
    if kol=="Z":
        kolejnosc="DESC"
    elif kol=="A":
        kolejnosc=" "
    try:
        cur.execute("DROP VIEW IF EXISTS gwarancje; CREATE VIEW gwarancje AS SELECT Przedmiot.Nazwa,Gwarancja.Data_zakupu,Gwarancja.Data_konca FROM Przedmiot,Gwarancja,Rodzina WHERE Rodzina.rodzina_id="+Rodzina_ID + " ORDER BY " + dane + " " + kolejnosc + ";")#?
    except:
        print("6")
    else:
        conn.commit()
    try:
        cur.execute("SELECT * FROM gwarancje;")
    except:
        print("11")
    else:
        conn.commit()
        return(cur.fetchall())

def wydatki_tab(Rodzina_ID,dane="Uzytkownik.Uzytkownik_ID",kol=" "): #DODAC RODZINA_ID
    if kol=="Z":
        kolejnosc="DESC"
    elif kol=="A":
        kolejnosc=" "
    try:
        cur.execute("DROP VIEW IF EXISTS wydatki; CREATE VIEW wydatki AS SELECT Uzytkownik.Imie,Uzytkownik.Nazwisko, Przedmiot.Nazwa as name, Przedmiot.Cena,Sklep.Nazwa,Tag.Tag_name FROM Uzytkownik,Przedmiot,Sklep,Tag,Rodzina WHERE Rodzina.rodzina_id= "+Rodzina_ID + " ORDER BY " + dane + " "+ kolejnosc + ";")
    except:
        print("4")
        conn.commit()
    try:
        cur.execute("SELECT * FROM wydatki;")
    except:
        conn.commit()
        print("5")
    else:
        conn.commit()
        return(cur.fetchall())

#Liczenie sum wydatkow
def suma_jednorazowych(Rodzina_ID):
    try:
        cur.execute("SELECT SUM(Cena) FROM Wydatki_jednorazowe WHERE rodzina_id=%s;",str(Rodzina_ID));
    except:
        print("3")
    conn.commit()
    return(cur.fetchall())

def suma_stalych(Rodzina_ID):
    try:
        cur.execute("SELECT SUM(Cena) FROM Wydatki_stale WHERE rodzina_id=%s;",str(Rodzina_ID));
    except:
        print("2")
    conn.commit()
    return(cur.fetchall())

def suma_zakupow(Rodzina_ID):
    try:

        cur.execute("SELECT SUM(Cena_zakupow) FROM Zakupy WHERE  rodzina_id=%s;",str(Rodzina_ID));
    except:
        print("1")
    conn.commit()
    return(cur.fetchall())

def wykres_dane(Rodzina_ID,User_ID): 
    cur.execute("DROP VIEW IF EXISTS wykres_dane; CREATE VIEW wykres_dane AS SELECT Uzytkownik.Uzytkownik_ID,Uzytkownik.Imie,Zakupy.Cena_zakupow, Zakupy.Data_zakupow FROM Uzytkownik,Przedmiot,Zakupy WHERE rodzina_id=%s AND Uzytkownik_id=%s;",(Rodzina_ID,User_ID))
    conn.commit()
    cur.execute("SELECT * FROM wykres_dane;")
    print(cur.fetchall())

#--------------------------------
# Dodawanie danych do bazy
def addRodzina(Nazwisko,Haslo,Login):
    try:
        cur.execute("INSERT INTO Rodzina VALUES (nextval('rodzinaS'),%s,%s,%s);",(Nazwisko,Haslo,Login));
    except:
        print("niepoprawne dane!")
    conn.commit()


def addWydatki_jednorazowe(rodzinaID,wartosc,nazwa_wydatku,rok_wplaty,miesiac,dzien):
    try:
        cur.execute("INSERT INTO Wydatki_jednorazowe VALUES(nextval('wydatkijS'),%s,%s,%s,to_date('%s-%s-%s', 'YYYY-MM-DD'));",(rodzinaID,wartosc,nazwa_wydatku,rok_wplaty,miesiac,dzien))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addWydatki_stale(rodzinaID,wartosc,rok_termin,miesiact,dzient,nazwa_wydatku,rok_wplaty,miesiacw,dzienw):
    try:
        cur.execute("INSERT INTO Wydatki_stale VALUES (nextval('wydatkisS'), %s, %s,to_date('%s-%s-%s', 'YYYY-MM-DD'),%s,to_date('%s-%s-%s', 'YYYY-MM-DD'));",(rodzinaID,wartosc,rok_termin,miesiact,dzient,nazwa_wydatku,rok_wplaty,miesiacw,dzienw))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addUzytkownik(rodzinaID,nazwisko,imie,mail,czy_admin,nick,haslo):
    try:
        cur.execute("INSERT INTO Uzytkownik VALUES(nextval('uzytkownikS'),%s,%s,%s,%s,%s,%s,%s);",(rodzinaID,nazwisko,imie,mail,czy_admin,nick,haslo))
    except:
        print("niepoprawne dane!")
    conn.commit()



def addDochod(rodzinaID,uzytkownikID,wartosc,rok,miesiac,dzien):
    try:
        cur.execute("INSERT INTO Dochod VALUES(nextval('dochodS'),%s,%s,%s,to_date('%s-%s-%s','YYYY-MM-DD'));",(rodzinaID,uzytkownikID,wartosc,rok,miesiac,dzien))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addZakupy(uzytkownikID,rok,miesiac,dzien,cena):
    try:
        cur.execute("INSERT INTO Zakupy VALUES(nextval('zakupyS'),%s,to_date('%s-%s-%s','YYYY-MM-DD'),%s);",(uzytkownikID,rok,miesiac,dzien,cena))
    except:
        print("Niepoprawne dane!")
    conn.commit()

def addSklep(zakupyID,nazwa,miejscowosc,kod,numer,ulica):
    try:
        cur.execute("INSERT INTO Sklep VALUES(nextval('sklepS'),%s,%s,%s,%s,%s,%s);",(zakupyID,nazwa,miejscowosc,kod,numer,ulica))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addPrzedmiot(zakupyID,nazwa,cena,ilosc):
    try:
        cur.execute("INSERT INTO Przedmiot VALUES(nextval('przedmiotS'),%s,%s,%s,%s);",(zakupyID,nazwa,cena,ilosc))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addGwarancja(przedmiotID,rok_z,miesiac_z,dzien_z,rok_k,miesiac_k,dzien_k):
    try:
        cur.execute("INSERT INTO Gwarancja VALUES (nextval('gwarancjaS'),%s,to_date('%s-%s-%s', 'YYYY-MM-DD'),to_date('%s-%s-%s', 'YYYY-MM-DD'));",(przedmiotID,rok_z,miesiac_z,dzien_z,rok_k,miesiac_k,dzien_k))
    except:
        print("niepoprawne dane!")
    conn.commit()

def addTag(przedmiotID,nazwa):
    #try:
    cur.execute("INSERT INTO Tag VALUES(nextval('tagS'),%s,%s);",(przedmiotID,nazwa))
    #except:
    #print("niepoprawne dane!")
    conn.commit()

#Tworzenie sekwencji
def create_seq():
    cur.execute("drop sequence if exists gwarancjaS; CREATE SEQUENCE gwarancjaS START 1;")
    cur.execute("drop sequence if exists rodzinaS; CREATE SEQUENCE rodzinaS START 1;")
    cur.execute("drop sequence if exists wydatkijs; CREATE SEQUENCE wydatkijS START 1;")
    cur.execute("drop sequence if exists wydatkiS; CREATE SEQUENCE wydatkisS START 1;")
    cur.execute("drop sequence if exists uzytkownikS; CREATE SEQUENCE uzytkownikS START 1;")
    cur.execute("drop sequence if exists dochodS; CREATE SEQUENCE dochodS START 1;")
    cur.execute("drop sequence if exists zakupyS; CREATE SEQUENCE zakupyS START 1;")
    cur.execute("drop sequence if exists sklepS; CREATE SEQUENCE sklepS START 1;")
    cur.execute("drop sequence if exists przedmiotS; CREATE SEQUENCE przedmiotS START 1;")
    cur.execute("drop sequence if exists tagS; CREATE SEQUENCE tagS START 1;")
    conn.commit()

#Tworzenie bazy    
def create_tables():
    cur.execute("CREATE TABLE Rodzina (Rodzina_ID INTEGER NOT NULL, Nazwisko VARCHAR NOT NULL, Haslo VARCHAR NOT NULL, Login VARCHAR NOT NULL, CONSTRAINT rodzina_id PRIMARY KEY (Rodzina_ID));")

    cur.execute("CREATE TABLE Wydatki_jednorazowe ( wydatek_j_ID INTEGER NOT NULL, Rodzina_ID INTEGER NOT NULL, Cena REAL NOT NULL, Nazwa_wydatku VARCHAR NOT NULL, Data_zaplaty DATE NOT NULL, CONSTRAINT wydatki_jednorazowe_pk PRIMARY KEY (wydatek_j_ID, Rodzina_ID));")

    cur.execute("CREATE TABLE Wydatki_stale (wydatek_s_ID INTEGER NOT NULL,Rodzina_ID INTEGER NOT NULL,Cena REAL NOT NULL, Data_platnosci DATE NOT NULL, Nazwa_wydatku VARCHAR NOT NULL,Data_zaplaty DATE NOT NULL,CONSTRAINT wydatki_stale_pk PRIMARY KEY (wydatek_s_ID, Rodzina_ID));")

    cur.execute("CREATE TABLE Uzytkownik (Uzytkownik_ID INTEGER NOT NULL,Rodzina_ID INTEGER NOT NULL,Nazwisko VARCHAR NOT NULL, Imie VARCHAR NOT NULL, Mail VARCHAR NOT NULL,Czy_Admin BOOLEAN NOT NULL, Nick VARCHAR NOT NULL, Haslo VARCHAR NOT NULL, CONSTRAINT uzytkownik_id PRIMARY KEY (Uzytkownik_ID) );")

    cur.execute("CREATE TABLE Dochod (Dochod_ID INTEGER NOT NULL,Rodzina_ID INTEGER NOT NULL,Uzytkownik_ID INTEGER NOT NULL, Ile REAL NOT NULL, Data DATE NOT NULL,CONSTRAINT dochod_pk PRIMARY KEY (Dochod_ID) );   CREATE TABLE Zakupy (Zakupy_ID INTEGER NOT NULL, Uzytkownik_ID INTEGER NOT NULL, Data_zakupow DATE, Cena_zakupow REAL, CONSTRAINT zakupy_id PRIMARY KEY (Zakupy_ID) );")

    cur.execute("CREATE TABLE Sklep ( Sklep_ID INTEGER NOT NULL, Zakupy_ID INTEGER NOT NULL, Nazwa VARCHAR NOT NULL, Miejscowosc VARCHAR NOT NULL, Kod_pocztowy VARCHAR, Numer INTEGER, Ulica VARCHAR, CONSTRAINT sklep_id PRIMARY KEY (Sklep_ID) );")

    cur.execute("CREATE TABLE Przedmiot ( Przedmiot_ID INTEGER NOT NULL, Zakupy_ID INTEGER NOT NULL, Nazwa VARCHAR NOT NULL, Cena REAL NOT NULL, Ilosc INTEGER DEFAULT 1 NOT NULL, CONSTRAINT przedmiot_id PRIMARY KEY (Przedmiot_ID) );")

    cur.execute("CREATE TABLE Gwarancja ( Gwarancja_ID INTEGER NOT NULL, Przedmiot_ID INTEGER NOT NULL, Data_zakupu DATE NOT NULL, Data_konca DATE NOT NULL, CONSTRAINT gwarancja_id PRIMARY KEY (Gwarancja_ID, Przedmiot_ID) );")

    cur.execute("CREATE TABLE Tag ( Tag_ID VARCHAR NOT NULL, Przedmiot_ID INTEGER NOT NULL, Tag_name VARCHAR NOT NULL, CONSTRAINT tag_id PRIMARY KEY (Tag_ID) );")

    cur.execute("ALTER TABLE Uzytkownik ADD CONSTRAINT rodzina_u_ytkownik_fk FOREIGN KEY (Rodzina_ID) REFERENCES Rodzina (Rodzina_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Wydatki_stale ADD CONSTRAINT rodzina_wydatki_stale_fk FOREIGN KEY (Rodzina_ID) REFERENCES Rodzina (Rodzina_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Wydatki_jednorazowe ADD CONSTRAINT rodzina_wydatki_jednorazowe_fk FOREIGN KEY (Rodzina_ID) REFERENCES Rodzina (Rodzina_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Dochod ADD CONSTRAINT rodzina_dochod_fk FOREIGN KEY (Rodzina_ID) REFERENCES Rodzina (Rodzina_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Zakupy ADD CONSTRAINT u_ytkownik_zakupy_fk FOREIGN KEY (Uzytkownik_ID) REFERENCES Uzytkownik (Uzytkownik_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Dochod ADD CONSTRAINT uzytkownik_dochod_fk FOREIGN KEY (Uzytkownik_ID) REFERENCES Uzytkownik (Uzytkownik_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Przedmiot ADD CONSTRAINT zakupy_przedmiot_fk FOREIGN KEY (Zakupy_ID) REFERENCES Zakupy (Zakupy_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Sklep ADD CONSTRAINT zakupy_sklep_fk FOREIGN KEY (Zakupy_ID) REFERENCES Zakupy (Zakupy_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")

    cur.execute("ALTER TABLE Tag ADD CONSTRAINT przedmiot_tag_fk FOREIGN KEY (Przedmiot_ID) REFERENCES Przedmiot (Przedmiot_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")
    cur.execute("ALTER TABLE Gwarancja ADD CONSTRAINT przedmiot_gwarancja_fk FOREIGN KEY (Przedmiot_ID) REFERENCES Przedmiot (Przedmiot_ID) ON DELETE NO ACTION ON UPDATE NO ACTION NOT DEFERRABLE;")
    conn.commit()

#------------------------MAIN---------------------------
#Polaczenie z baza
try:
    conn = psycopg2.connect("dbname='gmskfgvy' user='gmskfgvy' host='elmer.db.elephantsql.com' password='wpuuc1ltoYG2rAAWZSdaZCcPFV-rjZWc'")
except:
    print ("I am unable to connect to the database")

cur = conn.cursor()

#cur=conn.cursor()


#-----------------------


conn.commit()
