from flask import Flask
from func import *
import yaml
import json, requests


from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


# funkcja umozliwiajaca obejscie bledu " No 'Access-Control-Allow-Origin"
def crossdomain(origin=None, methods=None, headers=None, 
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


def date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        raise TypeError

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

#funkcje wywolywujace funkcje z func.py z podanymi parametrami i umieszczajace jsona na odpowiedniej stronie

@app.route('/users/<familyID>',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def users_list(familyID):
    return json.dumps(wypiszUzytkownika(familyID))

@app.route('/usr/<sort>/<order>',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def users(sort,order):
    return json.dumps(uzytkownik_tab(sort,order))


@app.route('/gwarancje/<Rodzina_ID>/<sort>/<order>',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def gwarancja(Rodzina_ID,sort,order):
    return json.dumps(gwarancje_tab(Rodzina_ID,sort,order),default=date_handler)


@app.route('/wydatki/<Rodzina_ID>/<sort>/<order>',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def wydatki(Rodzina_ID,sort,order):
    return json.dumps(wydatki_tab(Rodzina_ID,sort,order))

@app.route('/wydatkij',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def wydatkij():
    return json.dumps(wypiszWydatkij(),default=date_handler)

@app.route('/wydatkis',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def wydatkis():
    return json.dumps(wypiszWydatkis(),default=date_handler)

@app.route('/uzytkownik',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Uzytkownik2():
    return json.dumps(wypiszUzytkownika2())

@app.route('/dochod',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Dochod():
    return json.dumps(wypiszDochod(),default=date_handler)

@app.route('/zakupy',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Zakupy():
    return json.dumps(wypiszZakupy(),default=date_handler)

@app.route('/sklep',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Sklep():
    return json.dumps(wypiszSklep())

@app.route('/przedmiot',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Przedmiot():
    return json.dumps(wypiszPrzedmiot())

@app.route('/gwarancja',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Gwarancja():
    return json.dumps(wypiszGwarancje(),default=date_handler)

@app.route('/tag',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Tag():
    return json.dumps(wypiszTag())

@app.route('/rodzina',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Rodzina():
    return json.dumps(wypiszRodzine())

@app.route('/wykresjednorazowe',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Wykresj():
    return json.dumps(suma_jednorazowych(1)[0]+suma_stalych(1)[0])

@app.route('/wykresstale',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Wykress():
    return json.dumps(suma_stalych(1))

@app.route('/wykreszakupy',methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def Wykresz():
    return json.dumps(suma_zakupow(1))

#---------------------------------------
 #funkcje pobierajace jsona ze strony, zapisywanie danych do zmiennej i wywolanie okreslonej funkcji z func.py dodajacej do bazy
@app.route('/createUser', methods = ['GET','POST'])
@crossdomain(origin='*')
def getPersonById():
    data = request.form['json']
    FamilyID=yaml.safe_load(data)["familyID"]
    Surname=yaml.safe_load(data)["surname"]
    Name=yaml.safe_load(data)["name"]
    Email=yaml.safe_load(data)["email"]
    IsAdmin=yaml.safe_load(data)["isAdmin"]
    Nick=yaml.safe_load(data)["nick"]
    Password=yaml.safe_load(data)["password"]
    addUzytkownik(FamilyID,Surname,Name,Email,IsAdmin,Nick,Password)
    return 'pl'

@app.route('/createFamily', methods = ['GET','POST'])
@crossdomain(origin='*')
def getFamily():
    data = request.form['json']
    Surname=yaml.safe_load(data)["surname"]
    Password=yaml.safe_load(data)["password"]
    Login=yaml.safe_load(data)["login"]
    addRodzina(Surname,Password,Login)
    return 'pl'

@app.route('/createOutGo', methods = ['GET','POST'])
@crossdomain(origin='*')
def getOutGo():
    data = request.form['json']
    FamilyID=yaml.safe_load(data)["familyID"]
    Price=yaml.safe_load(data)["price"]
    Name=yaml.safe_load(data)["name"]
    Year=yaml.safe_load(data)["year"]
    Mounth=yaml.safe_load(data)["mounth"]
    Day=yaml.safe_load(data)["day"]
    addWydatki_jednorazowe(FamilyID,Price,Name,int(Year),int(Mounth),int(Day))
    return 'pl'

@app.route('/createOutGo2', methods = ['GET','POST'])
@crossdomain(origin='*')
def getOutGo2():
    data = request.form['json']
    FamilyID=yaml.safe_load(data)["familyID"]
    Price=yaml.safe_load(data)["price"]
    Year=yaml.safe_load(data)["year"]
    Mounth=yaml.safe_load(data)["mounth"]
    Day=yaml.safe_load(data)["day"]
    Name=yaml.safe_load(data)["name"]
    Year2=yaml.safe_load(data)["year2"]
    Mounth2=yaml.safe_load(data)["mounth2"]
    Day2=yaml.safe_load(data)["day2"]
    addWydatki_stale(FamilyID,Price,int(Year),int(Mounth),int(Day),Name,int(Year2),int(Mounth2),int(Day2))
    return 'pl'

@app.route('/createIncome', methods = ['GET','POST'])
@crossdomain(origin='*')
def getIncome():
    data = request.form['json']
    FamilyID=yaml.safe_load(data)["familyID"]
    UserID=yaml.safe_load(data)["userID"]
    Price=yaml.safe_load(data)["price"]
    Year=yaml.safe_load(data)["year"]
    Mounth=yaml.safe_load(data)["mounth"]
    Day=yaml.safe_load(data)["day"]
    addDochod(FamilyID,UserID,Price,int(Year),int(Mounth),int(Day))
    return 'pl'

@app.route('/createWarranty', methods = ['GET','POST'])
@crossdomain(origin='*')
def getWarranty():
    data = request.form['json']
    ObjectID=yaml.safe_load(data)["userID"]
    Year=yaml.safe_load(data)["year"]
    Mounth=yaml.safe_load(data)["mounth"]
    Day=yaml.safe_load(data)["day"]
    Year2=yaml.safe_load(data)["year2"]
    Mounth2=yaml.safe_load(data)["mounth2"]
    Day2=yaml.safe_load(data)["day2"]

    print(data,ObjectID,Year,Mounth,Day,Year2,Mounth2,Day2)
    addGwarancja(int(ObjectID),int(Year),int(Mounth),int(Day),int(Year2),int(Mounth2),int(Day2))
    return 'pl'

@app.route('/createTag', methods = ['GET','POST'])
@crossdomain(origin='*')
def getTag():
    data = request.form['json']
    ObjectID=yaml.safe_load(data)["objectID"]
    Name=yaml.safe_load(data)["name"]
    addTag(ObjectID,Name)
    return 'pl'

@app.route('/createObject', methods = ['GET','POST'])
@crossdomain(origin='*')
def getObject():
    data = request.form['json']
    ShoppingID=yaml.safe_load(data)["shoppingID"]
    Name=yaml.safe_load(data)["name"]
    Price=yaml.safe_load(data)["price"]
    Count=yaml.safe_load(data)["count"]
    addPrzedmiot(ShoppingID,Name,Price,Count)
    return 'pl'

@app.route('/createShop', methods = ['GET','POST'])
@crossdomain(origin='*')
def getShop():
    data = request.form['json']
    ShoppingID=yaml.safe_load(data)["shoppingID"]
    Name=yaml.safe_load(data)["name"]
    City=yaml.safe_load(data)["city"]
    Code=yaml.safe_load(data)["code"]
    Number=yaml.safe_load(data)["number"]
    Street=yaml.safe_load(data)["street"]
    try:
        addSklep(ShoppingID,Name,City,Code,Number,Street)
    except:
        print("zle dane!")
    return 'pl'

@app.route('/createShopping', methods = ['GET','POST'])
@crossdomain(origin='*')
def getShopping():
    data = request.form['json']
    UserID=yaml.safe_load(data)["userID"]
    Year=yaml.safe_load(data)["year"]
    Mounth=yaml.safe_load(data)["mounth"]
    Day=yaml.safe_load(data)["day"]
    Price=yaml.safe_load(data)["price"]
    try:
        addZakupy(UserID,int(Year),int(Mounth),int(Day),Price)
    except:
        print("podaj daty!")
    return 'pl'

# uruchomienie aplikacji
if __name__ == "__main__":
    app.run()
