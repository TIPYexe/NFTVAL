# Development Setup

## Backend API (Django)

Create virtual environment in repo (make sure you have python installed):
```bash
python -m venv venv
```

Activate venv:
```bash
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

To create database tables
```bash
python manage.py makemigrations NFTValidationApp
```

To migrate the changes form model to database 
```bash
python manage.py migrate NFTValidationApp
```

Open a cmd > ipconfig > copy the IPv4 Address

Go to: React\Mobile\context\app.context.js on line 31 and change the line to
```bash
const [API_URL, SET_API_URL] = useState("http://< IPv4 Address >:8000");
```

Go to: DjangoAPI\DjangoAPI\settings.py on line 29 and change the line to
```bash
ALLOWED_HOSTS = [< IPv4 Address >]
```

To run the API:
```bash
cd DjangoAPI
python manage.py runserver <IPv4 Address>:8000
```

To access the server: 
```bash
<IPv4 Address>:8000
```


## Frontend (React)

Install packages:
```bash
npm install
```

Start project:
```bash
npm start
```

## Additional programs

To see the database install: [SQLiteStudio](https://sqlitestudio.pl/)